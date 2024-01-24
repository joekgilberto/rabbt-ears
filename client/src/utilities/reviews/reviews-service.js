import * as reviewsApi from './reviews-api';

export async function getAllReviews() {
    try {
        const data = await reviewsApi.index();
        return data;
    } catch (err) {
        return err;
    }
}

export async function getReview(id) {
    try {
        const data = await reviewsApi.show(id);
        return data;
    } catch (err) {
        return err;
    }
}

export async function createReview(data) {
    try {
        const token = getUserToken();
        data = {...data, owner:token}
        const response = await reviewsApi.create(data);
        return response;
    } catch (err) {
        return err;
    }
}

export async function updateReview(id,data) {
    try {
        const response = await reviewsApi.update(id,data);
        return response;
    } catch (err) {
        return err
    }
}

export async function destroyReview(id) {
    try {
        const response = await reviewsApi.destroy(id);
        return response;
    } catch (err) {
        return err
    }
}