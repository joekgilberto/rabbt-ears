//Imports style sheet
import './ShowPoster.css';

//Takes in image source, and title and returns a poster with a title for the Feed page
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
