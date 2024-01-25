import './Profile.css';

import { getUser } from '../../utilities/local-storage';
import { useState } from 'react';

export default function Profile() {

    const [user,setUser] = useState(getUser());
    console.log(user)
    return (
        <div className='Profile'>
            <h2>{user.username}</h2>
        </div>
    );
};
