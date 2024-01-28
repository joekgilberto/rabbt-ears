import './ProfilePoster.css';

export default function ProfilePoster({ source, altText, rating, fav }) {
    return (
        <div className='ProfilePoster'>
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
                                            : ' five'}`} src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Star-front-premium.png/640px-Star-front-premium.png' alt='star' />
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
            </div>
        </div >
    );
};
