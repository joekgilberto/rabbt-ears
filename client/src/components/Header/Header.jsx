import './Header.css';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { getUserToken, getUser } from '../../utilities/local-storage';
import * as tools from '../../utilities/tools';

import SearchBar from '../SearchBar/SearchBar';

export default function Header() {

    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null)

    useEffect(() => {
        setToken(getUserToken());
        setUser(getUser())
    }, [token])

    function handleRandom() {
        const randomId = tools.randomShow();
        navigate(`/shows/${randomId}`);
    }

    return (
        <div className='Header'>
            {/* Add img tag for logo */}
            <Link to='/'>
                <h1>Rabbt Ears</h1>
            </Link>
            <nav>
                <Link to='/feed'>
                    <p>FEED</p>
                </Link>
                <Link to='/new'>
                    <p>REVIEW</p>
                </Link>
                <p onClick={handleRandom}>RANDOM</p>
            </nav>
            <SearchBar />
            {token ?
                <Link to='/profile'>
                    <p className='header-profile'>{user.username[0].toUpperCase()}</p>
                </Link>
                :
                <Link to='/auth'>
                    <p className='header-auth'>LOGIN</p>
                </Link>
            }
        </div>
    );
};
