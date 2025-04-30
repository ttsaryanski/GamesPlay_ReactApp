import { api } from "../utils/requester";

const endPoints = {
    register: "/authGame/register",
    login: "/authGame/login",
    logout: "/authGame/logout",
    profile: "/authGame/profile",
};

async function register(data) {
    return await api.post(endPoints.register, data);
}

async function login(data) {
    return await api.post(endPoints.login, data);
}

async function logout() {
    return await api.post(endPoints.logout);
}

async function profile(signal) {
    const user = await api.get(endPoints.profile, signal);

    return user;
}

export const authService = {
    register,
    login,
    logout,
    profile,
};
