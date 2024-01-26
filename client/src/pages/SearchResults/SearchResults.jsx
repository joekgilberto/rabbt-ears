import './SearchResults.css';

import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addResults, selectResults } from '../../features/searchSlice';
import * as tvmazeServices from '../../utilities/tvmaze/tvmaze-service'

import Loading from '../../components/Loading/Loading';

export default function SearchResults() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const results = useSelector(selectResults);

    async function handleRequest() {
        const queries = id.split(',');
        console.log(queries)
        await tvmazeServices.getShowList(queries).then((data) => {
            dispatch(addResults(data));
            console.log(data)
        });
    }

    useEffect(() => {
        handleRequest()
    }, [])

    useEffect(() => {
        handleRequest()
    }, [id])

    return (

        <div className='SearchResults'>
            <h2>Search Results</h2>
            {results?.length?
                results.map((result, idx) => {
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
