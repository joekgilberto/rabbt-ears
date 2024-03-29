//Imports style sheet
import './Review.css';

//Imports  state tools from React, naviation tools from react-router and react-router-dom, reducer tools from Redux, custom reducer state and actions from reviewSlice, a custom local storage tool, and custom tools
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isLoading, hasError, loadReview, selectReview } from '../../features/reviewSlice';
import { getUser, setUser } from '../../utilities/local-storage';
import * as authServices from '../../utilities/auth/auth-service';
import * as reviewServices from '../../utilities/review/review-services';
import * as tools from '../../utilities/tools';

//Imports Tag, Delete, and Loading components
import Tag from '../../components/Tag/Tag';
import Delete from '../../components/Delete/Delete';
import Loading from '../../components/Loading/Loading';

//Exports Review page that shows a review's details
export default function Review() {

    const { id } = useParams();
    const [currentUser, setCurrentUser] = useState(null);
    const [likes, setLikes] = useState(null)
    const [destroy, setDestroy] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector(isLoading);
    const error = useSelector(hasError);
    const review = useSelector(selectReview);

    //Sets user to local storage of user upon loading the page
    useEffect(() => {
        setCurrentUser(getUser());
    }, []);

    //Loads review when reducer is dispatched
    useEffect(() => {
        dispatch(loadReview(id));
    }, [dispatch]);

    //Loads review when url id param changes
    useEffect(() => {
        dispatch(loadReview(id));
    }, [id]);

    useEffect(() => {
        setLikes(review.likes);
    }, [review])

    //Toggles Destroy component when delete button is pressed, if the user is the owner of the review
    function handleDelete(e) {
        if (currentUser?._id === review?.owner) {
            setDestroy(true);
        }
    }

    //Navigates to edit page if the user is the owner of the review
    function handleEdit(e) {
        if (currentUser?._id === review?.owner) {
            navigate(`/reviews/edit/${review._id}`)
        }
    }

    //Creates function for user to follow the review owner
    function handleFollow(e) {
        if (currentUser && review.owner !== currentUser._id && !currentUser.following.includes(review.owner)) {
            const followingCache = [...currentUser.following, review.owner]
            authServices.updateUser(currentUser._id, { ...currentUser, following: followingCache }).then((res) => {
                setUser(res);
                setCurrentUser(getUser());
            })
            authServices.follow(review.owner, currentUser._id)
        }
    }

    //Creates function for user to unfollow the review owner
    function handleUnfollow(e) {
        if (currentUser && review.owner !== currentUser._id && currentUser.following.includes(review.owner)) {
            const followingCache = [...currentUser.following]
            const unfollowIdx = followingCache.findIndex((f) => f === review.owner);
            followingCache.splice(unfollowIdx, 1)
            authServices.updateUser(currentUser._id, { ...currentUser, following: followingCache }).then((res) => {
                setUser(res);
                setCurrentUser(getUser());
            })
            authServices.unfollow(review.owner, currentUser._id)
        }
    }

    //Creates function to like or unlike a review
    function handleLike(e) {
        if (currentUser && likes.includes(currentUser._id)) {
            const likesCache = [...likes];
            const unfollowIdx = likesCache.findIndex((l) => l === currentUser._id);
            likesCache.splice(unfollowIdx, 1)
            reviewServices.likeReview(review._id, likesCache)
            setLikes(likesCache);
        } else if (currentUser && !likes.includes(currentUser._id)) {
            const likesCache = [...likes, currentUser._id];
            reviewServices.likeReview(review._id, likesCache)
            setLikes(likesCache);
        } else {
            navigate('/auth');
        }
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className='Review'>
            {review?._id ?
                destroy && currentUser?._id === review.owner ?
                    <Delete user={currentUser} review={review} setDestroy={setDestroy} />
                    :
                    <>
                        <Link className='review-poster' to={`/shows/${review.showId}`}>
                            <div>
                            {[...tools.enter(review.title)].map((title, idx) => {
                                return <h2 key={idx} className='review-show'>{title}</h2>
                            })}
                            </div>
                            <img src={review.poster ? review.poster : 'none'} alt={review.title} onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = 'https://i.imgur.com/zuvrO9V.png';
                            }} />
                        </Link>
                        <div className='review-body'>
                            <div className='review-header'>
                                <h1>
                                    <Link to={`/user/${review.username}`}>
                                        <span className='bold'>{review.username}</span>
                                    </Link>
                                    's review</h1>
                                <h2 className={`${review.rating === 0 ? 'zero'
                                    : review.rating === .5 ? ' point-five'
                                        : review.rating === 1 || review.rating === 1.5 ? 'one'
                                            : review.rating === 2 || review.rating === 2.5 ? 'two'
                                                : review.rating === 3 || review.rating === 3.5 ? 'three'
                                                    : review.rating === 4 || review.rating === 4.5 ? 'four'
                                                        : 'five'}`}>
                                    {review.rating.toString().length < 3 ? `${review.rating}.0` : review.rating}
                                    {review.fav ?
                                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Bookmark-fav-front-color.png/1200px-Bookmark-fav-front-color.png?20230821164801' alt='star' />
                                        : null}
                                </h2>
                            </div>
                            {review.review ?
                                <p className='review-thoughts'>{review.review}</p>
                                :
                                null}
                            <div className='review-social'>
                                {likes?
                                    <p className={!likes.includes(currentUser._id)?'not-clicked':''} onClick={handleLike}>{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</p>
                                    : null}
                                {currentUser && review.owner !== currentUser._id ?
                                    currentUser.following.includes(review.owner) ?
                                        <p onClick={handleUnfollow}>- Unfollow</p>
                                        :
                                        <p className='not-clicked' onClick={handleFollow}>+ Follow</p>
                                    : null}
                            </div>
                            <div className='review-tags'>
                                {review.finished ?
                                    <p className={`finished ${review.rating === 0 ? 'zero'
                                        : review.rating === .5 ? ' point-five'
                                            : review.rating === 1 || review.rating === 1.5 ? 'one'
                                                : review.rating === 2 || review.rating === 2.5 ? 'two'
                                                    : review.rating === 3 || review.rating === 3.5 ? 'three'
                                                        : review.rating === 4 || review.rating === 4.5 ? 'four'
                                                            : 'five'}`}>Finished <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Check_Mark_%2889605%29_-_The_Noun_Project.svg/1024px-Check_Mark_%2889605%29_-_The_Noun_Project.svg.png?20180419151324' alt='checkmark' /></p>
                                    :
                                    null}
                                {review.tags.map((tag, idx) => {
                                    return <Tag key={idx} text={tag} />
                                })}
                            </div>
                            {currentUser?._id === review.owner ?
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
