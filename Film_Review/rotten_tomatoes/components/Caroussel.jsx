import React, { useState } from "react";
import { Router } from 'next/router';


const CarouselMod = ({ items }) => {
    return (
      <div>
        <React.Fragment >
<div id="multi-item-example" class="carousel slide carousel-multi-item" data-ride="carousel">

  <div class="controls-top">
    <a class="btn-floating" href="#multi-item-example" data-slide="prev"><i class="fa fa-chevron-left"></i></a>
    <a class="btn-floating" href="#multi-item-example" data-slide="next"><i class="fa fa-chevron-right"></i></a>
  </div>
  <ol class="carousel-indicators">
    <li data-target="#multi-item-example" data-slide-to="0" class="active"></li>
    <li data-target="#multi-item-example" data-slide-to="1"></li>
    <li data-target="#multi-item-example" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner" role="listbox">
    <div class="carousel-item active">

      <div class="row">
        <div class="col-md-4">
          <div class="card mb-2">
            <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg" alt="Card image cap"/>
            <div class="card-body">
              <h4 class="card-title">Card title</h4>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                card's content.</p>
              <a class="btn btn-primary">Button</a>
            </div>
          </div>
        </div>

        <div class="col-md-4 clearfix d-none d-md-block">
          <div class="card mb-2">
            <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(18).jpg" alt="Card image cap"/>
            <div class="card-body">
              <h4 class="card-title">Card title</h4>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a class="btn btn-primary">Button</a>
            </div>
          </div>
        </div>

        <div class="col-md-4 clearfix d-none d-md-block">
          <div class="card mb-2">
            <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(35).jpg"
                 alt="Card image cap"/>
            <div class="card-body">
              <h4 class="card-title">Card title</h4>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a class="btn btn-primary">Button</a>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>

</div>
</React.Fragment>

</div>
    );
};
  
    export default CarouselMod;