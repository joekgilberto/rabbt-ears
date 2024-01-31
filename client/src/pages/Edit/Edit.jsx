//Imports style sheet
import './Edit.css';

//Imports a state tool from React, navigation tools from react-router, reducer tools from Redux, custom reducer state and action tools from the authSlice,  acustom local storage tool, and custom review API call tools
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { isLoading, hasError, loadReview, selectEditReview, updateEditReview } from '../../features/editReviewSlice';
import { getUserToken } from '../../utilities/local-storage';
import * as reviewServices from '../../utilities/review/review-services';

//Imports ReviewForm and Loading forms
import ReviewForm from '../../components/ReviewForm/ReviewForm';
import Loading from '../../components/Loading/Loading';

//Exports Edit page with ReviewForm to update review
export default function Edit() {

    const [token, setToken] = useState(null)
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector(isLoading);
    const error = useSelector(hasError);
    const review = useSelector(selectEditReview);

    //Sets token to getUserToken on change
    useEffect(()=>{
        setToken(getUserToken());
    },[token])

    //Creates submit function to update review with state and navigate back to review show page
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

    //Updates review when dispatched
    useEffect(() => {
        dispatch(loadReview(id));
    }, [dispatch])

    //Updates review when the id in the url changes
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
