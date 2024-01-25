import './Register.css';

import { useState } from 'react';
import { useNavigate } from 'react-router';
import { register,login } from '../../utilities/auth/auth-service';
import { setUserToken, setUser } from '../../utilities/local-storage';

export default function Register({ toggle }) {

    const navigate = useNavigate();

    //TODO: put formData in slice
    const initState = {
        username: '',
        password: '',
        reEnterPassword: ''
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
            await register(formData).then(async(res)=>{
                console.log(res);
                const loginInfo = {username: formData.username, password: formData.password}
                await login(loginInfo).then((finalRes)=>{
                    setUserToken(finalRes.token);
                    setUser(finalRes.user);
                    setFormData(initState);
                    console.log(finalRes);
                    navigate('/feed');
                })
            });

        } catch (err) {
            console.log(err);
            setFormData(initState);
        }
    }

    return (
        <div className='Register'>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Username' name='username' autoComplete='username' onChange={handleChange}></input>
                <input type='password' placeholder='Password' name='password' autoComplete='password' onChange={handleChange}></input>
                <input type='password' placeholder='Re-Enter Password' name='reEnterPassword' autoComplete='password' onChange={handleChange}></input>
                <button type='submit'>Register</button>
                <button onClick={toggle}>Login</button>
            </form>
        </div>
    );
};
