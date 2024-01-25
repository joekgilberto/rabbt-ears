import * as reviewsApi from './reviews-api';
import { getUserToken } from '../local-storage';

export async function getAllReviews() {
    try {
        const res = await reviewsApi.index();
        return res;
    } catch (err) {
        return err;
    }
}

export async function getReview(id) {
    try {
        const res = await reviewsApi.show(id);
        return res;
    } catch (err) {
        return err;
    }
}

export async function createReview(data) {
    try {
        const token = getUserToken();
        data = {...data, owner:token}
        const res = await reviewsApi.create(data);
        return res;
    } catch (err) {
        return err;
    }
}

export async function updateReview(id,data) {
    try {
        const res = await reviewsApi.update(id,data);
        return res;
    } catch (err) {
        return err
    }
}

export async function destroyReview(id) {
    try {
        const res = await reviewsApi.destroy(id);
        return res;
    } catch (err) {
        return err
    }
}