import './Error.css';

import { Link } from 'react-router-dom';

export default function Error() {
    return (
        <div className='Error'>
            <h1>Error 404</h1>
            <p>Page not found, please <Link to='/feed'>return to your feed</Link>.</p>
        </div>
    );
};
