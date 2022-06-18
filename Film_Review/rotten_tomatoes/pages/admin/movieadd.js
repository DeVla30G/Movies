import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Link, useNavigate} from "react-router-dom";
import {Button,Col, Container, Form, Row} from "react-bootstrap";


export default function MovieAdd() {
            // form validation rules 
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required'),
        backdrop_path: Yup.string()
            .required('Backdrop picture is required')
            .matches(/^(\/{0,1}(?!\/))[A-Za-z0-9\/\-_]+(\.([a-zA-Z]+))?$/),
        poster_path: Yup.string()
            .required('Poster view is required')
            .matches(/^(\/{0,1}(?!\/))[A-Za-z0-9\/\-_]+(\.([a-zA-Z]+))?$/),
        director: Yup.string()
            .required('Director name is required'),
        adult: Yup.bool()
            .required('Select type is required'),
        overview: Yup.string()
            .required('Description is required'),
        release_date: Yup.string()
            .required('Release date is required')
            .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Release date must be a valid date in the format YYYY-MM-DD'),
        genre_name: Yup.string()
            .required('Genre is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { movieadd, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {
        return movieService.movieadd(data)
            .then(() => {
                alertService.success('Movie added successfully', { keepAfterRouteChange: true });
                router.push('/');
            })
            .catch(alertService.error);
            
    }
    window.location.reload()

    function Link({ href, children, ...props }) {
        return (
            <NextLink href={href}>
                <a {...props}>
                    {children}
                </a>
            </NextLink>
        );
    }
          
  return (

    <div className="card m-3">
    <h5 className="card-header">Add new movie</h5>
    <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
                <div className="form-group col">
                    <label>Type of movie</label>
                    <select name="adult" {...movieadd('adult')} className={`form-control ${errors.title ? 'is-invalid' : ''}`} select data-bind="booleanValue: state">
                        <option value=""></option>
                        <option value="true">Only adults</option>
                        <option value="false">All public</option>
                    </select>
                    <div className="invalid-feedback">{errors.adult?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Title</label>
                    <input name="title" type="text" {...movieadd('title')} className={`form-control ${errors.title ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.title?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Genre</label>
                    <input name="genre" type="text" {...movieadd('genre')} className={`form-control ${errors.genre ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.genre?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                    <label>Release Date</label>
                    <input name="release_date" type="date" {...movieadd('release_date')} className={`form-control ${errors.release_date ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.release_date?.message}</div>
                </div>
                <div className="form-group col">
                    <label>Director</label>
                    <input name="director" type="text" {...movieadd('director')} className={`form-control ${errors.director ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.director?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                    <label>Backdrop image</label>
                    <input name="backdrop_path" type="file" {...movieadd('backdrop_path')} className={`form-control ${errors.backdrop_path ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.backdrop_path?.message}</div>
                </div>
                <div className="form-group col">
                    <label>Poster image</label>
                    <input name="poster_path" type="file" {...movieadd('poster_path')} className={`form-control ${errors.poster_path ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.poster_path?.message}</div>
                </div>
            </div>
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">Synopsis</span>
                </div>
                <textarea class="form-control" aria-label="Description"></textarea>
                </div>

            <div className="form-group">
                <button type="submit" className="btn btn-primary mr-1">Add</button>
                <button type="button" onClick={() => reset()} className="btn btn-secondary">Reset</button>
            </div>
        </form>
    </div>
</div>
     
);
  }