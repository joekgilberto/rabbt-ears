import './ReviewPoster.css';

export default function ReviewPoster({ source, altText, rating, user }) {
    return (
        <div className='ReviewPoster'>
            <img src={source} alt={altText} />
            <div className='text'>
                <p className='rating' style={
                    rating === 0 ? { backgroundColor: '#b0c2cbff' }
                        : rating > 0 && rating < 1 ? { backgroundColor: '#ff4d4dff' }
                            : rating >= 1 && rating < 2 ? { backgroundColor: '#ff9900ff' }
                                : rating >= 2 && rating < 3 ? { backgroundColor: '#ffdf00ff' }
                                    : rating >= 3 && rating < 4 ? { backgroundColor: '#6fc3ffff' }
                                        : rating >= 4 && rating < 5 ? { backgroundColor: '#51d542ff' }
                                            : rating === 5 ? { backgroundColor: '#ffa5ffff' }
                                                : { color: '#000', backgroundColor: '#fff' }
                }>{rating.toString().length < 3 ? `${rating}.0` : rating}</p>
                <p className='user'>{user}</p>
            </div>
        </div >
    );
};
