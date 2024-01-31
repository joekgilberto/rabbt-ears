//Imports style sheet
import './Auth.css';

//Improts state tools from React, navigation tools from react-router-dom, reducer tools from Redux, custom reducer state and action tools from the authSlice, custom local storage tools, auth services tools, and custom tools 
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { updateCredentials, setLoginError, setRegisterError, selectCredentials } from '../../features/authSlice';
import { getUserToken, getUser, setUserToken, setUser } from '../../utilities/local-storage';
import * as authServices from '../../utilities/auth/auth-service';
import * as tools from '../../utilities/tools';

//Imports Carousel, Login, and Register components
import Carousel from '../../components/Carousel/Carousel';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';

//Exports Auth page with a logo, toggle buttons between login and register, and login and register component forms
export default function Auth() {

    const [toggle, setToggle] = useState(null)
    const initCredentials = {
        username: '',
        password: '',
        reEnterPassword: ''
    };
    const credentials = useSelector(selectCredentials);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Throws an error if a response contains an error
    function handleThrowErr(res, cb) {
        if (res.code === 'ERR_BAD_REQUEST') {
            dispatch(cb(tools.simplifyErrorMessage(res.response.data.error)));
            throw Error;
        }
    }

    //If on the login form, submits credentials to login.  Otherwise, it toggles from the register to the login form
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
                    dispatch(updateCredentials(initCredentials));
                    navigate('/feed');
                });
            } catch (err) {
                console.log(err);
                dispatch(updateCredentials(initCredentials));
            }
        } else {
            setToggle(false);
        }
    }

    //If on the register form, submits credentials to register, then logins in.  Otherwise, it toggles from the login to the register form
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
                            dispatch(updateCredentials(initCredentials));
                            navigate('/feed');
                        })
                    });
                } catch (err) {
                    console.log(err);
                    dispatch(updateCredentials(initCredentials));
                }
            } else {
                dispatch(setRegisterError('Your passwords do not match.'));
            }
        } else {
            setToggle(true);
        }
    }

    //Sets credentials to init state and errors to an empty string, then, if local storage has a token and user, redirects to the profile page
    useEffect(() => {
        dispatch(updateCredentials(initCredentials));
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
