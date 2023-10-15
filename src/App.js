import React from "react"
import Navigation from "./components/navigation";
import {Route, Routes} from "react-router-dom";
import GlobalTop from "./pages/global-top";
import Diagrams from "./pages/diagrams";
import Leaderboard from "./pages/leaderboard";

export default function App() {
  return (
    <>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Leaderboard/>}/>
        <Route path="/global-top" element={<GlobalTop/>}/>
        <Route path="/diagrams" element={<Diagrams/>}/>
      </Routes>
    </>
  )
}