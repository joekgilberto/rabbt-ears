import './Header.css';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { getUserToken, getUser } from '../../utilities/local-storage';
import * as tools from '../../utilities/tools';

import SearchBar from '../SearchBar/SearchBar';

export default function Header() {

    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false)
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

    function handleSearch() {
        setToggle(!toggle)
    }

    return (
        <div className='Header'>
            <nav>
                <Link className={`logo${toggle?' disappear':''}`} to='/'>
                    <img src='https://i.imgur.com/fUPednw.png' alt='Rabbt Ears logo' />
                    <h1>Rabbt Ears</h1>
                </Link>
                {toggle ?
                    <div className={`pop-search${toggle?' disappear':''}`}>
                        <p onClick={handleSearch}>X</p>
                        <SearchBar setToggle={setToggle} />
                    </div>
                    :
                    <>
                        <Link className='feed' to='/feed'>
                            <p>FEED</p>
                        </Link>
                        <p className='random' onClick={handleRandom}>RANDO</p>
                        <p className='search' onClick={handleSearch}>SEARCH</p>
                        {token ?
                            <Link to='/profile'>
                                <p className='header-profile'>{user.username[0].toUpperCase()}</p>
                            </Link>
                            :
                            <Link to='/auth'>
                                <p className='header-auth'>LOGIN</p>
                            </Link>
                        }
                    </>
                }
            </nav>
        </div >
    );
};
