import './Show.css';

import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { isLoading, hasError, loadShow, selectShow, selectReviews } from '../../features/showSlice';
import * as tools from '../../utilities/tools';

import Loading from '../../components/Loading/Loading';

export default function Show() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const loading = useSelector(isLoading);
    const error = useSelector(hasError);
    const show = useSelector(selectShow);
    const reviews = useSelector(selectReviews);

    useEffect(() => {
        dispatch(loadShow(id));
        console.log(show)
    }, [dispatch]);

    useEffect(() => {
        dispatch(loadShow(id));
    }, [id]);

    if (loading) {
        return <Loading />
    }


    return (
        <div className='Show'>
            {show.id ?
                <>
                    <img src={show.image.original} alt={show.name} />
                    <h2>{show.name} {!show.ended ? `(${show.premiered.substring(0, 4)} - Present)` : show.premiered.substring(0, 4) === show.ended.substring(0, 4) ? `(${show.premiered.substring(0, 4)})` : `(${show.premiered.substring(0, 4)} - ${show.ended.substring(0, 4)})`}</h2>
                    <p>{tools.noTags(show.summary)}</p>
                    <div className='show reviews'>
                    {reviews?.map((review, idx) => {
                            return <p key={idx}>{review.rating} by {review.username}</p>
                        })}
                    </div>
                    <div className='show-tags'>
                        <p>{show.type}</p>
                        {show.genres.map((genre, idx) => {
                            return <p key={idx}>{genre}</p>
                        })}
                        <p>{show.network.name}</p>
                    </div>
                </>
                :
                <Loading />
            }
        </div>
    );
};
