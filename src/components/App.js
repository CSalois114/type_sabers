import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Leaderboard from "./Leaderboard";
import Game from "./Game";
import Episodes from "./Episodes";
import ScoreCard from "./ScoreCard";

export default function App() {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/gameTexts")
      .then((res) => res.json())
      .then(setEpisodes);
  }, []);

  return (
    <div>
      <NavBar />
      <div id="appBody">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/episodes" element={<Episodes episodes={episodes}/>} />
          <Route
            path="/episodes/:level"
            element={<Game  episodes={episodes}/>}
          />
          <Route
            path="/scorecard/new/:score"
            element={<ScoreCard/>}
          />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </div>
  );
}
