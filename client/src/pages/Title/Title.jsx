import './Title.css';
import { Link } from "react-router-dom";

export default function Title() {
    return (
        <div className='Title'>
            <Link to='/'>
                <h1>Rabbt Ears</h1>
            </Link>
            <ul>
                <li>
                    <Link to='/auth'>
                        {/* Toggle between Login and Profile */}
                        Login
                    </Link>
                </li>
                <li>
                    <Link to='/feed'>
                        Reviews
                    </Link>
                </li>
                <li>
                    {/* Randomize random show */}
                    <Link to='/show/1'>
                        Random
                    </Link>
                </li>
            </ul>

        </div>
    );
};
