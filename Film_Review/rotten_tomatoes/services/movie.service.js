import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';
import  React  from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";

import { fetchWrapper } from '../helpers/fetch-wrapper';

const { publicRuntimeConfig } = getConfig();
const baseUrl = 'http://localhost:3040/movies';
const movieSubject = new BehaviorSubject(process.typeofwindow && JSON.parse(localStorage.getItem('movie')));

export const movieService = {
    movie: movieSubject.asObservable(),
    get movieValue() { return movieSubject.value },
    movieadd,
    getMovies,
    getMovie,
    update_movie,
    deleteMovie
};

async function movieadd(title, backdrop_path, poster_path, director, adult, overview, release_date, genre_name ) {

        axios.defaults.headers.put['Access-Control-Allow-Origin'] = '*'
        axios.defaults.headers.put['Content-Type' ] = 'application/json'
        return axios.post(`${baseUrl}`, {title, backdrop_path, poster_path, director, adult, overview, release_date, genre_name })
        .then(({movie}) => {console.log({movie}) 
        alert('Movie added successfully')
        },
        (err) => alert(err))
}


// get all movies
async function getMovies() {    

    return axios.get(`${baseUrl}`)
    .then( (response) => {console.log(JSON.stringify(response.data));
      })
      .catch((error) => {console.log(error);
      });
}

async function getMovie(id) {
    return axios.get(`${baseUrl}/${id}`)
    .then( (response) => {console.log(JSON.stringify(response.data));
      })
      .catch((error) => {console.log(error);
      });
}

async function update_movie(id, params) {

    
    return axios.patch(`${baseUrl}/${id}`, params)
        .then(x => {
            // update stored movie 
            if (id === movieSubject.value.id) {
                // update local storage
                const movie = { ...movieSubject.value, ...params };
                localStorage.setItem('movie', JSON.stringify(movie));

                // publish updated movie to subscribers
                movieSubject.next(movie);
            }
            return x;
        });
}

async function deleteMovie(id) {

        return fetchWrapper.delete(`${baseUrl}/${id}`);
    }