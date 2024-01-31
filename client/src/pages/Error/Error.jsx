//Imports style sheet
import './Error.css';

//Imports navigation tool from react-router-dom
import { Link } from 'react-router-dom';

//Exports Erro page with error message and link back to feed
export default function Error() {
    return (
        <div className='Error'>
            <h1>Error 404</h1>
            <p>Page not found, please <Link to='/feed'>return to your feed</Link>.</p>
        </div>
    );
};
