import './SearchBar.css';
import { useState } from 'react';
import { useNavigate } from "react-router";

import * as tvmazeServices from '../../utilities/tvmaze/tvmaze-service';

export default function SearchBar() {
    const navigate = useNavigate();
    const [searchString, setSearchString] = useState('');

    function handleChange(e) {
        setSearchString(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {

            await tvmazeServices.searchShow(searchString).then((res)=>{
                let searchUrl = '/results/';

                for (let i = 0; i < res.length; i++) {
                    searchUrl += `${res[i].show.id}`;
                    if (i < res.length - 1) {
                        searchUrl += '&';
                    }
                }
                
                setSearchString('');
                navigate(searchUrl);
            })
        } catch (err) {
            console.log(err);
            setSearchString('');
            navigate('/feed');
        }
    }

    return (
        <form className='SearchBar' onSubmit={handleSubmit}>
            <input type='text' placeholder='Search a show...' value={searchString} onChange={handleChange} />
            <button type='submit' >SEARCH</button>
        </form>
    );
};
