import './Title.css';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { logout } from '../../utilities/auth/auth-service';
import { getUserToken, clearUserToken } from '../../utilities/local-storage';
import { randomShow } from '../../utilities/tools';

export default function Title() {

    const navigate = useNavigate();
    const [token, setToken] = useState(null);

    useEffect(() => {
        setToken(getUserToken());
    }, [token])

    function handleRandom(){
        const randomId = randomShow();
        navigate(`/shows/${randomId}`);
    }

    async function handleLogout(){
        await logout().then((res)=>{
            // setUserToken(res.token);
            console.log(res)
            clearUserToken();
            setToken(getUserToken());
        })
    }

    return (
        <div className='Title'>
            <Link to='/'>
                <h1>Rabbt Ears</h1>
            </Link>
            <ul>
                <li>
                    {token ?
                        <Link to='/profile'>
                            PROFILE
                        </Link>
                        :
                        <Link to='/auth'>
                            {/* Toggle between Login and Profile */}
                            LOGIN
                        </Link>
                    }
                </li>
                <li>
                    <Link to='/feed'>
                        FEED
                    </Link>
                </li>
                <li onClick={handleRandom}>
                    RANDOM
                </li>
                {token ?
                        <li onClick={handleLogout}>
                            LOGOUT
                        </li>
                        :
                        null
                    }
            </ul>

        </div>
    );
};
