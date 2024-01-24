import './Login.css';

import { useState } from 'react';
import { useNavigate } from 'react-router';
import { login } from '../../utilities/auth/auth-service';
import { setUserToken, setUsername } from '../../utilities/local-storage';

export default function Login({ toggle }) {

    const navigate = useNavigate();

    //TODO: put formData in slice
    const initState = {
        username: '',
        password: ''
    }
    const [formData, setFormData] = useState(initState)

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await login(formData).then((res)=>{
                setUserToken(res.token);
                setUsername(res.user.username);
                setFormData(initState);
                console.log(res)
                navigate('/feed');
            });
        } catch (err) {
            console.log(err);
            setFormData(initState);
        }
    }

    return (
        <div className='Login'>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Username' name='username' autoComplete='username' onChange={handleChange}></input>
                <input type='password' placeholder='Password' name='password' autoComplete='password' onChange={handleChange}></input>
                <button type='submit'>Login</button>
                <button onClick={toggle}>Register</button>
            </form>
        </div>
    );
};
