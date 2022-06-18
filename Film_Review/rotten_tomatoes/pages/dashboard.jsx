import { React } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import TopRated from '../components/admin/TopRated';

// https://api.themoviedb.org/3/movie/top_rated?api_key=4d89a942554dede2811f349d8e5383e9&language=en-US&page=1  - top rated movies
// https://api.themoviedb.org/3/movie/675353/reviews?api_key=4d89a942554dede2811f349d8e5383e9&language=en-US&page=1  - get all comments for movie/:id

function Board() {

    const {toprate, setToprate} = useState([]);
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const API_KEY = '4d89a942554dede2811f349d8e5383e9';

    useEffect(() => {
    const getToprate = async () => {
        
        const result = await axios (`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`, {
             headers: {
                'x-api-key': '', 
                'token': '209a2207e75a9bc48c0cc2dfb6142e74fd6cf46f',
                'Authorization': `Bearer 209a2207e75a9bc48c0cc2dfb6142e74fd6cf46f`
            } 
        });
        setToprate(result.data.results);
        setIsLoading(false);
    }
    getToprate()

}, []);

    return isLoading ? (
        <>
          <div>wait</div>
        </>
      ) : (
        <>
          <TopRated toprate={toprate} />
        </>
  );

}

export default Board; 