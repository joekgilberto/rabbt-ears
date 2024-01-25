import './SearchBar.css';
import { useState } from 'react';
import { useNavigate } from "react-router";

import * as tvmazeServices from '../../utilities/tvmaze/tvmaze-service';

export default function SearchBar() {
    const navigate = useNavigate();
    // TODO: add searchString slice to Redux
    const [searchString, setSearchString] = useState('');

    function handleChange(e) {
        // TODO: update searchString with reducer
        setSearchString(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault()
        try {
            // TODO: Navigate to search results page with searchString in query
            // TODO: clear searchString with reducer
            setSearchString('');
        } catch (error) {
            // TODO: Navigate to feed page
            // TODO: clear searchString with reducer
            setSearchString('');
        }
    }

    return (
        <form className='SearchBar' onSubmit={handleSubmit}>
            <input type='text' placeholder='Search a show...' value={searchString} onChange={handleChange} />
            <button type='submit' >SEARCH</button>
        </form>
    );
};
