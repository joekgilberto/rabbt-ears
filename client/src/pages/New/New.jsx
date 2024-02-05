//Imports style sheet
import './New.css';

//Imports state tools from React, navigation tools from react-router, reducer tools from Redux, custom reducer state and action tools from newReviewSlice, custom local storage tools, and custom review API calls
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { isLoading, hasError, loadShow, selectNewReview, selectShow, updateNewReview } from '../../features/newReviewSlice';
import { getUserToken } from '../../utilities/local-storage';
import * as reviewServices from '../../utilities/review/review-services';

//Imports ReviewForm and Loading forms
import ReviewForm from '../../components/ReviewForm/ReviewForm';
import Loading from '../../components/Loading/Loading';

//Exports New page with ReviewForm to create review
export default function New() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const dispatch = useDispatch();
    const loading = useSelector(isLoading);
    const error = useSelector(hasError);
    const review = useSelector(selectNewReview);
    const show = useSelector(selectShow);

    //Creates submit function to create a new review and navigate to the show page
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

    //Sets token to getUserToken on change
    useEffect(() => {
        setToken(getUserToken());
    }, [token])

    //Updates show being reviewed when dispatched
    useEffect(() => {
        dispatch(loadShow(id));
    }, [dispatch])

    //Updates show and clears review being reviewed when id changes
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
