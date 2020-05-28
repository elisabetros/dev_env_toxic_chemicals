import React from "react";
import logo from "./logo.svg";
import "./App.css";
import StartPage from "./components/StartPage";
import Header from "./components/pageComponents/Header";
import Aside from "./components/pageComponents/Aside";

function App() {
  return (
    <div className="App">
      <Header />
      <Aside />
    </div>
  );
}

export default App;
