import { api } from "../utils/requester";

const endPoints = {
    getAll: "/games",
    getLastThree: "/games/last_three",
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

export const gameService = {
    getAll,
    getLastThree,
    getById,
    createNew,
};
