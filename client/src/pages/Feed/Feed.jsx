import './Feed.css';

import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { isLoading, hasError, loadFeed, selectReviews, selectShows } from '../../features/feedSlice';

import Loading from '../../components/Loading/Loading';
import ReviewPoster from '../../components/ReviewPoster/ReviewPoster';
import ShowPoster from '../../components/ShowPoster/ShowPoster';

export default function Feed() {

    const dispatch = useDispatch();
    const loading = useSelector(isLoading);
    const error = useSelector(hasError);
    const reviews = useSelector(selectReviews);
    const shows = useSelector(selectShows);

    useEffect(() => {
        dispatch(loadFeed());
    }, [dispatch]);

    if (loading) {
        return <Loading />
    }

    return (
        <div className='Feed'>
            <h2>REVIEWS</h2>
            <div className='feed-list'>
                {reviews?.length? reviews.map((review, id) => {
                    return (
                        <Link key={id} to={`/reviews/${review._id}`}>
                            <ReviewPoster source={review.poster} altText={review.title} rating={review.rating} user={review.username} />
                        </Link>
                    )
                }) : null}
            </div>

            <h2>SHOWS</h2>
            <div className='feed-list'>
                {shows?.length? shows.map((show, id) => {
                    return (
                        <Link key={id} to={`/shows/${show.id}`}>
                            <ShowPoster source={show.image.original} altText={show.name} title={show.name} />
                        </Link>
                    )
                }) : null}
            </div>
        </div>
    );
};
