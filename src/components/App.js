import React from "react"
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Leaderboard from "./Leaderboard";
import Game from "./Game";


export default function App() {
  return (
    <div>
      <NavBar />
      <div id="appBody">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/game" element={<Game />}/>
          <Route path="/leaderboard" element={<Leaderboard />}/>
          
        </Routes>
      </div>
    </div>
  );
}