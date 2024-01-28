import './Profile.css';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isLoading, hasError, loadProfile, selectUser, selectReviews, selectFavs } from '../../features/profileSlice';

import Loading from '../../components/Loading/Loading';
import ShowPoster from '../../components/ShowPoster/ShowPoster';
import ProfilePoster from '../../components/ProfilePoster/ProfilePoster';

export default function Profile() {

    const dispatch = useDispatch();
    const loading = useSelector(isLoading);
    const error = useSelector(hasError);
    const user = useSelector(selectUser);
    const reviews = useSelector(selectReviews);
    const favs = useSelector(selectFavs);

    useEffect(() => {
        dispatch(loadProfile());
    }, [dispatch]);

    if (loading) {
        return <Loading />
    }

    return (
        <div className='Profile'>
            {user._id ?
                <>
                    <div className='circle'>
                        <h2>{user.username[0]}</h2>
                    </div>
                    <h1>{user.username}</h1>
                    <div className='profile-content'>
                        <h3>Favorites</h3>
                        <div className='profile-list'>
                            {favs?.length ?
                                favs.map((fav, idx) => {
                                    return (
                                        <Link to={`/shows/${fav.showId}`}>
                                            <ShowPoster key={idx} source={fav.poster} title={fav.title} />
                                        </Link>
                                    )
                                }) :
                                <p>No favorites</p>}
                        </div>
                        <h3>Reviews</h3>
                        <div className='profile-list'>
                            {reviews?.length ?
                                reviews.map((review, idx) => {
                                    return (
                                        <Link to={`/reviews/${review._id}`}>
                                            <ProfilePoster key={idx} source={review.poster} altText={review.title} rating={review.rating} fav={review.fav} />
                                        </Link>
                                    )
                                }) :
                                <p>None yet</p>}
                        </div>
                    </div>
                </>
                :
                <Loading />}
        </div>
    );
};
