import React, { useState } from "react";
import "../../css/aside.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import Chemicals from "../Chemicals";
import StartPage from "../StartPage";
import Warehouses from "../Warehouses";
import Sites from "../Sites";
import AddTicket from "../AddTicket";

import Header from "./Header";

export default function Aside() {
  return (
    <Router >
      <div>
        <nav className="aside">
          <ul>
              <li className="logo">Toxic Chemical <br/>Industries</li>
              <NavLink to="/toxic_chemicals" exact={true} activeClassName="active">
                Home
              </NavLink>
              <NavLink to="/toxic_chemicals/chemicals" activeClassName="active">
                Chemicals
              </NavLink>
              <NavLink to="/toxic_chemicals/warehouses" activeClassName="active">
                Warehouses
              </NavLink>
              <NavLink to="/toxic_chemicals/sites" activeClassName="active">
                Sites
              </NavLink>
              <NavLink to="/toxic_chemicals/addTicket" activeClassName="active">
                Process Ticket
              </NavLink>
          </ul>
        </nav>
        <Header />
        <Switch>
          <Route path="/toxic_chemicals/chemicals">
            <Chemicals />
          </Route>
          <Route path="/toxic_chemicals/warehouses">
            <Warehouses />
          </Route>
          <Route path="/toxic_chemicals/sites">
            <Sites />
          </Route>
          <Route path="/toxic_chemicals/addTicket">
            <AddTicket />
          </Route>
          <Route exact path="/toxic_chemicals">
            <StartPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
