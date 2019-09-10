import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Place from "./components/place/Place";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="main-container">
        <Header />
        <Route path="/" exact component={() => <Redirect to="/places" />} />
        <Route path="/places" exact component={Main} />
        <Route path="/places/:id" exact component={Place} />
      </div>
    </Router>
  );
}

export default App;
