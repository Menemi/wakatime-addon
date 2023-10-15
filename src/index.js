import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Navigation from "./components/navigation";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import GlobalTop from "./pages/global-top";
import Diagrams from "./pages/diagrams";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Navigation/>
    <Routes>
      <Route path="/" element={<App/>}/>
      <Route path="/global-top" element={<GlobalTop/>}/>
      <Route path="/diagrams" element={<Diagrams/>}/>
    </Routes>
  </Router>
);