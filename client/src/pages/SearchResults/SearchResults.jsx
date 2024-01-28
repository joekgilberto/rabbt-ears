import './SearchResults.css';

import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isLoading, hasError, loadResults, selectSearchTerm, selectResults } from '../../features/searchSlice';

import Loading from '../../components/Loading/Loading';
import ShowPoster from '../../components/ShowPoster/ShowPoster';

export default function SearchResults() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const loading = useSelector(isLoading);
    const error = useSelector(hasError);
    const results = useSelector(selectResults);

    useEffect(() => {
        dispatch(loadResults(id));
    }, [id]);


    if (loading) {
        return <Loading />
    }

    return (

        <div className='SearchResults'>
            {results?.length ?
                <>
                    <h1>Results for "{id}" </h1>
                    <div className='results'>
                        {results.map((result, idx) => {
                            return (
                                <Link key={idx} to={`/shows/${result?.id}`}>
                                    <ShowPoster source={result.image?.original} title={result.name} />
                                </Link>
                            )
                        })}
                    </div>
                </>
                :
                <Loading />}
        </div>
    );
};
