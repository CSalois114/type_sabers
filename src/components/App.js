import React from "react"
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Leaderboard from "./Leaderboard";
import Game from "./Game";
import ScoreCard from "./ScoreCard";


export default function App() {
  return (
    <div>
      <NavBar />
      <div id="appBody">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/game" element={<Game />}/>
          <Route path="/leaderboard" element={<Leaderboard />}/>
          <Route path="/scorecard" element={<ScoreCard />} />
        </Routes>
      </div>
    </div>
  );
}