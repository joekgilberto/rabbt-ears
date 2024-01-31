//Imports style sheet
import './Login.css';

//Imports reducer tools from Redux, imports custom Redux actions to retrieve and update credentials
import { useDispatch, useSelector } from 'react-redux';
import { updateCredentials, selectCredentials, selectLoginError } from '../../features/authSlice';

//Imports loading component
import Loading from '../Loading/Loading';

//Exports Login funciton form that allows users to login or receive a login error
export default function Login({ submit }) {

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
        <div className='Login'>
            {credentials ?
                <form onSubmit={submit}>
                    <input type='text' placeholder='Username' name='username' autoComplete='username' value={credentials.username} onChange={handleChange} required />
                    <input type='password' placeholder='Password' name='password' autoComplete='password' value={credentials.password} onChange={handleChange} required />
                    <input className='auth-submit' type='submit' />
                    {error ?
                        <p className='auth-error'>{error}</p>
                        : null}
                </form>
                :
                <Loading />}
        </div>
    );
};
