import * as authApi from './auth-api';

export async function register(data) {
    try {
        const res = await authApi.register(data);
        return res;
    } catch (err) {
        return err;
    }
}

export async function login(data) {
    try {
        const res = await authApi.login(data);
        return res;
    } catch (err) {
        return err;
    }
}

export async function logout() {
    try {
        const res = await authApi.logout();
        return res;
    } catch (err) {
        return err;
    }
}

export async function getUser(id) {
    try {
        const res = await authApi.show(id);
        return res;
    } catch (err) {
        return err;
    }
}

export async function updateUser(id,data) {
    try {
        const res = await authApi.update(id,data);
        return res;
    } catch (err) {
        return err;
    }
}