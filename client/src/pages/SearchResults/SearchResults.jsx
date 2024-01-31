//Imports style sheet
import './SearchResults.css';

//Imports state tool from React, navigation tooks from react-router and react-router-dom, reducer tools from Redux, and reducer state and actions from searchSlice
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isLoading, hasError, loadResults, selectResults } from '../../features/searchSlice';

//Imports ShowPoster and Loading components
import ShowPoster from '../../components/ShowPoster/ShowPoster';
import Loading from '../../components/Loading/Loading';

//Exports a SearchResults page of search results based on a search query
export default function SearchResults() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const loading = useSelector(isLoading);
    const error = useSelector(hasError);
    const results = useSelector(selectResults);

    //Loads new search results based on if the parameter id changes
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
                    <h1>RESULTS FOR "{id}" </h1>
                    <div className='results'>
                        {results.map((result, idx) => {
                            return (
                                <Link key={idx} to={`/shows/${result.show?.id}`}>
                                    <ShowPoster source={result.show?.image?.original} title={result.show?.name} />
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
