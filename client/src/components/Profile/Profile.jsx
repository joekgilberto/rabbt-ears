//Imports style sheet
import './Profile.css';

//Imports a state tool from React, navigation tools from react-router-dom, reducer tools from Redux, cutom local storage tools, custom reducer state and actions from otherProfileSlcie, and custom auth API calls
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser, clearUserToken, clearUser } from '../../utilities/local-storage';
import * as authServices from '../../utilities/auth/auth-service';

//Imports ShowPoster, ProfilePoster, and Loading components
import ShowPoster from '../../components/ShowPoster/ShowPoster';
import ProfilePoster from '../../components/ProfilePoster/ProfilePoster';
import Loading from '../../components/Loading/Loading';

//Exports Profile page that displays the current user's favs and reviews
export default function Profile({ user, reviews, favs }) {

    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null)

    //Creates a function that logs a user out and returns them to the home page
    async function handleLogout() {
        if (currentUser._id === user._id) {
            await authServices.logout().then(() => {
                clearUserToken();
                clearUser();
                navigate('/')
            })
        }
    }

    //Updates user based when component is rendered
    useEffect(() => {
        setCurrentUser(getUser());
    }, []);

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
                                <p className='none-yet'>No favorites</p>}
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
                                <p className='none-yet'>None yet</p>}
                        </div>

                        {currentUser?._id === user._id ?
                            <div className='profile-logout'>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                            :
                            null}
                    </div>
                </>
                :
                <Loading />}
        </div>
    );
};
