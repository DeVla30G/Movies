import { React, useState } from 'react';
import { useRouter } from "next/router";
import { useForm } from 'react-hook-form';
import { alertService } from "../../services/alert.service";
import { movieService } from '../../services/movie.service';
import axios from 'axios';
import { Link, useNavigate} from "react-router-dom";



export default function MovieAdd() {

    const navigate =  useNavigate();
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [backdrop_path, setBackdrop] = useState("");
    const [poster_path, setPoster] = useState("");
    const [director, setDirector] = useState("");
    const [adult, setAdult] = useState("");
    const [overview, setOverview] = useState("");
    const [release_date, setRelDate] = useState("");
    const [genre_name, setGenre] = useState("");
    
            // form validation rules 
    const Add = () => {

        if (!title) {
            alert('Please enter title');
            return;
          }
        if (!backdrop_path) {
            alert('Please enter backdrop path');
            return;
          }
        if (!poster_path) {
            alert('Please enter poster link');
            return;
          }
        if (!director) {
            alert('Please enter director name');
            return;
          }
        if (!adult) {
            alert('Please enter type of film 0-all public/ 1-adult only');
            return;
          }
          if (!overview) {
            alert('Please enter description');
            return;
          }
          if (!release_date) {
            alert('Please enter release date');
            return;
          }
          if (!genre_name) {
            alert('Please enter genre name/s');
            return;
          }

          axios.defaults.headers.put['Access-Control-Allow-Origin'] = '*'
          axios.defaults.headers.put['Content-Type' ] = 'application/json'
          return axios.post(`${baseUrl}`, {title, backdrop_path, poster_path, director, adult, overview, release_date, genre_name })
          .then(({movie}) => {console.log({movie}) 
          alert('Movie added successfully')
          },
          (err) => alert(err))
  }

        navigate('/movies')
        window.location.reload()
          
  return (

    <div className="card m-3">
    <h5 className="card-header">Add new movie</h5>
    <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
                <div className="form-group col">
                    <label>Type of movie</label>
                    <select name="adult" >
                        <option value=""></option>
                        <option value="true">Only adults</option>
                        <option value="false">All public</option>
                    </select>
                    <div className="invalid-feedback">{errors.adult?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Title</label>
                    <input name="title" type="text" onChange={(e) => setTitle(e.target.value)} />
                    <div className="invalid-feedback">{errors.title?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Genre</label>
                    <input name="genre" type="text" onChange={(e) => setGenre(e.target.value)} />
                    <div className="invalid-feedback">{errors.genre?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                    <label>Release Date</label>
                    <input name="release_date" type="date" onChange={(e) => setRelDate(e.target.value)} />
                    <div className="invalid-feedback">{errors.release_date?.message}</div>
                </div>
                <div className="form-group col">
                    <label>Director</label>
                    <input name="director" type="text" onChange={(e) => setDirector(e.target.value)} />
                    <div className="invalid-feedback">{errors.director?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                    <label>Backdrop image</label>
                    <input name="backdrop_path" type="file" onChange={(e) => setBackdrop(e.target.value)} />
                    <div className="invalid-feedback">{errors.backdrop_path?.message}</div>
                </div>
                <div className="form-group col">
                    <label>Poster image</label>
                    <input name="poster_path" type="file" onChange={(e) => setPoster(e.target.value)} />
                    <div className="invalid-feedback">{errors.poster_path?.message}</div>
                </div>
            </div>
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">Synopsis</span>
                </div>
                <textarea class="form-control" aria-label="Description" onChange={(e) => setOverview(e.target.value)}></textarea>
                </div>

            <div className="form-group">
                <button type="submit" onClick={() => Add()} className="btn btn-secondary">Add movie</button>
                <a href="/movies"><button type="button" className="btn btn-primary mr-1">Go to the list</button></a>
            </div>
        </form>
    </div>
</div>
     
);
  }