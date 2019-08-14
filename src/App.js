import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./components/main/Main";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Main} />
      </div>
    </Router>
  );
}

export default App;
