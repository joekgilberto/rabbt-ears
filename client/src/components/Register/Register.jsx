import './Register.css';

import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { register, login } from '../../utilities/auth/auth-service';
import { setUserToken, setUser } from '../../utilities/local-storage';
import { updateCredentials, selectCredentials  } from '../../features/authSlice';

export default function Register({ toggle }) {

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
            await register({credentials}).then(async(registerRes)=>{
                await login({
                    username: credentials.username,
                    password: credentials.password
                }).then((loginRes)=>{
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
    }

    return (
        <div className='Register'>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Username' name='username' autoComplete='username' maxlength='12' value={credentials.username} onChange={handleChange}></input>
                <input type='password' placeholder='Password' name='password' autoComplete='password' minLength='8' value={credentials.password} onChange={handleChange}></input>
                <input type='password' placeholder='Re-Enter Password' name='reEnterPassword' autoComplete='password' minLength='8' value={credentials.reEnterPassword} onChange={handleChange}></input>
                <button type='submit'>Register</button>
                <button onClick={toggle}>Login</button>
            </form>
        </div>
    );
};
