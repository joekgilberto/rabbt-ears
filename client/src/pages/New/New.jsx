import './New.css';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { getUserToken } from '../../utilities/local-storage';
import { useDispatch, useSelector } from 'react-redux';
import { isLoading, hasError, loadShow, selectNewReview, selectShow, updateNewReview } from '../../features/newReviewSlice';
import * as reviewsServices from '../../utilities/reviews/reviews-service';

import Loading from '../../components/Loading/Loading';

export default function New() {

    const { id } = useParams();
    const navigate = useNavigate();
    const initReview = {
        rating: 0,
        review: '',
        title: '',
        poster: '',
        showId: 0,
        finished: false,
        fav: false,
        tags: [],
        username: '',
        user: ''
    }

    const initTags = [
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
    ]
    const [token, setToken] = useState(null);
    const [toggle, setToggle] = useState(false)
    const [bttn, setBttn] = useState('+')
    const [fav, setFav] = useState(false);
    const [tags, setTags] = useState(initTags);
    const dispatch = useDispatch();
    const loading = useSelector(isLoading);
    const error = useSelector(hasError);
    const review = useSelector(selectNewReview);
    const show = useSelector(selectShow);

    function handleChange(e) {
        dispatch(updateNewReview({
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
        dispatch(updateNewReview({
            ...review,
            finished: !review.finished
        }));
    }

    function handleFav(e) {
        dispatch(updateNewReview({
            ...review,
            fav: !fav
        }));
        setFav(!fav);
    }

    function handleTag(e) {
        e.preventDefault();

        if (tags[e.target.id].symbol === '+') {
            if (review.tags.length < 5) {
                const addedTags = [...review.tags, e.target.value];
                addedTags.sort();
                dispatch(updateNewReview({
                    ...review,
                    tags: addedTags
                }));

                const tagsCache = [...tags];
                tagsCache[e.target.id] = { text: e.target.value, symbol: '-' };
                setTags(tagsCache);
            }
        } else if (tags[e.target.id].symbol === '-') {
            const lessenedTags = [...review.tags];
            const idx = lessenedTags.indexOf(e.target.value);

            if (idx > -1) {
                lessenedTags.splice(idx, 1);
            }

            lessenedTags.sort();

            dispatch(updateNewReview({
                ...review,
                tags: lessenedTags
            }));

            const tagsCache = [...tags];
            tagsCache[e.target.id] = { text: e.target.value, symbol: '+' };
            setTags(tagsCache);
        }
    }

    function handleCancel(e){
        e.preventDefault();
        dispatch(updateNewReview(initReview));
        setTags(initTags)
        navigate(`/shows/${id}`);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await reviewsServices.createReview(review).then((res) => {
                dispatch(updateNewReview(initReview));
                setTags(initTags)
                dispatch(loadShow(id));
                navigate(`/shows/${id}`)
            })
        } catch (err) {
            console.log(err);
            dispatch(updateNewReview(initReview));
            setTags(initTags)
            dispatch(loadShow(id));
        }
    }

    useEffect(() => {
        setToken(getUserToken());
    }, [])

    useEffect(() => {
        dispatch(loadShow(id));
    }, [dispatch])

    useEffect(() => {
        dispatch(loadShow(id));
    }, [id]);

    if (loading) {
        return <Loading />
    }

    return (
        <div className='New'>
            {token && show.id ?
                <>
                    <h1>New <span className='italic'>{show.name}</span> Review</h1>
                    <form onSubmit={handleSubmit}>
                        <img className='new-poster' src={show.image ? show.image.original : 'none'} alt={show.name} onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = 'https://i.imgur.com/zuvrO9V.png';
                        }} />
                        <label>Rating
                            <select name='rating' onChange={handleChange}>
                                <option>0.0</option>
                                <option>0.5</option>
                                <option>1.0</option>
                                <option>1.5</option>
                                <option>2.0</option>
                                <option>2.5</option>
                                <option>3.0</option>
                                <option>3.5</option>
                                <option>4.0</option>
                                <option>4.5</option>
                                <option>5.0</option>
                            </select>
                        </label>
                        <label onChange={handleFinish}>Finished
                            <div className='container'>
                                <input className='checkbox' type='checkbox' name='finished' />
                                <span className='checkmark'></span>
                            </div>
                        </label>
                        <label onClick={handleFav}>Favorite
                            <img className={!fav ? 'white' : ''} src='https://upload.wikimedia.org/wikipedia/commons/c/c4/Star-front-premium.png' />
                        </label>
                        <label className='new-thoughts'>Thoughts
                            <textarea name='review' onChange={handleChange} />
                        </label>
                        <div className='new-options'>
                            <label className='new-tag-label' onClick={handleClick}>Tags
                                <p>{bttn}</p>
                            </label>
                            {toggle ?
                                <div className='new-tags'>
                                    {tags.map((tag, idx) => {
                                        return <button key={idx} id={idx} className={`new-tag${tag.symbol === '+' && review.tags.length >= 5 ? ' disable' : tag.symbol === '+' ? ' plus' : tag.symbol === '-' ? ' minus' : ''}`} value={tag.text} onClick={handleTag}>{tag.symbol} {tag.text}</button>
                                    })}
                                </div>
                                : null}
                            <button className='new-post' type='submit'>Post</button>
                            <button className='new-cancel' onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>
                </>
                :
                <Loading />}
        </div>
    );
};
