import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import React from "react";


function Rate2() {

  const router = useRouter();
  const { id } = router.query;
  console.log(router.query)
  
  const vote_count = document.getElementById(".vote_count");
  console.log(vote_count)

  function submit () {
  axios.post(
    `http://localhost:3040/movies/${id}`, { vote_count }
  ).then(function (reponse) {
    console.log(JSON.stringify(reponse.data));
  })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <>
      <div className="container col-md-6 offset-md-3">
        <div className="card text-white bg-danger mb-3 p-2">
          <form method='POST' className="form-inline" onSubmit={submit()}>
              <label for="vote_count">Rate movie :&nbsp;</label>
              <input
                type="number"
                id="vote_count"
                name="vote_count"
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

export default Rate2;
