import './Title.css';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { logout } from '../../utilities/auth/auth-service';
import { getUserToken, clearUserToken } from '../../utilities/local-storage';
import * as tools from '../../utilities/tools';

export default function Title() {

    const navigate = useNavigate();
    const [token, setToken] = useState(null);

    useEffect(() => {
        setToken(getUserToken());
    }, [token])

    function handleRandom() {
        const randomId = tools.randomShow();
        navigate(`/shows/${randomId}`);
    }

    async function handleLogout() {
        await logout().then(() => {
            clearUserToken();
            setToken(getUserToken());
        })
    }

    return (
        <div className='Title'>
            <Link to='/'>
                <h1>Rabbt Ears</h1>
            </Link>
            <nav>
                {token ?
                    <Link to='/profile'>
                        <p>PROFILE</p>
                    </Link>
                    :
                    <Link to='/auth'>
                        <p>LOGIN</p>
                    </Link>
                }
                <Link to='/feed'>
                    <p>FEED</p>
                </Link>
                <p onClick={handleRandom}>RANDOM</p>
                {token ?
                    <p onClick={handleLogout}>LOGOUT</p>
                    :
                    null
                }
                </nav>
        </div>
    );
};
