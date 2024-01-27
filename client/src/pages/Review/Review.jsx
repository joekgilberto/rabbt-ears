import './Review.css';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isLoading, hasError, loadReview, selectReview } from '../../features/reviewSlice';
import { getUser } from '../../utilities/local-storage';

import Loading from '../../components/Loading/Loading';
import Delete from '../../components/Delete/Delete';

export default function Review() {

    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [destroy, setDestroy] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector(isLoading);
    const error = useSelector(hasError);
    const review = useSelector(selectReview);

    useEffect(() => {
        setUser(getUser());
    }, [])

    useEffect(() => {
        dispatch(loadReview(id));
    }, [dispatch]);

    function handleDelete(e) {
        setDestroy(true);
    }

    function handleEdit(e) {
        if (user && review) {
            if (user._id === review.owner) {
                navigate(`/reviews/edit/${review._id}`)
            }
        }
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className='Review'>
            {review?._id ?
                destroy && user?._id === review.owner ?
                    <Delete user={user} review={review} setDestroy={setDestroy} />
                    :
                    <>
                        <Link to={`/shows/${review.showId}`}>
                            <img src={review.poster} alt={review.title} />
                        </Link>
                        <h2>{review.username}'s {review.title} review | {review.rating}{review.fav ? ' ★' : null}</h2>
                        {user?._id === review.owner ?
                            <>
                                <button onClick={handleEdit}>Edit</button>
                                <button onClick={handleDelete}>Delete</button>
                            </>
                            : null}
                        <p>{review.review}</p>
                        <Link to={`/new/${review.showId}`}>
                            <p>+ Write your own</p>
                        </Link>
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
