import './Register.css';
import { useState } from 'react';

export default function Register({ toggle }) {
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
