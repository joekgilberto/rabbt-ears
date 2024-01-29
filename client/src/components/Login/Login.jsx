import './Login.css';

import { useDispatch, useSelector } from 'react-redux';
import { updateCredentials, selectCredentials } from '../../features/authSlice';

import Loading from '../Loading/Loading';

export default function Login({ handleSubmit }) {

    const dispatch = useDispatch();
    const credentials = useSelector(selectCredentials);

    function handleChange(e) {
        dispatch(updateCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        }));
    };



    return (
        <div className='Login'>
            {credentials ?
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='Username' name='username' autoComplete='username' value={credentials.username} onChange={handleChange}></input>
                    <input type='password' placeholder='Password' name='password' autoComplete='password' value={credentials.password} onChange={handleChange}></input>
                    <input className='auth-submit' type='submit'></input>
                </form>
                :
                <Loading />}
        </div>
    );
};
