import { api } from "../utils/requester";

const endPoints = {
    getAll: "/games",
};

async function getAll(signal) {
    return await api.get(endPoints.getAll, signal);
}

export const gamesService = {
    getAll,
};
