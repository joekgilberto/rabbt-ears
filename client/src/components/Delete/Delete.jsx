//Imports style sheet
import './Delete.css';

//Imports state tool from React, useNavigate from react-router, and customreviews services tools
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import * as reviewsServices from '../../utilities/reviews/reviews-service';

//Imports Loading component
import Loading from '../Loading/Loading';

//Exports Delete component that takes in user, review, and setDestroy props
//Used to present user's with options to delete a review, edit it, or cancel deletion
export default function Delete({ user, review, setDestroy }) {

    const navigate = useNavigate();

    //If the current user's id is not equal to the review's owner, the Delete component is no longer rendered
    useEffect(() => {
        if (user._id !== review.owner) {
            setDestroy(false);
        }
    }, [])

    //If the user chooses the cancel button, the DOM no longer renders the Delete component
    function handleCancel(e) {
        setDestroy(false);
    }

    //If the user chooses the edit button, the user is routed to the review's edit page
    function handleEdit(e) {
        navigate(`/reviews/edit/${review._id}`);
    }

    //Uses reviewsServices tools to delete the current review and navigate to the show page
    async function handleDelete(e) {
        await reviewsServices.destroyReview(review._id).then((res) => {
            navigate(`/shows/${review.showId}`);
        })
    }

    return (
        <div className='Delete'>
            {user._id === review.owner ?
                <>
                    <h1>Pause!</h1>
                    <p className='delete-message'>Are you sure your want to delete your <span className='bold'>{review.rating.toString().length < 3 ? `${review.rating}.0` : review.rating}</span> review of <span className='italic bold'>{review.title}</span>?</p>
                    <div className='delete-options'>
                        <button onClick={handleCancel}>Cancel</button>
                        <button onClick={handleEdit}>Edit</button>
                        <button className='delete-button' onClick={handleDelete}>Delete</button>
                    </div>
                </>
                :
                <Loading />}
        </div>
    );
};
