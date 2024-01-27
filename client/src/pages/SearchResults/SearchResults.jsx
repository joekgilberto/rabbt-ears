import './SearchResults.css';

import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isLoading, hasError, loadResults, selectResults } from '../../features/searchSlice';

import Loading from '../../components/Loading/Loading';

export default function SearchResults() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const loading = useSelector(isLoading);
    const error = useSelector(hasError);
    const results = useSelector(selectResults);

    useEffect(() => {
        dispatch(loadResults(id));
    }, [dispatch]);

    useEffect(() => {
        dispatch(loadResults(id));
    }, [id]);


    if (loading) {
        return <Loading />
    }

    return (

        <div className='SearchResults'>
            <h2>Search Results</h2>
            {results?.length?
                results.map((result, idx) => {
                    console.log(result)
                    return (
                        <Link key={idx} to={`/shows/${result?.id}`}>
                            <p>{result?.name}</p>
                        </Link>
                    )
                })
                :
                <Loading />}
        </div>
    );
};
