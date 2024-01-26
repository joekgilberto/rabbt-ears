import './Poster.css';

export default function Poster({ source, altText, desc }) {
    return (
        <div className='Poster'>
            <img src={source} alt={altText} />
            <p className='poster-description'>{desc}</p>
        </div>
    );
};
