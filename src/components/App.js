import React, {useState, useEffect} from 'react'
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Leaderboard from "./Leaderboard";
import Game from "./Game";
import Episodes from "./Episodes";
import ScoreCard from "./ScoreCard";

export default function App() {
  const [jedis, setJedis] = useState([]);

  useEffect(()=>{
    fetch("https://type-sabers-server.herokuapp.com/highScores")
    .then(r=>r.json())
    .then(setJedis)
  }, []);

  const addNewJedi = (newJedi) => {
    const updatedLeaderBoard = [...jedis, newJedi];
    setJedis(updatedLeaderBoard);
  }

  return (
    <div>
      <NavBar />
      <div id="appBody">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/episodes" element={<Episodes/>} />
          <Route
            path="/episodes/:level"
            element={<Game />}
          />
          <Route
            path="/scorecard/new/:score"
            element={<ScoreCard addNewJedi={addNewJedi}/>}
          />
          <Route path="/leaderboard" element={<Leaderboard jedis={jedis} />} />
        </Routes>
      </div>
    </div>
  );
}
