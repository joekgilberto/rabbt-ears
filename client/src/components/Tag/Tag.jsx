import './Tag.css';

export default function Tag({ symbol, tag, handleClick }) {
    return (
        <div className='Tag' id={tag} onClick={handleClick}>
            <p id={tag}>{symbol}</p>
            <p id={tag}>{tag}</p>
        </div>
    );
};
