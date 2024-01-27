import './Review.css';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isLoading, hasError, loadReview, selectReview } from '../../features/reviewSlice';
import { getUser } from '../../utilities/local-storage';
import * as tools from '../../utilities/tools';

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
                        <Link className='review-poster' to={`/shows/${review.showId}`}>
                            {[...tools.enter(review.title)].map((title, idx) => {
                                return <h2 key='idx' className='review-show'>{title}</h2>
                            })}
                            <img src={review.poster} alt={review.title} />
                        </Link>
                        <div className='review-body'>
                            <div className='review-header'>
                                <h1 className='review-title'>{review.username}'s review</h1>
                                <h1 className={`review-rating${review.rating === 0 ? ' zero'
                                    : review.rating === .5 ? ' point-five'
                                        : review.rating === 1 || review.rating === 1.5 ? ' one'
                                            : review.rating === 2 || review.rating === 2.5 ? ' two'
                                                : review.rating === 3 || review.rating === 3.5 ? ' three'
                                                    : review.rating === 4 || review.rating === 4.5 ? ' four'
                                                        : ' five'}`}>
                                    {review.rating}
                                    {review.fav ?
                                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Star-front-premium.png/640px-Star-front-premium.png' alt='star' />
                                        : null}
                                </h1>
                            </div>
                            <p className='review-thoughts'>{review.review}</p>
                            <div className='review-tags'>
                                {review.tags.map((tag, idx) => {
                                    return <p key={idx}>{tag}</p>
                                })}
                            </div>
                            {user?._id === review.owner ?
                                <div className='review-buttons'>
                                    <button className='review-edit' onClick={handleEdit}>
                                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Pencil_-_The_Noun_Project.svg/640px-Pencil_-_The_Noun_Project.svg.png' alt='edit pencil' />
                                    </button>
                                    <button className='review-delete' onClick={handleDelete}>
                                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Trash_%2889060%29_-_The_Noun_Project.svg/1024px-Trash_%2889060%29_-_The_Noun_Project.svg.png?20180419152003' alt='edit pencil' />
                                    </button>
                                </div>
                                : null}
                        </div>
                    </>

                :
                <Loading />
            }
        </div>
    );
};
