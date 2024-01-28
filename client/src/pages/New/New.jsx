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
    const [token, setToken] = useState(null);
    const [toggle, setToggle] = useState(false)
    const [bttn, setBttn] = useState('+')
    const [initReview, setInitReview] = useState({
        rating: 0,
        review: '',
        title: '',
        poster: '',
        showId: 0,
        fav: false,
        tags: [],
        username: '',
        user: ''
    })
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
    const review = useSelector(selectNewReview);
    const show = useSelector(selectShow);

    function handleChange(e) {
        if (e.target.name === 'fav') {
            dispatch(updateNewReview({
                ...review,
                [e.target.name]: !review.fav
            }));
        } else {
            dispatch(updateNewReview({
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

    function handleFav(e){
        dispatch(updateNewReview({
            ...review,
            fav: !fav
        }));
        setFav(!fav);
    }

    function handleTag(e) {
        e.preventDefault();
        const addedTags = [...review.tags, e.target.value];
        addedTags.sort();
        dispatch(updateNewReview({
            ...review,
            tags: addedTags
        }));
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

        dispatch(updateNewReview({
            ...review,
            tags: lessenedTags
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const showId = review.showId;
        try {
            await reviewsServices.createReview(review).then((res) => {
                dispatch(updateNewReview(initReview));
                dispatch(loadShow(id));
                navigate(`/shows/${showId}`)
            })
        } catch (err) {
            console.log(err);
            dispatch(updateNewReview(initReview));
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

    if (loading) {
        return <Loading />
    }

    return (
        <div className='New'>
            {token && show.id ?
                <>
                    <h1>New <span className='new-show-name'>{show.name}</span> Review</h1>
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
                        <label onClick={handleFav}>Favorite
                            <img className={!fav?'white':''} src='https://upload.wikimedia.org/wikipedia/commons/c/c4/Star-front-premium.png' />
                        </label>
                        <label onClick={handleClick}>Tags
                            <p>{bttn}</p>
                        </label>
                        {toggle ?
                                <div className='new-potential-tags'>
                                    {tags.map((tag, idx) => {
                                        return <button key={idx} className='new-tag' value={tag} onClick={handleTag}>+ {tag}</button>
                                    })}
                                </div>
                                : null}
                        <label className='new-thoughts'>Thoughts
                            <textarea name='review' onChange={handleChange} />
                        </label>
                        <button className='new-post' type='submit'>Post</button>
                    </form>
                    <div className='new-chosen-tags'>
                        {review.tags.map((tag, idx) => {
                            return <button key={idx} className='new-tag' value={tag} onClick={handleUntag}>- {tag}</button>
                        })}
                    </div>
                </>
                :
                <Loading />}
        </div>
    );
};
