import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams} from "react-router-dom";
import {Button } from "react-bootstrap";
import { Spinner } from "../../../components/Spinner";
import Edit from '../../../components/admin/EditMovie';
import { movieService } from "../../../services/movie.service"
import { userService } from "../../../services/user.service";
import { alertService } from "../../../services/alert.service";
import { useRouter } from 'next/router';


export default function Update() {

    
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const router = useRouter();

    useEffect(() => {
      // fetch movie
      movieService
        .getMovie(id)
        .then((x) => setMovie(x))
        .catch(alertService.error);
  
    }, []);


  if (localStorage.getItem('role') === "1")
  return (
    <>
    <Edit movie={movie}/> 
    </>

);
else
return (
  <div> YOU ARE NOT AUTHORIZED</div>
  
)

}