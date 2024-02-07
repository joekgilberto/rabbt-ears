//Imports custom API calls from auth-api and custom local storage tool
import * as reviewsApi from './review-api';
import { getUserToken } from '../local-storage';

//Exports function that calls all reviews
export async function getAllReviews() {
    try {
        const res = await reviewsApi.index();
        res.reverse();
        return res;
    } catch (err) {
        return err;
    }
}

//Exports function that calls a specific review by id
export async function getReview(id) {
    try {
        const res = await reviewsApi.show(id);
        return res;
    } catch (err) {
        return err;
    }
}

//Exports function that calls reviews associated with a show by id
export async function getAssociated(id) {
    try {
        const res = await reviewsApi.associated(id);
        res.reverse();
        return res;
    } catch (err) {
        return err;
    }
}

//Exports function that calls reviews associated with a user by id
export async function getUsersReview(id) {
    try {
        const res = await reviewsApi.users(id);
        res.reverse();
        return res;
    } catch (err) {
        return err;
    }
}

//Exports function that creates a review
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

//Exports function that updates a specific review by id
export async function updateReview(id,data) {
    try {
        const res = await reviewsApi.update(id,data);
        return res;
    } catch (err) {
        return err
    }
}

//Exports function that deletes a specific review by id
export async function destroyReview(id) {
    try {
        const res = await reviewsApi.destroy(id);
        return res;
    } catch (err) {
        return err
    }
}

export async function likeReview(id,data) {
    try {
        const likes = {likes: data}
        const res = await reviewsApi.like(id,likes);
        return res;
    } catch (err) {
        return err
    }
}