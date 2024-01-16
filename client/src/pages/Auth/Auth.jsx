import './Auth.css';
import { useState } from 'react';
import Login from '../../components/Login/Login';
import SignUp from '../../components/SignUp/SignUp';

export default function Auth({ page }) {
    const [toggle, setToggle] = useState(false)

    function handleChange(e){
        setToggle(!toggle)
    }

    return (
        <div className='Auth'>
            {!toggle?<Login toggle={handleChange} />:<SignUp toggle={handleChange} />}
        </div>
    );
};
