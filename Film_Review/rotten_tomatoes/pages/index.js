import React from "react";
import Popular from "../components/filter/Popular";
import MovieMysql from "../components/filter/movieMysql";
import axios from "axios";
import MovieCard1 from "../components/MovieCard1";
import MovieCard2 from "../components/MovieCard2";
import CarouselMod from "../components/Caroussel";
import { useState, useEffect } from "react";

export default Home;

function Home() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [genres, setGenres] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const fetchItems = async () => {
    const result = await axios(
      `https://api.themoviedb.org/3/search/movie?api_key=3b48a46f134828d98ef38a4aa8655422&language=en-US&page=1&include_adult=false&query=${query}`
    );
    setItems(result.data.results);
    setIsSearch(true);

  };
  const onChange = (e) => {
    setQuery(e);
  };
  const searchbar = (evt) => {
    if (evt.key === "Enter") {
      fetchItems();
    }

  };

  useEffect(() => {
    const fetchGenres = async () => {
      const result = await axios(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=3b48a46f134828d98ef38a4aa8655422`
      );
      setGenres(result.data.genres);
    };
    fetchGenres();
  }, []);

  const searchGenre = (genre_id) => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=3b48a46f134828d98ef38a4aa8655422&language=fr-FR&with_genres=${genre_id}`
    )
      .then((res) => res.json())
      .then((result) => {
        setItems(result.results);
        setIsSearch(true);
      });
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <input
                  onChange={(e) => onChange(e.target.value)}
                  value={query}
                  className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Search..."
                  aria-label="Search"
                  aria-describedby="button-addon2"
                  onKeyPress={searchbar}
                />
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  Genres
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  {genres.map((genre) => (
                    <React.Fragment key={genre.id}>
                      <li>
                        <a className="dropdown-item" onClick={() => searchGenre(genre.id)} >
                          {genre.name}
                        </a>
                      </li>
                    </React.Fragment>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
     {isSearch ? (
        <MovieCard1 items={items} /> +
        <MovieCard2 items={items} />
      ) : (
        <>
          <h1>Popular movies</h1>
          <Popular />
          <MovieMysql />
        </>
      )}
    </>
  );
}