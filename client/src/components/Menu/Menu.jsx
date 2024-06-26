//Imports style sheet
import './Menu.css';

//Imports tate tools from React, navigation tools from react-router-dom, local storage tools, custom auth API tools, and custom tools
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { getUserToken, clearUserToken, clearUser } from '../../utilities/local-storage';
import * as authServices from '../../utilities/auth/auth-service';
import * as tools from '../../utilities/tools';

//Exports Menu component with links for the homepage, rendering links based on if the user is logged in or not
export default function Menu() {

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
        await authServices.logout().then(() => {
            clearUserToken();
            clearUser();
            setToken(getUserToken());
        })
    }

    return (
        <div className='Menu'>
            <div className='logo'>
                <img src="https://i.imgur.com/fUPednw.png" alt="TV logo" />
                <h1>Rabbt Ears</h1>
            </div>
            <p style={{margin: '10px 100px', padding:'20px 20px', color:'#fff', fontSize:'24px', fontWeight: 500, textAlign: 'center', backgroundColor: '#000'}}>Rabbt Ears is currently under construction. Please come back later, or reach out to <a href='https://joekgilberto.com/contact' target='_blank' style={{ fontWeight: 800}}>Joe Gilberto</a> for more information!</p>
            {/* <nav>
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
                    <p className='menu-link feed'>FEED</p>
                </Link>
                <p className='menu-link' onClick={handleRandom}>RANDOM</p>
                {token ?
                    <>
                        <p className='menu-link' onClick={handleLogout}>LOGOUT</p>
                    </>
                    :
                    null
                }
            </nav> */}
        </div>
    );
};
