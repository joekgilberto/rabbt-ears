import './Auth.css';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import * as authServices from '../../utilities/auth/auth-service';
import { setUserToken, setUser } from '../../utilities/local-storage';
import { useDispatch, useSelector } from 'react-redux';
import { updateCredentials, selectCredentials } from '../../features/authSlice';

import Carousel from '../../components/Carousel/Carousel';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';

export default function Auth() {

    const [toggle, setToggle] = useState(null)
    const credentials = useSelector(selectCredentials);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleToggle(e) {
        setToggle(!toggle)
    }

    async function handleLogin(e) {
        e.preventDefault()
        if (!toggle) {
            try {
                await authServices.login({
                    username: credentials.username,
                    password: credentials.password
                }).then((res) => {
                    setUserToken(res.token);
                    setUser(res.user);
                    dispatch(updateCredentials({
                        username: '',
                        password: '',
                        reEnterPassword: ''
                    }));
                    navigate('/feed');
                });
            } catch (err) {
                console.log(err);
                dispatch(updateCredentials({
                    username: '',
                    password: '',
                    reEnterPassword: ''
                }));
            }
        } else {
            setToggle(false);
        }
    }

    async function handleRegister(e) {
        e.preventDefault()
        if (toggle) {
            try {
                await authServices.register({ credentials }).then(async (registerRes) => {
                    await authServices.login({
                        username: credentials.username,
                        password: credentials.password
                    }).then((loginRes) => {
                        setUserToken(loginRes.token);
                        setUser(loginRes.user);
                        dispatch(updateCredentials({
                            username: '',
                            password: '',
                            reEnterPassword: ''
                        }));
                        navigate('/feed');
                    })
                });

            } catch (err) {
                console.log(err);
                dispatch(updateCredentials({
                    username: '',
                    password: '',
                    reEnterPassword: ''
                }));
            }
        } else {
            setToggle(true);
        }
    }

    useEffect(() => {
        console.log(toggle)
    }, [toggle])

    return (
        <div className='Auth'>
            <div className='auth-content'>
                <Link to='/'>
                    <img src="https://i.imgur.com/fUPednw.png" alt="TV logo" />
                </Link>
                <div className='auth-forms'>
                    <div className='auth-buttons'>
                        <div className={`auth-button-back${toggle === null ? ' start' : !toggle ? ' left' : ' right'}`}></div>
                        <button className='login-button' onClick={handleLogin}>Login</button>
                        <button className='register-button' onClick={handleRegister}>Register</button>
                    </div>
                    {!toggle ? <Login selected={toggle} /> : <Register selected={!toggle} />}
                </div>
            </div>
            <Carousel />
        </div>
    );
};
