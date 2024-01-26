import './Title.css';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { logout } from '../../utilities/auth/auth-service';
import { getUserToken, clearUserToken, clearUser } from '../../utilities/local-storage';
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
            clearUser();
            setToken(getUserToken());
        })
    }

    return (
        <div className='Title'>
            <div className='logo'>
                <img src="https://i.imgur.com/fUPednw.png" alt="TV logo" />
                <h1>Rabbt Ears</h1>
            </div>
            <nav>
                {token ?
                    <Link to='/profile'>
                        <p className='auth-link'>PROFILE</p>
                    </Link>
                    :
                    <Link to='/auth'>
                        <p className='auth-link'>LOGIN</p>
                    </Link>
                }
                <Link to='/feed'>
                    <p className='title-link'>FEED</p>
                </Link>
                <p className='title-link' onClick={handleRandom}>RANDOM</p>
                {token ?
                    <>
                        <p className='title-link' onClick={handleLogout}>LOGOUT</p>
                    </>
                    :
                    null
                }
            </nav>
        </div>
    );
};
