import * as tvmazeApi from './tvmaze-api';

export async function getTenShows() {
    try {
        const data = []
        const used = []
        while (data.length < 10) {
            const randomId = Math.ceil(Math.random()*1000)

            if (used.includes(randomId)){
                continue;
            } else {
                const response = await tvmazeApi.show(randomId)
                if (response) {
                    data.push(response);
                }
                used.push(randomId)
            };
        };

        return data
    } catch (err) {
        return err
    }
}

export async function getShow(id){
    try {
        const data = await tvmazeApi.show(id)
        return data
    }catch(err){
        return err
    }
}

export async function searchShow(query){
    try {
        const data = await tvmazeApi.search(query)
        return data
    }catch(err){
        return err
    }
}