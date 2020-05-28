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
import Statistic from "../Statistic";
import Search from "../Search";
import AddTicket from "../AddTicket";

export default function Aside() {
  return (
    <Router>
      <div>
        <nav className="aside">
          <ul>
              <NavLink to="/toxic_chemicals" exact={true} activeClassName="active">
                Start page
              </NavLink>
              <NavLink to="/toxic_chemicals/chemicals" activeClassName="active">
                Chemicals
              </NavLink>
              <NavLink to="/toxic_chemicals/warehouses" activeClassName="active">
                Warehouses
              </NavLink>
              <NavLink to="/toxic_chemicals/search" activeClassName="active">
                Search
              </NavLink>
              <NavLink to="/toxic_chemicals/addTicket" activeClassName="active">
                Process Ticket
              </NavLink>
          </ul>
        </nav>

        <Switch>
          <Route path="/toxic_chemicals/chemicals">
            <Chemicals />
          </Route>
          <Route path="/toxic_chemicals/warehouses">
            <Warehouses />
          </Route>
          <Route path="/toxic_chemicals/search">
            <Search />
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
