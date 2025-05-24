import { api } from "../utils/requester";

const endPoints = {
    getGames: (query) => `/admin/games/?page=${query}`,
    delGame: "/admin/games",
    getUsers: (query) => `/admin/users/?page=${query}`,
    delUser: "/admin/users",
    users: "/admin/users",
    getStats: (query) => `/admin/stats/?page=${query}`,
};

async function getGames(query, signal) {
    return await api.get(endPoints.getGames(query), signal);
}

async function delGameById(id) {
    return await api.del(endPoints.delGame + `/${id}`);
}

async function getUsers(query, signal) {
    return await api.get(endPoints.getUsers(query), signal);
}

async function makeAdmin(id, signal) {
    return await api.get(endPoints.users + `/${id}`, signal);
}

async function delUserById(id) {
    return await api.del(endPoints.delUser + `/${id}`);
}

async function getStats(query, signal) {
    return await api.get(endPoints.getStats(query), signal);
}

export const adminService = {
    getGames,
    delGameById,
    getUsers,
    delUserById,
    makeAdmin,
    getStats,
};
