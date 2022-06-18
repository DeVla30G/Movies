import React from "react";
import Router from 'next/router';
import Rate2 from "../Rate2";
import { useParams } from "react-router-dom";

const Edit = ({movie}) => {

    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [backdrop_path, setBackdrop] = useState("");
    const [poster_path, setPoster] = useState("");
    const [director, setDirector] = useState("");
    const [adult, setAdult] = useState("");
    const [overview, setOverview] = useState("");
    const [release_date, setRelDate] = useState("");
    const [genre_name, setGenre] = useState("");

    const Submit = () => {
          
        axios.defaults.headers.put['Access-Control-Allow-Origin'] = '*'
        axios.defaults.headers.put['Content-Type' ] = 'application/json'
        axios.put('http://localhost:3040/movies/' + `${id}`, {title, backdrop_path, poster_path, director, adult, overview, release_date, genre_name }).then(
          ({data}) => {
            console.log({data})
            alert('Event updated successfully')
          },
          (err) => alert(err))
        }


    return (
        <>

    <div className='container'>
        <div className="update_form">
        <h1>UPDATE MOVIE'S INdivATIONS</h1>
        <br/>
        <br/>
            <div>
                <div className="mb-3" >
                <label>Title</label>
                <input type="text" placeholder="Enter title" onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="mb-3" >
                <label>Backdrop image</label>
                <input type="text" placeholder="Enter backdrop-path" onChange={(e) => setBackdrop(e.target.value)} />
                </div>
                <div className="mb-3" >
                <label>Poster</label>
                <input type="text" placeholder="Enter poster_path" onChange={(e) => setPoster(e.target.value)} />
                </div>
                <div className="mb-3" >
                <label>Director</label>
                <input type="text" placeholder="Enter director name" onChange={(e) => setDirector(e.target.value)} />
                </div>
                <div className="mb-3" >
                <label>Type of movie</label>
                <input type="text" placeholder="All public/ Adult" onChange={(e) => setAdult(e.target.value)} />
                </div>
                <div className="mb-3" >
                <label>Release date</label>
                <input type="date" placeholder="Enter date" onChange={(e) => setRelDate(e.target.value)} />
                </div>
                <div className="mb-3" >
                <label>Overview</label>
                <input type="text" placeholder="Enter place" onChange={(e) => setOverview(e.target.value)} />
                </div>
                <div className="mb-3" >
                <label>Genre</label>
                <input type="text" placeholder="Enter genre name/s" onChange={(e) => setGenre(e.target.value)} />
                </div>
                <Button variant="warning" onClick={() => Submit()}>Validate</Button>
                <br/>
                <br/>
                <Link to={{pathname: '/profil/movie'}}>
                Return to movie list
                </Link>
            </div>
        </div>
    </div>
    </>
    );
};
export default Edit;