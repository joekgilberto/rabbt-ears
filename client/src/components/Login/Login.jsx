import './Login.css';

import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../utilities/auth/auth-service';
import { setUserToken, setUser } from '../../utilities/local-storage';
import { updateCredentials, selectCredentials } from '../../features/authSlice';
import Loading from '../Loading/Loading';

export default function Login({ toggle }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const credentials = useSelector(selectCredentials);
    
    function handleChange(e) {
        dispatch(updateCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await login({
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
    }

    return (
        <div className='Login'>
            <form onSubmit={handleSubmit}>
                {credentials ?
                    <>
                        <input type='text' placeholder='Username' name='username' autoComplete='username' value={credentials.username} onChange={handleChange}></input>
                        <input type='password' placeholder='Password' name='password' autoComplete='password' value={credentials.password} onChange={handleChange}></input>
                        <button type='submit'>Login</button>
                        <button onClick={toggle}>Register</button>
                    </>
                    :
                    <Loading />}
            </form>
        </div>
    );
};
