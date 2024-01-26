import './Feed.css';

import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { isLoading, hasError, loadFeed, selectReviews, selectShows } from '../../features/feedSlice';

import Loading from '../../components/Loading/Loading';
import Poster from '../../components/Poster/Poster';

export default function Feed() {

    const dispatch = useDispatch();
    const loading = useSelector(isLoading);
    const error = useSelector(hasError);
    const reviews = useSelector(selectReviews);
    const shows = useSelector(selectShows);

    useEffect(() => {
        dispatch(loadFeed());
    }, [dispatch]);

    useEffect(()=>{
        console.log(shows)
    },[shows])

    if (loading) {
        return <Loading />
    }

    return (
        <div className='Feed'>
            <h2>Reviews</h2>
            <div className='feed-list'>
                {reviews?.length? reviews.map((review, id) => {
                    return (
                        <Link key={id} to={`/reviews/${review._id}`}>
                            <Poster source={review.poster} altText={review.title} desc={`${review.rating} | ${review.username}`} />
                        </Link>
                    )
                }) : null}
            </div>

            <h2>Shows</h2>
            <div className='feed-list'>
                {shows?.length? shows.map((show, id) => {
                    return (
                        <Link key={id} to={`/shows/${show.id}`}>
                            <Poster source={show.image.original} altText={show.name} desc={show.name} />
                        </Link>
                    )
                }) : null}
            </div>
        </div>
    );
};
