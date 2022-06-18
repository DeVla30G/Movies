import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';

import { fetchWrapper } from '../helpers/fetch-wrapper';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/comments`;
const commentSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('comment')));

export const commentService = {
    comment: commentSubject.asObservable(),
    get commentValue () { return commentSubject.value },
    register,
    getAll,
    getAllById,
    getById,
    update,
    delete: _delete
};

function register(comment, id) {
    return fetchWrapper.post(`http://localhost:3040/comments/${id}`, {comment, id});
}
function getAll() {
    return fetchWrapper.get('http://localhost:3040/comments');
}
function getAllById(id) {
    return fetchWrapper.get(`http://localhost:3040/Movie_id/${id}`);
}

function getById(id) {
    return fetchWrapper.get(`http://localhost:3040/comments/${id}`);
}

function update(id, params) {
    return fetchWrapper.put(`http://localhost:3040/comments/${id}`, params)
        .then(x => {
            return x;
        });
}

function _delete(id) {
    return fetchWrapper.delete(`http://localhost:3040/comments/${id}`);
}
