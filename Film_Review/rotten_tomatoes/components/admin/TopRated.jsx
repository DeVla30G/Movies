import React from "react";
import Router from 'next/router';

const TopRated = ({ toprate, index}) => {

           return (
            <div className="container">
            <h1>Top rated movies</h1>
            <table striped border hover size="sm" responsive>
                <thead>
                <tr>
                    <th > Table heading</th>
                    <th>Title</th>
                    <th>Original title</th>
                    <th>Popularity</th>
                    <th>Release date</th>
                    <th>Average vote</th>
                    <th> Genre </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                {Array.from({length: 6}).map((toprate, index) => (
                    <th key={index}> Table heading</th>
                ))}
                  <td>Table cell index {title}</td>
                 <td>{toprate.original_title}</td>
                 <td>{toprate.popularity}</td>
                 <td>{release_date}</td>
                 <td>{vote_average}</td>
                 <td>{genre_ids}</td>
              </tr>
                </tbody>
            </table>
        </div>
           
           )
};

export default TopRated;