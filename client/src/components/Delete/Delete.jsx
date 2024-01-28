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

    async function handleDelete(e) {
        await reviewsServices.destroyReview(review._id).then((res) => {
            navigate('/feed');
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
                        <button className='delete-edit' onClick={handleEdit}>Edit</button>
                        <button className='delete-delete' onClick={handleDelete}>Delete</button>
                    </div>
                </>
                :
                <Loading />}
        </div>
    );
};
