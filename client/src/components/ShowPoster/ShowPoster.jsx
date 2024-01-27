import './ShowPoster.css';

export default function ShowPoster({ source, altText, title }) {
    return (
        <div className='ShowPoster'>
            <img src={source} alt={altText} />
            <p className='title'>{title}</p>
        </div>
    );
};
