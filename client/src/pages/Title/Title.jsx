import './Title.css';

import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { logout } from '../../utilities/auth/auth-service';
import { getUserToken, clearUserToken, clearUsername } from '../../utilities/local-storage';

export default function Title() {

    const [token, setToken] = useState(null);

    useEffect(() => {
        setToken(getUserToken());
    }, [token])

    async function handleLogout(){
        await logout().then((res)=>{
            // setUserToken(res.token);
            console.log(res)
            clearUserToken();
            clearUsername();
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
                <li>
                    {/* Randomize random show */}
                    <Link to='/show/1'>
                        RANDOM
                    </Link>
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
