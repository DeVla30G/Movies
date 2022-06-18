import React from "react";
import Router from 'next/router';

const MovieCard2 = ({ items2 }) => {
  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {items2.map((item2) => (
          <React.Fragment key={item2.id}>
            <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4">
              <div className="movies_background" onClick={() => Router.push('/movieMysql/' + item2.id)}>
              <article className="overflow-hidden rounded-lg shadow-lg">
                  <img
                    alt="Poster display"
                    className="block h-auto w-full"
                    src={item2.poster_path}
                  />
                <div className="text-card">
                <header className="flex item2s-center justify-between leading-tight p-2 md:p-4">
                  <h1 className="text-lg">{item2.title}</h1>
                </header>
                <p className="overview">{item2.overview}</p>
                <footer className="flex item2s-center justify-between leading-none p-2 md:p-4">
                  <div className="flex">
                    <span>{item2.vote_average}/10 </span>
                    <img src="https://i.ibb.co/k3Vb2t5/tomato.png" width="20" />
                  </div>
                  <div>
                    <p className="text-grey-darker text-sm">{item2.release_date}</p>
                  </div>
                </footer>
                </div>
              </article>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MovieCard2;