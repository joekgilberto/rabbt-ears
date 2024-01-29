import './Login.css';

import { useDispatch, useSelector } from 'react-redux';
import { updateCredentials, selectCredentials, selectLoginError } from '../../features/authSlice';

import Loading from '../Loading/Loading';
import { useEffect } from 'react';

export default function Login({ handleSubmit }) {

    const dispatch = useDispatch();
    const credentials = useSelector(selectCredentials);
    const error = useSelector(selectLoginError);

    function handleChange(e) {
        dispatch(updateCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className={`Login${error?.message?'error':''}`}>
            {credentials ?
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='Username' name='username' autoComplete='username' value={credentials.username} onChange={handleChange}></input>
                    <input type='password' placeholder='Password' name='password' autoComplete='password' value={credentials.password} onChange={handleChange}></input>
                    <input className='auth-submit' type='submit'></input>
                    {error ?
                        <p className='login-error'>{error.response?.data.error}</p>
                        : null}
                </form>
                :
                <Loading />}
        </div>
    );
};
