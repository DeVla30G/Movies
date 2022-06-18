import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import WidgetLarge from "./WidgetLarge";

// what KPI - total rating, No of likes per movie, 

export default function Panel() {
  
    return (
      <div className="home">
        <FeaturedInfo />
        <Chart />
      
        <div className="homeWidgets">
            <WidgetSmall />
            <WidgetLarge />
          </div>
      </div>
     
    
    )
  }