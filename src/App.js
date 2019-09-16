import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import PlaceDetail from "./components/place/PlaceDetail";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="main-container">
        <Header />
        <Route path="/" exact component={() => <Redirect to="/places" />} />
        <Route path="/places" exact component={Main} />
        <Route path="/places/:id" exact component={PlaceDetail} />
      </div>
    </Router>
  );
}

export default App;
