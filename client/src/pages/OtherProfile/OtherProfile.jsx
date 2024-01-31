//Imports style sheet
import './OtherProfile.css';

//Imports a state tool from React, navigation tools from react-router-dom, reducer tools from Redux, and custom reducer state and actions from otherProfileSlcie
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isLoading, hasError, loadOtherProfile, selectUser, selectReviews, selectFavs } from '../../features/otherProfileSlice';

//Imports Profile and Loading components
import Profile from '../../components/Profile/Profile';
import Loading from '../../components/Loading/Loading';

//Exports OtherProfile page that renders a Profile componet and shows a user's favs and reviews (the user being not the current user)
export default function OtherProfile() {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector(isLoading);
    const error = useSelector(hasError);
    const user = useSelector(selectUser);
    const reviews = useSelector(selectReviews);
    const favs = useSelector(selectFavs);

    //Changes user based on the reducer being dispatched
    useEffect(() => {
        dispatch(loadOtherProfile(id));
    }, [dispatch]);

    //Changes user based on url id param
    useEffect(() => {
        dispatch(loadOtherProfile(id));
    }, [id]);


    //If theres an error, the page navigates to the error page
    useEffect(() => {
        if (error) {
            navigate('/error');
        }
    }, [error])

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
