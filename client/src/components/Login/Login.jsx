import './Login.css';
import { useState } from 'react';

export default function Login({ toggle }) {
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

    function handleSubmit(e) {
        e.preventDefault()
        try {
            // TODO: Make API call to user and store user information and token in slice
            console.log(formData)
        } catch (error) {
            // TODO: Display error message
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
