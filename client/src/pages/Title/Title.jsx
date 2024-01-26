import './Title.css';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { logout } from '../../utilities/auth/auth-service';
import { getUserToken, clearUserToken, clearUser } from '../../utilities/local-storage';
import * as tools from '../../utilities/tools';

import Menu from '../../components/Menu/Menu';
import Carousel from '../../components/Carousel/Carousel';

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
            <Menu />
            <Carousel />
        </div>
    );
};
