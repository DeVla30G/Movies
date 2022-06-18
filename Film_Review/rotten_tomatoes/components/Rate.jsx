import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import React from "react";

function Rate() {
  const router = useRouter();
  const { id } = router.query;
  console.log(router.query)
  const [rate, setRate] = useState();

  axios.post(
    `https://api.themoviedb.org/3/movie/${id}/rating?api_key=4d89a942554dede2811f349d8e5383e9`, { rate }
  ).then(function (reponse) {
    console.log(JSON.stringify(reponse.data));
  })
    .catch(function (error) {
      console.log(error);
    });

  return (
    <>
      <div className="container col-md-6 offset-md-3">
        <div className="card text-white bg-danger mb-3 p-2">
          <form className="form-inline">
              <label for="rate">Rate movie :&nbsp;</label>
              <input
                type="number"
                id="rate"
                name="rate"
                min="0.5" max="10" step="0.5"
                placeholder="0.5"
                className="text-black"
              /> /10&nbsp;&nbsp;&nbsp;
            <button type="submit" className="btn btn-warning mb-2 btn-sm">Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Rate;