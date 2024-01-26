import './Profile.css';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isLoading, hasError, loadProfile, selectUser, selectReviews } from '../../features/profileSlice';

import Loading from '../../components/Loading/Loading';

export default function Profile() {

    const dispatch = useDispatch();
    const loading = useSelector(isLoading);
    const error = useSelector(hasError);
    const user = useSelector(selectUser);
    const reviews = useSelector(selectReviews);

    useEffect(() => {
        dispatch(loadProfile());
    }, [dispatch]);

    if (loading) {
        return <Loading />
    }

    return (
        <div className='Profile'>
            {user._id ?
                <>
                    <h2>{user.username}</h2>
                    <h3>Reviews</h3>
                    {reviews?.length?
                    reviews.map((review, idx) => {
                        return <p key={idx}>{review.title} | {review.rating}</p>
                    }):
                    <p>None yet</p>}
                </>
                :
                <Loading />}
        </div>
    );
};
