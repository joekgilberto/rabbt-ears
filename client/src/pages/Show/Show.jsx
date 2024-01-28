import './Show.css';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { isLoading, hasError, loadShow, selectShow, selectReviews,selectAverage } from '../../features/showSlice';
import * as tools from '../../utilities/tools';

import Loading from '../../components/Loading/Loading';
import Tag from '../../components/Tag/Tag';

export default function Show() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const loading = useSelector(isLoading);
    const error = useSelector(hasError);
    const show = useSelector(selectShow);
    const reviews = useSelector(selectReviews);
    const average = useSelector(selectAverage);

    useEffect(() => {
        dispatch(loadShow(id));
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
                    <img src={show.image ? show.image.original : 'none'} alt={show.name} onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = 'https://i.imgur.com/zuvrO9V.png';
                    }} />
                    <div className='show-header'>
                        <h1><span className='bold'>{show.name}</span>{!show.ended ? `(${show.premiered.substring(0, 4)} - Present)` : show.premiered.substring(0, 4) === show.ended.substring(0, 4) ? `(${show.premiered.substring(0, 4)})` : `(${show.premiered.substring(0, 4)} - ${show.ended.substring(0, 4)})`}</h1>
                        <h2 className={`${average === 0 ? 'zero'
                                    : average === .5 ? ' point-five'
                                        : average === 1 || average === 1.5 ? 'one'
                                            : average === 2 || average === 2.5 ? 'two'
                                                : average === 3 || average === 3.5 ? 'three'
                                                    : average === 4 || average === 4.5 ? 'four'
                                                        : 'five'}`}>{reviews.length?average:'TBD'}</h2>
                    </div>
                    <p className='show-synopsis'>{tools.noTags(show.summary)}</p>
                    <div className='show-tags'>
                        <Tag text={show.type} />
                        {show.genres.map((genre, idx) => {
                            return <Tag key={idx} text={genre} />
                        })}
                        <Tag text={show.network ? show.network?.name : show.webChannel?.name} />
                        {show.officialSite ? <a href={show.officialSite} target='_blank'><Tag text={'Website'} /></a> : null}
                    </div>
                    <h3>Reviews</h3>
                    <div className='show-reviews'>
                        <Link to={`/new/${show.id}`}>
                            <p className='new-review'>+</p>
                        </Link>
                        {reviews?.map((review, idx) => {
                            return (
                                <Link key={idx} to={`/reviews/${review._id}`}>
                                    <p className={`review ${review.rating === 0 ? 'zero'
                                    : review.rating === .5 ? ' point-five'
                                        : review.rating === 1 || review.rating === 1.5 ? 'one'
                                            : review.rating === 2 || review.rating === 2.5 ? 'two'
                                                : review.rating === 3 || review.rating === 3.5 ? 'three'
                                                    : review.rating === 4 || review.rating === 4.5 ? 'four'
                                                        : 'five'}`}>{review.rating}</p>
                                    <p className='username'>{review.username}</p>
                                </Link>
                            )
                        })}
                    </div>
                </>
                :
                <Loading />
            }
        </div>
    );
};
