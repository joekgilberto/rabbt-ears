//Imports style sheet
import './SearchBar.css';

//Imports state tool from React and navigation tool from react-router, reducer tool from Redux, and Redux action to load search results
import { useState } from 'react';
import { useNavigate } from "react-router";
import { useDispatch } from 'react-redux';
import { loadResults } from '../../features/searchSlice';


//Exports SearchBar component, a form that takes in a search string and finds results through Redux actions carried over to the search results page
export default function SearchBar() {

    const [searchString, setSearchString] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleChange(e) {
        setSearchString(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            if (searchString.length) {
                navigate(`/results/${searchString}`)
                setSearchString('')
            } else {
                navigate('/feed');
            }
        } catch (err) {
            console.log(err);
            setSearchString('');
        }
    }

    return (
        <form className='SearchBar' onSubmit={handleSubmit}>
            <input type='text' placeholder='Search a show...' value={searchString} onChange={handleChange} />
            <button type='submit'>SEARCH</button>
        </form>
    );
};
