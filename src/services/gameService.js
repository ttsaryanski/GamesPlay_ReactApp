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

export const gameService = {
    getAll,
    getLastThree,
    getById,
};
