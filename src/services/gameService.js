import { api } from "../utils/requester";

const endPoints = {
    getAll: "/games",
    getLastThree: "/games/last_three",
    infinity: (query) => `/games/infinity?page=${query}`,
};

async function getAll(signal) {
    return await api.get(endPoints.getAll, signal);
}

async function getLastThree(signal) {
    return await api.get(endPoints.getLastThree, signal);
}

async function getById(id, signal) {
    return await api.get(endPoints.getAll + `/${id}`, signal);
}

async function createNew(data) {
    return await api.post(endPoints.getAll, data);
}

async function editById(id, data) {
    return await api.put(endPoints.getAll + `/${id}`, data);
}

async function delById(id) {
    return await api.del(endPoints.getAll + `/${id}`);
}

async function getInfinity(query, signal) {
    return await api.get(endPoints.infinity(query), signal);
}

export const gameService = {
    getAll,
    getLastThree,
    getById,
    createNew,
    editById,
    delById,
    getInfinity,
};
