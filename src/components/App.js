import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Leaderboard from "./Leaderboard";
import Game from "./Game";
import Episodes from "./Episodes";
import ScoreCard from "./ScoreCard";

export default function App() {
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
            element={<ScoreCard/>}
          />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </div>
  );
}
