import React, {useState, useEffect} from 'react'

export default function Leaderboard() {
  const [jedis, setJedis] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:8001/highScores")
    .then(r=>r.json())
    .then(setJedis)
  }, []);

  const renderJediMasters = jedis.map(jedi=>{
    return (
      <div key={jedi.id}>
        <h2>Master {jedi.name}</h2>
        <h2>Score: {jedi.score}</h2>
        <h3>WPM: {jedi.wpm}</h3>
        <h3>Accuracy: {jedi.accuracy}%</h3>
      </div>
    )
  })

  return (
    <div>
      {renderJediMasters}
    </div>
  )
}