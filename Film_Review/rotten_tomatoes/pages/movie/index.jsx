import { useState, useEffect } from "react";
import { React } from 'react';
import { useRouter } from "next/router";
import axios from "axios";
import { Link } from "../../components/Link";
import { Spinner } from "../../components/Spinner";
import { userService } from "../../services/user.service";
import { movieService} from "../../services/movie.service";

export default Index;

function Index() {
  const [movies, setMovies] = useState(null);
  const [comments, setComments] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      const result = await axios(
        'http://localhost:3040/movies'
      );
      setMovies(result.data);
      console.log(result.data)
    };
    fetchMovies();

  }, []);

  function deleteMovie(id) {
   axios.delete(`http://localhost:3040/movies/${id}`)
   .then((response) => {
    console.log(response.data)
  })
  .catch((err) => {
    console.log(err)
  })
  }

  function deleteComment(id) {
    setComments(
      comments.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    commentService.delete(id).then(() => {
      setComments((comments) => comments.filter((x) => x.id !== id));
    });
  }


  return (
 <> 
 <h1>Movies</h1>
 <div className="tab_wrap">
     
      <Link href="/movies/add" className="btn btn-sm btn-success mb-2">
        Add movie
      </Link> <br/>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Poster image</th>
            <th>Release date</th>
            <th>Director</th>
            <th>Genre</th>
            <th> Actions </th>

          </tr>
        </thead>
        <tbody>
          {movies &&
            movies.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.title}</td>
                <td className="table_pic"><img src={movie.poster_path}/></td>
                <td>{movie.release_date}</td>
                <td>{movie.director}</td>
                <td>{movie.genre_name}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link
                    href={`/movie/edit/${movie.id}`}
                    className="btn btn-sm btn-primary mr-1"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteMovie(movie.id)}
                    className="btn btn-sm btn-danger btn-delete-movie"
                    disabled={movie.isDeleting}
                  >
                    {movie.isDeleting ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <span>Delete</span>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          {!movies && (
            <tr>
              <td colSpan="4">
                <Spinner />
              </td>
            </tr>
          )}
          {movies && !movies.length && (
            <tr>
              <td colSpan="4" className="text-center">
                <div className="p-2">No movie To Display</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
      </>
  );
}