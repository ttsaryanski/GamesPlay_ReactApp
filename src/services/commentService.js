import { api } from "../utils/requester";

const endPoints = {
    getAll: "/comments",
};

async function getAll(id, signal) {
    return await api.get(endPoints.getAll + `/${id}`, signal);
}

async function createNew(data) {
    return await api.post(endPoints.getAll, data);
}

async function delById(id) {
    return await api.del(endPoints.getAll + `/${id}`);
}

export const commentService = {
    getAll,
    createNew,
    delById,
};
