import './New.css';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { getUserToken } from '../../utilities/local-storage';
import { useDispatch, useSelector } from 'react-redux';
import { isLoading, hasError, loadShow, selectNewReview, selectShow, updateNewReview } from '../../features/newReviewSlice';
import * as reviewsServices from '../../utilities/reviews/reviews-service';

import Loading from '../../components/Loading/Loading';
import Tag from '../../components/Tag/Tag';

export default function New() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [toggle, setToggle] = useState(false)
    const [bttn, setBttn] = useState('+')
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

    function handleTag(e) {
        e.preventDefault();
        console.log(e.target)
        const addedTags = [...review.tags, e.target.id];
        addedTags.sort();
        dispatch(updateNewReview({
            ...review,
            tags: addedTags
        }));

        const lessenedTags = [...tags];
        const idx = lessenedTags.indexOf(e.target.id);

        if (idx > -1) {
            lessenedTags.splice(idx, 1);
        }

        lessenedTags.sort();
        setTags(lessenedTags);

        setToggle(false)
        setBttn('+')
    }

    function handleUntag(e) {
        e.preventDefault();
        const addedTags = [...tags, e.target.id];
        addedTags.sort();
        setTags(addedTags);

        const lessenedTags = [...review.tags];
        const idx = lessenedTags.indexOf(e.target.id);

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
                dispatch(updateNewReview({
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
                dispatch(loadShow(id));
                navigate(`/shows/${showId}`)
            })
        } catch (err) {
            console.log(err);
            dispatch(updateNewReview({
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
        console.log(review.tags)
    }, [review.tags])

    if (loading) {
        return <Loading />
    }

    return (
        <div className='New'>
            {token && show.id ?
                <>
                    <form onSubmit={handleSubmit}>
                        <h2>New {show.name} Review</h2>
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
                        <label>Favorite
                            <input type='checkbox' name='fav' onChange={handleChange} />
                        </label>
                        <label>Tags
                            <button onClick={handleClick}>{bttn}</button>
                            {toggle ?
                                <div className='new-potential-tags'>
                                    {tags.map((tag, idx) => {
                                        return <Tag key={idx} symbol={'+'} tag={tag} handleClick={handleTag} />

                                    })}
                                </div>
                                : null}
                        </label>
                        <label>Thoughts
                            <textarea name='review' onChange={handleChange} />
                        </label>
                        <button type='submit'>Post</button>
                    </form>
                    <div className='new-chosen-tags'>
                        {review.tags.map((tag, idx) => {
                            return <Tag key={idx} symbol={'-'} tag={tag} handleClick={handleUntag} />
                        })}
                    </div>
                </>
                :
                <Loading />}
        </div>
    );
};
