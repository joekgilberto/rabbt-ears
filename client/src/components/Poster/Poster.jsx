import './Poster.css';

export default function Poster({ source, altText }) {
    return (
        <img className='Poster' src={source} alt={altText} />
    );
};
