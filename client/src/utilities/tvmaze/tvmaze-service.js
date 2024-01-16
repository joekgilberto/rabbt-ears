import * as tvmazeApi from './tvmaze-api';

export async function getTenShows() {
    try {
        const data = []

        while (data.length < 10) {
            await tvmazeApi.index().then((result) => {
                if (!data.includes) {
                    data.push(result);
                }
            });
        }

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

export async function getShow(query){
    try {
        const data = await tvmazeApi.search(query)
        return data
    }catch(err){
        return err
    }
}