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

export const gamesService = {
    getAll,
    getLastThree,
};
