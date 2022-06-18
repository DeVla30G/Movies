import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';
import axios from 'axios'

import { fetchWrapper } from '../helpers/fetch-wrapper';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(process.typeofwindow && JSON.parse(localStorage.getItem('user')));

export const userService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(email, password) {

    return axios.post(`http://localhost:3040/login`, { email, password })
        .then(user => {
            userSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user));
            console.log(user);
            return user;
        });
        Router.push('/');
}

function logout() {
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/');
}

function register(user) {
    return fetchWrapper.post(`http://localhost:3040/register`, user);
}

function getAll() {
    return fetchWrapper.get('http://localhost:3040/users');
}

function getById(id) {
    return fetchWrapper.get(`http://localhost:3040/users/${id}`);
}

function update(id, params) {
    return fetchWrapper.patch(`http://localhost:3040/users/${id}`, params)
        .then(x => {
            // update stored user if the logged in user updated their own record
            if (id === userSubject.value.id) {
                // update local storage
                const user = { ...userSubject.value, ...params };
                localStorage.setItem('user', JSON.stringify(user));

                // publish updated user to subscribers
                userSubject.next(user);
            }
            return x;

        });
        console.log(userSubject.value.data.id);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`http://localhost:3040/users/${id}`);
}