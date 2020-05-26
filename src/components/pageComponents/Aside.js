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

export default function Aside() {
  return (
    <Router>
      <div>
        <nav className="aside">
          <ul>
              <NavLink to="/" exact={true} activeClassName="active">
                Start page
              </NavLink>
              <NavLink to="/chemicals" activeClassName="active">
                Chemicals
              </NavLink>
              <NavLink to="/warehouses" activeClassName="active">
                Warehouses
              </NavLink>
              <NavLink to="/search" activeClassName="active">
                Search
              </NavLink>
              {/* <NavLink to="/statistics" activeClassName="active">
                Statistics
              </NavLink> */}
          </ul>
        </nav>

        <Switch>
          <Route path="/chemicals">
            <Chemicals />
          </Route>
          <Route path="/warehouses">
            <Warehouses />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          {/* <Route path="/statistics">
            <Statistic />
          </Route> */}
          <Route path="/">
            <StartPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
