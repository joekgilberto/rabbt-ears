import './ShowPoster.css';

export default function ShowPoster({ source, title }) {
    return (
        <div className='ShowPoster'>
            <img src={source?source:'none'} alt={title} onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = 'https://i.imgur.com/zuvrO9V.png';
            }} />
            <p className='title'>{title}</p>
        </div>
    );
};
