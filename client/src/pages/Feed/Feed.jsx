import './Feed.css';

import { useEffect, useState } from 'react';
import { getManyShows } from '../../utilities/tvmaze/tvmaze-service';

export default function Feed() {
    const [feedShows, setFeedShows] = useState(null)

    async function handleRequest(){        
        await getManyShows(0).then((res)=>{
            if (res){
                setFeedShows(res)
            } else {
                console.log(res)
            }
        });
    }

    useEffect(()=>{
        handleRequest();
    },[])

    return (
        <div className='Feed'>
            <h2>Feed</h2>
            {feedShows?feedShows.map((show,id)=>{
                return <p key={id}>{show.name}</p>
            }):null}
        </div>
    );
};
