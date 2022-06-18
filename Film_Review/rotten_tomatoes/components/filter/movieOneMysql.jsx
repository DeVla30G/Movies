import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import MovieOne2 from "../MovieOne2.jsx";

function Movie2() {
  const router = useRouter();
  const { id } = router.query;
  console.log(router.query)
  const [items2, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(
        `http://localhost:3040/movies/${id}`
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
      <MovieOne2 items2={items2} />
    </>
  );
}

export default Movie2;