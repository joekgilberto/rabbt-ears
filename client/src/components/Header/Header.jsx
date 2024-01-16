import './Header.css';
import SearchBar from '../SearchBar/SearchBar';

export default function Header() {
    return (
        <div className='Header'>
            {/* Add img tag for logo */}
            <a href='/'>
                <h1>Rabbt Ears</h1>
            </a>
            <SearchBar />
            {/* Add user icon */}
        </div>
    );
};
