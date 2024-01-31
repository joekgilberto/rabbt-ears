//Imports style sheets
import './ReviewForm.css';

//Imports state tools from React, imports naviation tool from react-router, imports reducer tool from Redux
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

//Imports ToggleTag component
import ToggleTag from '../ToggleTag/ToggleTag';

//Exports function for creating or editing reviews
export default function ReviewForm({ review, cb, submit, cancel }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
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
        { text: 'Endearing', symbol: '+' },
        { text: 'Exciting', symbol: '+' },
        { text: 'Family Fav', symbol: '+' },
        { text: 'Fantastical', symbol: '+' },
        { text: 'Fascinating', symbol: '+' },
        { text: 'Feel Good', symbol: '+' },
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
        { text: 'Sweet', symbol: '+' },
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
        { text: 'Wholesome', symbol: '+' },
        { text: 'Zany', symbol: '+' }
    ]
    const [toggle, setToggle] = useState(false)
    const [bttn, setBttn] = useState('+')
    const [fav, setFav] = useState(false);
    const [tags, setTags] = useState(initTags)

    //Fucntion to update a review as it's edited
    function handleChange(e) {
        dispatch(cb({
            ...review,
            [e.target.name]: e.target.value
        }));
    };

    //Function to set a reviews' fav
    function handleFav(e) {
        dispatch(cb({
            ...review,
            fav: !fav
        }));
        setFav(!fav);
    }

    //Function to set whether a user finished a show
    function handleFinish(e) {
        dispatch(cb({
            ...review,
            finished: !review.finished
        }));
    }

    //Function toggles the tag section open or not
    function handleToggle(e) {
        e.preventDefault();
        if (!toggle) {
            setBttn('-');
        } else if (toggle) {
            setBttn('+');
        }
        setToggle(!toggle);
    }

    //Function that updates a review's tag list of added tags (if it has less than 5), and removes added tags when clicked again. It updates a tag's status either way
    function handleTag(e) {
        e.preventDefault();

        if (tags[e.target.id].symbol === '+') {
            if (review.tags.length < 5) {
                const addedTags = [...review.tags, e.target.value];
                addedTags.sort();
                dispatch(cb({
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

            dispatch(cb({
                ...review,
                tags: lessenedTags
            }));

            const tagsCache = [...tags];
            tagsCache[e.target.id] = { text: e.target.value, symbol: '+' };
            setTags(tagsCache);
        }
    }

    //Resets review and tags, and navigates to cancel string
    function handleCancel(e) {
        e.preventDefault();
        dispatch(cb(initReview));
        setTags(initTags)
        navigate(cancel);
    }

    //Calls submit function and resets review and tags
    async function handleSubmit(e) {
        await submit(e).then((res) => {
            dispatch(cb(initReview));
            setTags(initTags)
        })
    }

    //On each change of the review.tags, the list of tags is updated for those that have already been selected
    useEffect(() => {
        if (review.tags?.length) {
            const tagsCache = [...initTags];
            for (let tag of review.tags) {
                const idx = tagsCache.map(t => t.text).indexOf(tag);

                if (idx > -1) {
                    tagsCache[idx] = { ...tags[idx], symbol: '-' }
                }
            }
            setTags(tagsCache)
        }
    }, [review.tags])

    //Sets fav to review.fav upon change of review.fav
    useEffect(() => {
        setFav(review.fav);
    }, [review.fav])

    return (
        <form className='ReviewForm' onSubmit={submit}>
            <img className='review-form-poster' src={review.poster ? review.poster : 'none'} alt={review.title} onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = 'https://i.imgur.com/zuvrO9V.png';
            }} />
            <label>RATING
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
            <label className='review-form-finished' onChange={handleFinish}>FINISHED
                <div className='container'>
                    <input className='checkbox' type='checkbox' name='finished' defaultChecked={review.finished} />
                    <span className='checkmark'></span>
                </div>
            </label>
            <label className='review-form-fav' onClick={handleFav}>FAVORITE
                <img className={!fav ? 'white' : ''} src='https://upload.wikimedia.org/wikipedia/commons/c/c4/Star-front-premium.png' />
            </label>
            <label className='review-form-thoughts'>THOUGHTS
                <textarea name='review' value={review.review} onChange={handleChange} />
            </label>
            <div className='review-form-options'>
                <label className='review-form-tag-label' onClick={handleToggle}>Tags
                    <p>{bttn}</p>
                </label>
                {toggle ?
                    <div className='review-form-tags'>
                        {tags.map((tag, idx) => {
                            return <ToggleTag key={idx} idx={idx} tag={tag} count={review.tags.length} cb={handleTag} />
                        })}
                    </div>
                    : null}
                <button className='review-form-submit' type='submit'>SAVE</button>
                <button className='review-form-cancel' onClick={handleCancel}>CANCEL</button>
            </div>
        </form>
    );
};
