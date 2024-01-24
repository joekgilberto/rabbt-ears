import * as tvmazeApi from './tvmaze-api';

export async function getManyShows(length) {
    try {
        const data = [];
        const used = [];
        const unusable = [0, 17, 36, 85, 113, 119, 121, 135, 173, 223, 264, 381, 389, 441, 442, 596, 606, 608, 639, 642, 715, 724, 783, 784, 852, 853, 876, 893, 925];
        let iterations = 10;

        if (length > iterations){
            iterations = length;
        }

        while (data.length < iterations) {
            const randomId = Math.floor(Math.random() * 1000) + 1;

            if (used.includes(randomId) || unusable.includes(randomId)) {
                continue;
            } else {
                const response = await tvmazeApi.show(randomId);
                if (response) {
                    data.push(response);
                }
                used.push(randomId);
            };
        };

        return data;
    } catch (err) {
        return err;
    }
}

export async function getShow(id) {
    try {
        const data = await tvmazeApi.show(id);
        return data;
    } catch (err) {
        return err;
    }
}

export async function searchShow(query) {
    try {
        const data = await tvmazeApi.search(query);
        return data;
    } catch (err) {
        return err;
    }
}