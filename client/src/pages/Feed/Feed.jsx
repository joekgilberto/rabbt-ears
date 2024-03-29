//Imports style sheet
import './Feed.css';

//Imports state tools from React, navigation tool from react-router-dom, reducer tools from Redux, custom reducer state and actions from feedSlice, and a custom local storage tool
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { isLoadingReviews, hasReviewsError, isLoadingShows, hasShowsError, loadFeedFollows, loadFeedReviews, selectFollows, selectReviews, selectShows, isLoadingFollows, hasFollowsError } from '../../features/feedSlice';
import { getUser } from '../../utilities/local-storage';

//Imports Review Poster, ShowPoster, and Loading components
import ReviewPoster from '../../components/ReviewPoster/ReviewPoster';
import ShowPoster from '../../components/ShowPoster/ShowPoster';
import Loading from '../../components/Loading/Loading';

//Exports Feed page with list of reviews and random shows
export default function Feed() {

    const [user, setUser] = useState(null)
    const [recent, setRecent] = useState(10)
    const [reviews, setReviews] = useState(null)
    const dispatch = useDispatch();
    const loadingFollows = useSelector(isLoadingFollows);
    const followsError = useSelector(hasFollowsError);
    const loadingReviews = useSelector(isLoadingReviews);
    const reviewsError = useSelector(hasReviewsError);
    const loadingShows = useSelector(isLoadingShows);
    const showsError = useSelector(hasShowsError);
    const follows = useSelector(selectFollows);
    const allReviews = useSelector(selectReviews);
    const shows = useSelector(selectShows);

    //Creates function to increase amount of recent reviews shown
    function handleLoadMore(){
        if(allReviews?.length > (recent + 10)){
            setRecent(recent+10);
        } else if (allReviews?.length) {
            setRecent(allReviews.length);
        }
    }

    //Sets user
    useEffect(() => {
        setUser(getUser());
    }, []);

    //Loads reviews on dispatch
    useEffect(() => {
        dispatch(loadFeedReviews());
    }, [dispatch]);

    //Upon user updating, loads user followings reviews
    useEffect(() => {
        if (user) {
            dispatch(loadFeedFollows(user.following))
        }
    }, [user]);

    //Upon loading of allReviews or change of recent's value, it updates the reviews state with more and more reviews
    useEffect(() => {
        const reviewsCache = [...allReviews];
        const recentReviews = reviewsCache.splice(0, recent);
        setReviews(recentReviews);
    }, [allReviews, recent]);

    if (loadingFollows || loadingReviews || loadingShows) {
        return <Loading />
    }

    return (
        <div className='Feed'>
            <h1>Welcome back{user ? `, ${user.username}` : null}!</h1>
            {user ?
                <>
                    <h2>FOLLOWING</h2>
                    <div className='feed-list'>
                        {follows?.length ?
                                follows.map((review) => {
                                    return (
                                        <Link key={review._id} to={`/reviews/${review._id}`}>
                                            <ReviewPoster source={review.poster} altText={review.title} rating={review.rating} fav={review.fav} user={review.username} />
                                        </Link>
                                    )

                                })
                            : <p className='none-yet'>None yet</p>}
                    </div>
                </>
                : null}

            <h2>RECENT</h2>
            <div className='feed-list'>
                {reviews?.length ?
                <>
                {reviews.map((review) => {
                    return (
                        <Link key={review._id} to={`/reviews/${review._id}`}>
                            <ReviewPoster source={review.poster} altText={review.title} rating={review.rating} fav={review.fav} user={review.username} />
                        </Link>
                    )})}
                    {allReviews?.length > recent ?
                        <button onClick={handleLoadMore} className='load-more'>Load More</button>
                        : null}
                </>
                : <p className='none-yet'>No favorites</p>}
            </div>

            <h2>SHOWS</h2>
            <div className='feed-list'>
                {shows?.length ? shows.map((show) => {
                    return (
                        <Link key={show.id} to={`/shows/${show.id}`}>
                            <ShowPoster source={show.image.original} title={show.name} />
                        </Link>
                    )
                }) : <p className='none-yet'>No favorites</p>}
            </div>
        </div>
    );
};
