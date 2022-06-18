import React from "react";
import Rate from './Rate.jsx'


const MovieOne = ({ items }) => {
    return (
        <>
            <React.Fragment key={items.id}>
                <div className="container col-md-6 offset-md-3">
                    <div className="flex flex-wrap -mx-1 lg:-mx-4">
                        <article className="overflow-hidden rounded-lg shadow-lg">
                            <img
                                alt="Poster display"
                                className="block h-auto w-full"
                                src={"https://image.tmdb.org/t/p/w500" + items.backdrop_path}
                            />
                            <div className="text-card">
                                <header className="mt-2 flex flex-wrap text-sm leading-6 font-medium">
                                    <h1 className="text-lg">{items.title}</h1>
                                </header>
                                <p>Synopsis : {items.overview}</p>
                                <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                                    <div className="card text-white bg-danger mb-3 p-2">
                                        <p>Vote average : {items.vote_average}/10 &nbsp;&nbsp;&nbsp;</p>
                                    </div>
                                    <div className="card text-white bg-danger mb-3 p-2">
                                        <p className="text-grey-darker text-sm">
                                            Release date : {items.release_date}
                                        </p>
                                    </div>
                                </footer>
                                <Rate />
                            </div>
                        </article>
                    </div>
                </div>
            </React.Fragment>
        </>
    );
};

export default MovieOne;