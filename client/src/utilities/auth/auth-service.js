//Imports custom API calls from auth-api
import * as authApi from './auth-api';

//Exports function that registers a user
export async function register(data) {
    try {
        const res = await authApi.register(data);
        return res;
    } catch (err) {
        return err;
    }
}

//Exports function that logs in a user
export async function login(data) {
    try {
        const res = await authApi.login(data);
        return res;
    } catch (err) {
        return err;
    }
}

//Exports function that logs out a user
export async function logout() {
    try {
        const res = await authApi.logout();
        return res;
    } catch (err) {
        return err;
    }
}

//Exports function that gets a user
export async function getUser(id) {
    try {
        const res = await authApi.show(id);
        if(res.length){
            return res[0];
        } else {
            throw Error('User not founds')
        }
    } catch (err) {
        return err;
    }
}

//Exports function that updates a user
export async function updateUser(id,data) {
    try {
        const res = await authApi.update(id,data);
        return res;
    } catch (err) {
        return err;
    }
}