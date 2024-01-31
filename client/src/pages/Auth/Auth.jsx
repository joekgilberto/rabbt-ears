import './Auth.css';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import * as authServices from '../../utilities/auth/auth-service';
import { setUserToken, setUser } from '../../utilities/local-storage';
import { useDispatch, useSelector } from 'react-redux';
import { updateCredentials, setLoginError, setRegisterError, selectCredentials } from '../../features/authSlice';
import { getUserToken, getUser } from '../../utilities/local-storage';
import * as tools from '../../utilities/tools';

import Carousel from '../../components/Carousel/Carousel';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';

export default function Auth() {

    const [toggle, setToggle] = useState(null)
    const credentials = useSelector(selectCredentials);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleThrowErr(res, cb) {
        if (res.code === 'ERR_BAD_REQUEST') {
            dispatch(cb(tools.simplifyErrorMessage(res.response.data.error)));
            throw Error;
        }
    }

    async function handleLogin(e) {
        e.preventDefault();
        if (!toggle) {
            try {
                await authServices.login({
                    username: credentials.username,
                    password: credentials.password
                }).then((res) => {
                    handleThrowErr(res, setLoginError)
                    dispatch(setLoginError(''));
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
        e.preventDefault();

        if (toggle) {
            if (credentials.password === credentials.reEnterPassword) {
                try {
                    await authServices.register({
                        username: credentials.username,
                        password: credentials.password
                    }).then(async (registerRes) => {
                        handleThrowErr(registerRes, setRegisterError);
                        await authServices.login({
                            username: credentials.username,
                            password: credentials.password
                        }).then((loginRes) => {
                            handleThrowErr(loginRes, setRegisterError);
                            dispatch(setRegisterError(''));
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
                dispatch(setRegisterError('Your passwords do not match.'));
            }
        } else {
            setToggle(true);
        }
    }

    useEffect(() => {
        dispatch(updateCredentials({
            username: '',
            password: '',
            reEnterPassword: ''
        }));
        dispatch(setLoginError(''));
        dispatch(setRegisterError(''));

        if (getUserToken() && getUser()) {
            navigate('/profile');
        }
    }, [])

    return (
        <main className='Auth'>
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
                    {!toggle ? <Login submit={handleLogin} /> : <Register submit={handleRegister} />}
                </div>
            </div>
            <Carousel />
        </main>
    );
};
