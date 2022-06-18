// import "../../style/admin/sidebar.css"
import { React } from 'react';
// import { div, PersonSharp, Event, div } from "@material-ui/icons";
import {Nav} from "react-bootstrap";

export default function SideBar() {
  return (
    <div className="AdminSideBar">
       <div className="sidebarWrapper">
         <div className="sidebarMenu">
           <h3 className="sidebarTitle">
             Dashboard
            </h3>
            <ul className="sidebarList">
              <li className="sidebartListItem">
              <div className="sidebarIcon"/> <Nav.Link href="/">divsite</Nav.Link> 
              </li>
              <li className="sidebartListItem">
                 <div className="sidebarIcon"/> <Nav.Link href="/admin">Analytics</Nav.Link> 
              </li>
            </ul>
              <h3 className="sidebarTitle">
                Management
              </h3>
            <ul className="sidebarList">
              <li className="sidebartListItem">
                <div className="sidebarIcon"/> <Nav.Link href="/admin/users">Users</Nav.Link> 
              </li>
              <li className="sidebartListItem">
                <div className="sidebarIcon"/><Nav.Link href="/admin/concerts">Events</Nav.Link>
              </li>
            </ul>
         </div>
       </div>
    </div>
  )
}