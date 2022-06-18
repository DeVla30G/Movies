import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import MovieCard1 from '../MovieCard1'

export default Popular;

function Popular() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(
        "https://api.themoviedb.org/3/movie/popular?api_key=4d89a942554dede2811f349d8e5383e9"
      );
      setItems(result.data.results);
    };
    fetchItems();
  }, []);

  return (
      <MovieCard1 items={items} />
  );
}