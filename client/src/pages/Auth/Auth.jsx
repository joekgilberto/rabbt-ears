import './Auth.css';
import { useState } from 'react';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';

export default function Auth({ page }) {
    const [toggle, setToggle] = useState(false)

    function handleChange(e){
        setToggle(!toggle)
    }

    return (
        <div className='Auth'>
            {!toggle?<Login toggle={handleChange} />:<Register toggle={handleChange} />}
        </div>
    );
};
