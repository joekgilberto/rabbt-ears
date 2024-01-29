import './Edit.css';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { getUserToken } from '../../utilities/local-storage';
import { useDispatch, useSelector } from 'react-redux';
import { isLoading, hasError, loadReview, selectEditReview, updateEditReview } from '../../features/editReviewSlice';
import * as reviewsServices from '../../utilities/reviews/reviews-service';

import Loading from '../../components/Loading/Loading';

export default function Edit() {


    const { id } = useParams();
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [toggle, setToggle] = useState(false)
    const [bttn, setBttn] = useState('+')
    const [fav, setFav] = useState(false);
    const [tags, setTags] = useState([
        { text: 'Absolute Boys Content', symbol: '+' },
        { text: 'Addicted', symbol: '+' },
        { text: 'Annoying', symbol: '+' },
        { text: 'Background Noise', symbol: '+' },
        { text: 'Bingeable', symbol: '+' },
        { text: 'Classic TV', symbol: '+' },
        { text: 'Chilling (EEK!)', symbol: '+' },
        { text: 'Comfort Show', symbol: '+' },
        { text: 'Criminally Good', symbol: '+' },
        { text: 'Dark', symbol: '+' },
        { text: 'Date Night TV', symbol: '+' },
        { text: 'Drama Queen', symbol: '+' },
        { text: 'Drawn To It', symbol: '+' },
        { text: 'Dribble', symbol: '+' },
        { text: 'Exciting', symbol: '+' },
        { text: 'Family Fav', symbol: '+' },
        { text: 'Fantastical', symbol: '+' },
        { text: 'Fascinating', symbol: '+' },
        { text: 'Formulaic', symbol: '+' },
        { text: 'Girl Power!', symbol: '+' },
        { text: 'Good Enough', symbol: '+' },
        { text: 'Grinds My Gears', symbol: '+' },
        { text: 'Heroic', symbol: '+' },
        { text: 'Historic Television', symbol: '+' },
        { text: 'Insightful', symbol: '+' },
        { text: 'Legends Only', symbol: '+' },
        { text: 'Lil\' Silly', symbol: '+' },
        { text: 'LOL Out Loud Funny', symbol: '+' },
        { text: 'Masterpiece', symbol: '+' },
        { text: 'Meh', symbol: '+' },
        { text: 'Messy', symbol: '+' },
        { text: 'Mind Bending', symbol: '+' },
        { text: 'Must Watch', symbol: '+' },
        { text: 'Nothing Like It', symbol: '+' },
        { text: 'Obsessed', symbol: '+' },
        { text: 'Out Of This World', symbol: '+' },
        { text: 'Poorly Written', symbol: '+' },
        { text: 'Revisit Often', symbol: '+' },
        { text: 'Revolutionary', symbol: '+' },
        { text: 'Serious', symbol: '+' },
        { text: 'Sludge', symbol: '+' },
        { text: 'Spooky', symbol: '+' },
        { text: 'Stupid', symbol: '+' },
        { text: 'Tearjerker', symbol: '+' },
        { text: 'Terrible', symbol: '+' },
        { text: 'Thrilling', symbol: '+' },
        { text: 'Too Much', symbol: '+' },
        { text: 'Too Real', symbol: '+' },
        { text: 'Totally Tubular', symbol: '+' },
        { text: 'Trash TV', symbol: '+' },
        { text: 'Trendsetter', symbol: '+' },
        { text: 'Tropey', symbol: '+' },
        { text: 'Well Written', symbol: '+' },
        { text: 'Zany', symbol: '+' }
    ])
    const dispatch = useDispatch();
    const loading = useSelector(isLoading);
    const error = useSelector(hasError);
    const review = useSelector(selectEditReview);

    function handleChange(e) {
        dispatch(updateEditReview({
            ...review,
            [e.target.name]: e.target.value
        }));
    };

    function handleClick(e) {
        e.preventDefault();
        if (!toggle) {
            setBttn('-');
        } else if (toggle) {
            setBttn('+');
        }
        setToggle(!toggle);
    }

    function handleFinish(e) {
        console.log(review.finished)
        console.log(!review.finished)
        dispatch(updateEditReview({
            ...review,
            finished: !review.finished
        }));
    }

    function handleFav(e) {
        dispatch(updateEditReview({
            ...review,
            fav: !fav
        }));
        setFav(!fav);
    }

    function handleTag(e) {
        e.preventDefault();

        if (tags[e.target.id].symbol === '+') {
            const addedTags = [...review.tags, e.target.value];
            addedTags.sort();
            dispatch(updateEditReview({
                ...review,
                tags: addedTags
            }));

            tags[e.target.id] = { text: e.target.value, symbol: '-' };
            console.log(tags[e.target.id])

        } else if (tags[e.target.id].symbol === '-') {
            const lessenedTags = [...review.tags];
            const idx = lessenedTags.indexOf(e.target.value);

            if (idx > -1) {
                lessenedTags.splice(idx, 1);
            }

            lessenedTags.sort();

            dispatch(updateEditReview({
                ...review,
                tags: lessenedTags
            }));

            tags[e.target.id] = { text: e.target.value, symbol: '+' };

        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await reviewsServices.updateReview(review._id, review).then((res) => {
                dispatch(updateEditReview({
                    rating: 0,
                    review: '',
                    title: '',
                    poster: '',
                    showId: 0,
                    fav: false,
                    tags: [],
                    username: '',
                    user: ''
                }));
                dispatch(loadReview(id));
                navigate(`/reviews/${id}`)
            })
        } catch (err) {
            console.log(err);
            dispatch(updateEditReview({
                rating: 0,
                review: '',
                title: '',
                poster: '',
                showId: 0,
                fav: false,
                tags: [],
                username: '',
                user: ''
            }));
            dispatch(loadReview(id));
        }
    }

    useEffect(() => {
        setToken(getUserToken());
    }, [])

    useEffect(() => {
        if (review.tags?.length) {
            for (let tag of review.tags) {
                const idx = tags.map(t => t.text).indexOf(tag);

                if (idx > -1) {
                    tags[idx] = {...tags[idx], symbol:'-'}
                }
            }
        }
    }, [review.tags])

    useEffect(() => {
        setFav(review.fav);
    }, [review.fav])

    useEffect(() => {
        dispatch(loadReview(id));
    }, [dispatch])

    useEffect(() => {
        dispatch(loadReview(id));
    }, [id]);

    if (loading) {
        return <Loading />
    }

    return (
        <div className='Edit'>
            {token && review._id ?
                <>
                    <h1>Edit {review.username}'s <span className='italic'>{review.title}</span> Review</h1>
                    <form onSubmit={handleSubmit}>
                        <img className='edit-poster' src={review.poster ? review.poster : 'none'} alt={review.title} onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = 'https://i.imgur.com/zuvrO9V.png';
                        }} />
                        <label>Rating
                            <select name='rating' onChange={handleChange}>
                                <option selected={review.rating === 0}>0.0</option>
                                <option selected={review.rating === .5}>0.5</option>
                                <option selected={review.rating === 1}>1.0</option>
                                <option selected={review.rating === 1.5}>1.5</option>
                                <option selected={review.rating === 2}>2.0</option>
                                <option selected={review.rating === 2.5}>2.5</option>
                                <option selected={review.rating === 3}>3.0</option>
                                <option selected={review.rating === 3.5}>3.5</option>
                                <option selected={review.rating === 4}>4.0</option>
                                <option selected={review.rating === 4.5}>4.5</option>
                                <option selected={review.rating === 5}>5.0</option>
                            </select>
                        </label>
                        <label onChange={handleFinish}>Finished
                            <div className='container'>
                                <input className='checkbox' type='checkbox' name='finished' defaultChecked={review.finished} />
                                <span className='checkmark'></span>
                            </div>
                        </label>
                        <label onClick={handleFav}>Favorite
                            <img className={!fav ? 'white' : ''} src='https://upload.wikimedia.org/wikipedia/commons/c/c4/Star-front-premium.png' />
                        </label>
                        <label onClick={handleClick}>Tags
                            <p>{bttn}</p>
                        </label>
                        {toggle ?
                            <div className='edit-tags'>
                                {tags.map((tag, idx) => {
                                    return <button key={idx} id={idx} className={`edit-tag${tag.symbol === '+' ? ' plus' : tag.symbol === '-' ? ' minus' : ''}`} value={tag.text} onClick={handleTag}>{tag.symbol} {tag.text}</button>
                                })}
                            </div>
                            : null}
                        <label className='edit-thoughts'>Thoughts
                            <textarea name='review' value={review.review} onChange={handleChange} />
                        </label>
                        <button className='edit-put' type='submit'>Save</button>
                    </form>
                </>
                :
                <Loading />}
        </div>
    );
};
