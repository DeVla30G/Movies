import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import MovieCard2 from '../MovieCard2'

export default MyMovies;

function MyMovies() {
  const [items2, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(
        "http://localhost:3040/movies"
      );
      setItems(result.data);
      console.log(result.data)
    };
    fetchItems();
  }, []);
  
  if (items2.length >= 1) {
    return (
      <MovieCard2 items2={items2} />
    );
  } else {
    return (<p>loading...</p>)
  }
}