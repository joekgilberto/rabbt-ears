//Imports style sheet
import './Register.css';

//Imports reducer tools from Redux, imports custom Redux actions to retrieve and update credentials
import { useDispatch, useSelector } from 'react-redux';
import { updateCredentials, selectCredentials, selectRegisterError } from '../../features/authSlice';

//Imports Loading component
import Loading from '../Loading/Loading';

//Exports Register funciton form that allows users to register for auth or receive a registration error
export default function Register({ submit }) {

    const dispatch = useDispatch();
    const credentials = useSelector(selectCredentials);
    const error = useSelector(selectRegisterError);

    function handleChange(e) {
        dispatch(updateCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className='Register'>
            {credentials ?
                <form onSubmit={submit}>
                    <input type='text' placeholder='Username' name='username' autoComplete='username' maxLength='12' value={credentials.username} onChange={handleChange} required />
                    <input type='password' placeholder='Password' name='password' autoComplete='password' minLength='8' value={credentials.password} onChange={handleChange} required />
                    <input type='password' placeholder='Re-Enter Password' name='reEnterPassword' autoComplete='password' minLength='8' value={credentials.reEnterPassword} onChange={handleChange} required />
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
