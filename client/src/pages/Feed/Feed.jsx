import './Feed.css';

import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { isLoading, hasError, loadFeed, selectReviews, selectShows } from '../../features/feedSlice';

import Loading from '../../components/Loading/Loading';

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
            <h2>Reviews</h2>
            {reviews ? reviews.map((review, id) => {
                return (
                    <Link key={id} to={`/reviews/${review._id}`}>
                        <p>{review.title}</p>
                        <p>{review.rating}</p>
                    </Link>
                )
            }) : null}

            <h2>Shows</h2>
            {shows ? shows.map((show, id) => {
                return (
                    <Link key={id} to={`/shows/${show.id}`}>
                        <p>{show.name}</p>
                    </Link>
                )
            }) : null}
        </div>
    );
};
