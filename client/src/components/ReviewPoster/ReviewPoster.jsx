import './ReviewPoster.css';

export default function ReviewPoster({ source, altText, rating, user }) {
    return (
        <div className='ReviewPoster'>
            <img src={source} alt={altText} />
            <div className='text'>
                <p className='rating'>{rating.toString().length < 3 ? `${rating}.0` : rating}</p>
                <p className='user'>{user}</p>
            </div>
        </div>
    );
};
