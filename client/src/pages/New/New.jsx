import './New.css';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { getUserToken } from '../../utilities/local-storage';
import { useDispatch, useSelector } from 'react-redux';
import { isLoading, hasError, loadShow, selectNewReview, selectShow, updateNewReview } from '../../features/newReviewSlice';
import * as reviewServices from '../../utilities/review/review-services';

import Loading from '../../components/Loading/Loading';
import ReviewForm from '../../components/ReviewForm/ReviewForm';

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
    const token = getUserToken();
    const [toggle, setToggle] = useState(false)
    const [bttn, setBttn] = useState('+')
    const [fav, setFav] = useState(false);
    const [tags, setTags] = useState(initTags);
    const dispatch = useDispatch();
    const loading = useSelector(isLoading);
    const error = useSelector(hasError);
    const review = useSelector(selectNewReview);
    const show = useSelector(selectShow);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await reviewServices.createReview(review).then((res) => {
                dispatch(loadShow(id));
                navigate(`/shows/${id}`)
            })
        } catch (err) {
            console.log(err);
            dispatch(loadShow(id));
        }
    }

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
                    <ReviewForm review={review} cb={updateNewReview} submit={handleSubmit} cancel={`/shows/${id}`} />
                </>
                :
                <Loading />}
        </div>
    );
};
