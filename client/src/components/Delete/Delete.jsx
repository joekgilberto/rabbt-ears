import './Delete.css';

import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import * as reviewsServices from '../../utilities/reviews/reviews-service';

import Loading from '../Loading/Loading';

export default function Delete({ user, review, setDestroy }) {

    const navigate = useNavigate();

    useEffect(() => {
        if (user._id !== review.owner) {
            setDestroy(false);
        }
    }, [])

    function handleCancel(e) {
        setDestroy(false);
    }

    function handleEdit(e) {
        navigate(`/reviews/edit/${review._id}`);
    }

    async function handleDelete(e){
        await reviewsServices.destroyReview(review._id).then((res)=>{
            navigate('/feed');
        })
    }

    return (
        <div className='Delete'>
            {user._id === review.owner ?
                <>
                    <h2>Pause!</h2>
                    <p>Are you sure your want to delete your {review.rating} review of {review.title}?</p>
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </>
                :
                <Loading />}
        </div>
    );
};
