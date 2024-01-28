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
        'Absolute Boys Content',
        'Addicted',
        'Annoying',
        'Background Noise',
        'Bingeable',
        'Classic TV',
        'Chilling (EEK!)',
        'Comfort Show',
        'Criminally Good',
        'Date Night TV',
        'Drama Queen',
        'Drawn To It',
        'Dribble',
        'Exciting',
        'Family Fav',
        'Fantastical',
        'Fascinating',
        'Formulaic',
        'Girl Power!',
        'Good Enough',
        'Grinds My Gears',
        'Heroic',
        'Historic Television',
        'Insightful',
        'Legends Only',
        'Lil\' Silly',
        'LOL Out Loud Funny',
        'Masterpiece',
        'Meh',
        'Messy',
        'Must Watch',
        'Nothing Like It',
        'Obsessed',
        'Out Of This World',
        'Poorly Written',
        'Revolutionary',
        'Serious',
        'Sludge',
        'Spooky',
        'Stupid',
        'Tearjerker',
        'Terrible',
        'Thrilling',
        'Too Much',
        'Too Real',
        'Totally Tubular',
        'Trash TV',
        'Trendsetter',
        'Tropey',
        'Zany'
    ])
    const dispatch = useDispatch();
    const loading = useSelector(isLoading);
    const error = useSelector(hasError);
    const review = useSelector(selectEditReview);

    function handleChange(e) {
        if (e.target.name === 'fav') {
            dispatch(updateEditReview({
                ...review,
                [e.target.name]: !review.fav
            }));
        } else {
            dispatch(updateEditReview({
                ...review,
                [e.target.name]: e.target.value
            }));
        }
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

    function handleFav(e) {
        dispatch(updateEditReview({
            ...review,
            fav: !fav
        }));
        setFav(!fav);
    }

    function handleTag(e) {
        e.preventDefault();
        const addedTags = [...review.tags, e.target.value];
        addedTags.sort();
        dispatch(updateEditReview({
            ...review,
            tags: addedTags
        }));

        const lessenedTags = [...tags];
        const idx = lessenedTags.indexOf(e.target.value);

        if (idx > -1) {
            lessenedTags.splice(idx, 1);
        }

        lessenedTags.sort();
        setTags(lessenedTags);
    }

    function handleUntag(e) {
        e.preventDefault();
        const addedTags = [...tags, e.target.value];
        addedTags.sort();
        setTags(addedTags);

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
                if (tags.includes(tag)) {
                    const lessenedTags = [...tags];
                    const idx = lessenedTags.indexOf(tag);

                    if (idx > -1) {
                        lessenedTags.splice(idx, 1);
                    }

                    lessenedTags.sort();
                    setTags(lessenedTags);
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
                        <label onClick={handleFav}>Favorite
                            <img className={!fav ? 'white' : ''} src='https://upload.wikimedia.org/wikipedia/commons/c/c4/Star-front-premium.png' />
                        </label>
                        <label onClick={handleClick}>Tags
                            <p>{bttn}</p>
                        </label>
                        {toggle ?
                                <div className='edit-potential-tags'>
                                    {tags.map((tag, idx) => {
                                        return <button key={idx} className='edit-tag' value={tag} onClick={handleTag}>+ {tag}</button>
                                    })}
                                </div>
                                : null}
                        <label className='edit-thoughts'>Thoughts
                            <textarea name='review' value={review.review} onChange={handleChange} />
                        </label>
                        <button className='edit-put' type='submit'>Save</button>
                    </form>
                    <div className='edit-chosen-tags'>
                        {review.tags.map((tag, idx) => {
                            return <button key={idx} className='edit-tag' value={tag} onClick={handleUntag}>- {tag}</button>
                        })}
                    </div>
                </>
                :
                <Loading />}
        </div>
    );
};
