//Imports style sheets
import './Header.css';

//Imports use state tools from React, navigation tools from react-router-dom, custom local storage tools for user and token, and custom tools
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { getUserToken, getUser } from '../../utilities/local-storage';
import * as tools from '../../utilities/tools';

//Imports SearchBar component
import SearchBar from '../SearchBar/SearchBar';

//Exports component with a header with links throughout the application (home, feed, a random show, and user's profile) and a search bar that pops up when toggled
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
                <Link className={`logo${toggle ? ' disappear' : ''}`} to='/'>
                    <img src='https://i.imgur.com/fUPednw.png' alt='Rabbt Ears logo' />
                    <h1>Rabbt Ears</h1>
                </Link>
                {toggle ?
                    <div className={`pop-search${toggle ? ' disappear' : ''}`}>
                        <p onClick={handleSearch}>X</p>
                        <SearchBar setToggle={setToggle} />
                    </div>
                    :
                    <>
                        <Link className='feed' to='/feed'>
                            <p>FEED</p>
                        </Link>
                        <p className='random' onClick={handleRandom}>RANDOM</p>
                        <p className='search' onClick={handleSearch}>SEARCH</p>
                        {token ?
                            <Link className='header-auth' to='/profile'>
                                <p className='header-profile'>{user.username[0].toUpperCase()}</p>
                            </Link>
                            :
                            <Link className='header-auth' to='/auth'>
                                <p className='header-login'>LOGIN</p>
                            </Link>
                        }
                    </>
                }
            </nav>
        </div >
    );
};
