import './Title.css';

export default function Title() {
    return (
        <div className='Title'>
            <a href='/'>
                <h1>Rabbt Ears</h1>
                <ul>
                    <li>
                        <a href='/auth'>
                            {/* Toggle between Login and Profile */}
                            Login
                        </a>
                    </li>
                    <li>
                        <a href='/feed'>
                            Reviews
                        </a>
                    </li>
                    <li>
                        {/* Randomize random show */}
                        <a href='/show/1'>
                            Random
                        </a>
                    </li>
                </ul>
            </a>
        </div>
    );
};
