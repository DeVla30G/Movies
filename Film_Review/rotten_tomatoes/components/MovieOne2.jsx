import React from "react";
import Router from 'next/router';
import Rate2 from './Rate2.jsx'
// import { AddComment } from "components/AddComment";
// import ListComments from "components/ListComments";

const MovieOne2 = ({ items2 }) => {
    return (
        <>
            <React.Fragment key={items2.id}>
                <div className="container col-md-6 offset-md-3">
                    <div className="flex flex-wrap -mx-1 lg:-mx-4">
                        <article className="overflow-hidden rounded-lg shadow-lg">
                            <img
                                alt="Poster display"
                                className="block h-auto w-full"
                                src={items2.backdrop_path}
                            />
                            <div className="text-card">
                                <header className="mt-2 flex flex-wrap text-sm leading-6 font-medium">
                                    <h1 className="text-lg">{items2.title}</h1>
                                </header>
                                <p>Synopsis : {items2.overview}</p>
                                <footer className="flex items2-center justify-between leading-none p-2 md:p-4">
                                    {/*<div className="card text-white bg-danger mb-3 p-2">
                                        <p>Vote average : {items2.vote_average}/10 &nbsp;&nbsp;&nbsp;</p>
                                    </div>*/}
                                    <div className="card text-white bg-danger mb-3 p-2">
                                        <p className="text-grey-darker text-sm">
                                            Release date : {items2.release_date}
                                        </p>
                                    </div>
                                </footer>
                              <Rate2 />
                            </div>
                        </article>
                    </div>
                </div>
            </React.Fragment>
        </>
    );
};

export default MovieOne2;