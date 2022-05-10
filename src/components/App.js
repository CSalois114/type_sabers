import React from "react"
import NavBar from "./NavBar";
import Home from "./Home";
import Leaderboard from "./Leaderboard";
import Game from "./Game";
import MiniLeaderboard from "./MiniLeaderboard";

export default function App() {
  return (
    <div>
      <NavBar />
      <Game />
    </div>
  );
}