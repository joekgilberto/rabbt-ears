import './SearchBar.css';
import { useState } from 'react';
import { useNavigate } from "react-router";

import { useDispatch } from 'react-redux';
import { loadResults } from '../../features/searchSlice';

export default function SearchBar({ setToggle }) {

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
                dispatch(loadResults(searchString))
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
            <button type='submit' >SEARCH</button>
        </form>
    );
};
