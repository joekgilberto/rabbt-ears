import './Profile.css';

import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isLoading, hasError, loadProfile, selectUser, selectReviews, selectFavs } from '../../features/profileSlice';
import { getUserToken, clearUserToken, clearUser } from '../../utilities/local-storage';
import * as authServices from '../../utilities/auth/auth-service';

import Loading from '../../components/Loading/Loading';
import ShowPoster from '../../components/ShowPoster/ShowPoster';
import ProfilePoster from '../../components/ProfilePoster/ProfilePoster';

export default function Profile() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector(isLoading);
    const error = useSelector(hasError);
    const user = useSelector(selectUser);
    const reviews = useSelector(selectReviews);
    const favs = useSelector(selectFavs);

    async function handleLogout() {
        await authServices.logout().then(() => {
            clearUserToken();
            clearUser();
            navigate('/feed')
        })
    }

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
                    <p className={`count${reviews.length < 5 ? ' point-five' :
                        51 >= 5 && reviews.length < 25 ? ' one' :
                            reviews.length >= 25 && reviews.length < 50 ? ' three' :
                                reviews.length >= 50 && reviews.length < 100 ? ' four' :
                                    ' five'}`}>
                        {reviews.length < 5 ? 'Pilot Epiosde' :
                            reviews.length >= 5 && reviews.length < 25 ? 'Series Order' :
                                reviews.length >= 25 && reviews.length < 50 ? 'Syndicated' :
                                    reviews.length >= 50 && reviews.length < 100 ? 'Channel Surfer' :
                                        'A TV Guide'}
                        <span className='divider'>|</span>{reviews.length} Reviews</p>
                    <div className='profile-content'>
                        <h3>Favorites</h3>
                        <div className='profile-list'>
                            {favs?.length ?
                                favs.map((fav, idx) => {
                                    return (
                                        <Link key={idx} to={`/shows/${fav.showId}`}>
                                            <ShowPoster source={fav.poster} title={fav.title} />
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
                                        <Link key={idx} to={`/reviews/${review._id}`}>
                                            <ProfilePoster source={review.poster} altText={review.title} rating={review.rating} fav={review.fav} />
                                        </Link>
                                    )
                                }) :
                                <p>None yet</p>}
                        </div>
                        <div className='profile-logout'>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                </>
                :
                <Loading />}
        </div>
    );
};
