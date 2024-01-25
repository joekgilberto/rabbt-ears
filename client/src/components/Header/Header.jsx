import './Header.css';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { logout } from '../../utilities/auth/auth-service';
import { getUserToken, clearUserToken, clearUser } from '../../utilities/local-storage';
import * as tools from '../../utilities/tools';

import SearchBar from '../SearchBar/SearchBar';

export default function Header() {

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
        await logout().then((res) => {
            console.log(res)
            clearUserToken();
            clearUser();
        })
    }

    return (
        <div className='Header'>
            {/* Add img tag for logo */}
            <Link to='/'>
                <h1>Rabbt Ears</h1>
            </Link>
            <nav>
                <Link to='/'>
                    <p>HOME</p>
                </Link>
                <Link to='/feed'>
                    <p>FEED</p>
                </Link>
                <p onClick={handleRandom}>RANDOM</p>
            </nav>
            <SearchBar />
            {token ?
                <Link to='/profile'>
                    <p className='auth'>PROFILE</p>
                </Link>
                :
                <Link to='/auth'>
                    <p className='auth'>LOGIN</p>
                </Link>
            }
        </div>
    );
};
