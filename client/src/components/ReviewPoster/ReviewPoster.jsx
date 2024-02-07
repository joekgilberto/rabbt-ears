//Imports style sheet
import './ReviewPoster.css';

//Takes in image source, alt text, rating, favorite status, and user and returns a poster with a rating alongside a username for the Feed page
export default function ReviewPoster({ source, altText, rating, fav, user }) {
    return (
        <div className='ReviewPoster'>
            <div className='poster-div'>
                <img className='poster' src={source?source:'none'} alt={altText} onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = 'https://i.imgur.com/zuvrO9V.png';
                }} />

                {fav ?
                    <img className={`fav${rating === 0 ? ' zero'
                        : rating === .5 ? ' point-five'
                            : rating === 1 || rating === 1.5 ? ' one'
                                : rating === 2 || rating === 2.5 ? ' two'
                                    : rating === 3 || rating === 3.5 ? ' three'
                                        : rating === 4 || rating === 4.5 ? ' four'
                                            : ' five'}`} src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Bookmark-fav-front-color.png/1200px-Bookmark-fav-front-color.png?20230821164801' alt='star' />
                    :
                    null}
            </div>
            <div className='text'>
                <p className={`rating${rating === 0 ? ' zero'
                    : rating === .5 ? ' point-five'
                        : rating === 1 || rating === 1.5 ? ' one'
                            : rating === 2 || rating === 2.5 ? ' two'
                                : rating === 3 || rating === 3.5 ? ' three'
                                    : rating === 4 || rating === 4.5 ? ' four'
                                        : ' five'}`}>{rating.toString().length < 3 ? `${rating}.0` : rating}</p>
                <p className='user'>{user}</p>
            </div>
        </div >
    );
};
