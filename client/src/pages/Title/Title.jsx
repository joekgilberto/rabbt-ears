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
                        LOGIN
                    </Link>
                </li>
                <li>
                    <Link to='/feed'>
                        FEED
                    </Link>
                </li>
                <li>
                    {/* Randomize random show */}
                    <Link to='/show/1'>
                        RANDOM
                    </Link>
                </li>
            </ul>

        </div>
    );
};
