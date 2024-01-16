import './Header.css';
import { Link } from "react-router-dom";
import SearchBar from '../SearchBar/SearchBar';

export default function Header() {
    return (
        <div className='Header'>
            {/* Add img tag for logo */}
            <Link to='/'>
                <h1>Rabbt Ears</h1>
            </Link>
            <SearchBar />
            {/* Add user icon */}
        </div>
    );
};
