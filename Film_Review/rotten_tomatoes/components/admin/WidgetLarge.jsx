// import "../../../style/admin/widgetLarge.css"
import {useState, useEffect } from 'react';

// https://api.themoviedb.org/3/movie/top_rated?api_key=4d89a942554dede2811f349d8e5383e9&language=en-US&page=1  - top rated movies



export default function WidgetLarge() {

  const [concerts, setConcerts] = useState([]);
  
// fetch all concerts from data
useEffect(() => {
  //setConcerts(true);
  const getConcerts = () => {

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://localhost:3030/concerts", {
      method: 'GET',
      redirect: 'follow'
    })
      .then(response => response.json())
      .then(result => setConcerts(result))
      .catch(error => console.log('error', error));
  }
  getConcerts()
    // console.log(concerts)
    //.then(setConcerts(false));
}, []);
  
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest Sales</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Event</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Type</th>
        </tr>
        <tr className="widgetLgTr">
         <td className="widgetLgUser"> 
            <img src="https://i.pinimg.com/originals/86/08/70/860870066df05a7a29bcb5bb9ea2e9a7.jpg" 
            alt="" className="widgetLhImg" />
            <span className="widgetLgName">  </span>
          </td> ) 
          <td className="widgetLgEvent"> <p></p> </td>
          <td className="widgetLgDate"> <p> </p>  </td>
          <td className="widgetLgPrice"> <p> </p>  </td>
        </tr>
      </table>
    </div>
  )
}