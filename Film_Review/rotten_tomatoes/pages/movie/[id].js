import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import React from "react";
import MovieOne from "../../components/MovieOne.jsx";

function Movie() {
  const router = useRouter();
  const { id } = router.query;
  console.log(router.query)
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(
        `https://api.themoviedb.org/3/movie/${id}?api_key=4d89a942554dede2811f349d8e5383e9`
      );
      setItems(result.data);
      setIsLoading(false);
      console.log(result.data)
    };
    fetchItems();
  }, []);

  return isLoading ? (
    <>
      <div>wait</div>
    </>
  ) : (
    <>
      <MovieOne items={items} />
    </>
  );
}

export default Movie;
