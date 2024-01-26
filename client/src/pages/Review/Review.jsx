import './Review.css';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isLoading, hasError, loadReview, selectReview } from '../../features/reviewSlice';

import Loading from '../../components/Loading/Loading';
import { useParams } from 'react-router';

export default function Review() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const loading = useSelector(isLoading);
    const error = useSelector(hasError);
    const review = useSelector(selectReview);

    useEffect(() => {
        dispatch(loadReview(id));
    }, [dispatch]);

    if (loading) {
        return <Loading />
    }

    return (
        <div className='Review'>
            {review._id ?
                <>
                    <Link to={`/shows/${review.showId}`}>
                        <img src={review.poster} alt={review.title} />
                    </Link>
                    <h2>{review.username}'s {review.title} review | {review.rating}{review.fav ? ' ★' : null}</h2>
                    <p>{review.review}</p>

                    {review.tags.map((tag, idx) => {
                        return <p key={idx}>{tag}</p>
                    })}
                </>
                :
                <Loading />
            }
        </div>
    );
};
