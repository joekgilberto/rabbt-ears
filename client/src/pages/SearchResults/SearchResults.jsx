import './SearchResults.css';

import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addResults, selectResults } from '../../features/searchSlice';
import * as tvmazeServices from '../../utilities/tvmaze/tvmaze-service'
import Loading from '../../components/Loading/Loading';

export default function SearchResults() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const results = useSelector(selectResults);

    async function handleRequest(){
        const queries = id.split('&');
        await tvmazeServices.getShowList(queries).then((data)=>{
            dispatch(addResults(data));
        });
    }

    useEffect(()=>{
        handleRequest()
    },[])

    useEffect(()=>{
        handleRequest()
    },[id])

    return (

        <div className='SearchResults'>
            <h2>Search Results</h2>
            {results?
            results.map((result, idx)=>{
                return <p key={idx}>{result.name}</p>
            })
            :
            <Loading />}
        </div>
    );
};