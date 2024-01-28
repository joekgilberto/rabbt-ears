import './SearchBar.css';
import { useState } from 'react';
import { useNavigate } from "react-router";

import * as tvmazeServices from '../../utilities/tvmaze/tvmaze-service';

export default function SearchBar({ setToggle }) {
    const navigate = useNavigate();
    const [searchString, setSearchString] = useState('');

    function handleChange(e) {
        setSearchString(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            if (searchString.length) {
                await tvmazeServices.searchShow(searchString).then((res) => {
                    let searchUrl = `/results/${searchString}%2B`;

                    for (let i = 0; i < res.length; i++) {
                        searchUrl += `${res[i].show.id}`;
                        if (i < res.length - 1) {
                            searchUrl += '%2C';
                        }
                    }

                    setSearchString('');
                    setToggle(false);
                    navigate(searchUrl);
                })
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
