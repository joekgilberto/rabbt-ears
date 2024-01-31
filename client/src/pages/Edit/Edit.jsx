import './Edit.css';

import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { isLoading, hasError, loadReview, selectEditReview, updateEditReview } from '../../features/editReviewSlice';
import { getUserToken } from '../../utilities/local-storage';
import * as reviewServices from '../../utilities/review/review-services';

import Loading from '../../components/Loading/Loading';
import ReviewForm from '../../components/ReviewForm/ReviewForm';

export default function Edit() {

    const token = getUserToken
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector(isLoading);
    const error = useSelector(hasError);
    const review = useSelector(selectEditReview);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await reviewServices.updateReview(review._id, review).then((res) => {
                dispatch(loadReview(id));
                navigate(`/reviews/${id}`)
            })
        } catch (err) {
            console.log(err);
            dispatch(loadReview(id));
        }
    }

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
                    <ReviewForm review={review} cb={updateEditReview} submit={handleSubmit} cancel={`/reviews/${id}`} />
                </>
                :
                <Loading />}
        </div>
    );
};
