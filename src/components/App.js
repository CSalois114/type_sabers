import React, {useState} from "react"
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Leaderboard from "./Leaderboard";
import Game from "./Game";
import Episodes from "./Episodes";
import ScoreCard from "./ScoreCard";


export default function App() {
  const [level, setLevel]           = useState(1);
  const [gameObj, setGameObj]       = useState({
    level: "",
    episode: "",
    title: "",
    text: ""
  });
  return (
    <div>
      <NavBar />
      <div id="appBody">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/game" element={<Game 
            gameObj={gameObj} setGameObj={setGameObj}
            level={level} />}/>
          <Route path="/leaderboard" element={<Leaderboard />}/>
          <Route path="/episodes" element={<Episodes setLevel={setLevel} />}/>
          <Route path="/scorecard" element={<ScoreCard />} />
        </Routes>
      </div>
    </div>
  );
}