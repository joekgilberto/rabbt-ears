//Imports style sheet
import './UserProfile.css';

//Imports a state tool from React, navigation tools from react-router-dom, reducer tools from Redux, cutom local storage tools, custom reducer state and actions from otherProfileSlcie, and custom auth API calls
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isLoading, hasError, loadProfile, selectUser, selectReviews, selectFavs } from '../../features/profileSlice';
import { clearUserToken, clearUser } from '../../utilities/local-storage';
import * as authServices from '../../utilities/auth/auth-service';

//Imports Profile and Loading components
import Profile from '../../components/Profile/Profile';
import Loading from '../../components/Loading/Loading';

//Exports Profile page that displays the current user's favs and reviews
export default function UserProfile() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector(isLoading);
    const error = useSelector(hasError);
    const user = useSelector(selectUser);
    const reviews = useSelector(selectReviews);
    const favs = useSelector(selectFavs);

    //Creates a function that logs a user out and returns them to the home page
    async function handleLogout() {
        await authServices.logout().then(() => {
            clearUserToken();
            clearUser();
            navigate('/')
        })
    }

    //Updates user based when reducer is dispatched
    useEffect(() => {
        dispatch(loadProfile());
    }, [dispatch]);

    if (loading) {
        return <Loading />
    }

    return (
        user._id ?
            <Profile user={user} reviews={reviews} favs={favs} />
            :
            <Loading />
    );
};
