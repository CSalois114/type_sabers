import React, {useState, useEffect} from 'react'

export default function Leaderboard() {
  const [jedis, setJedis] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:8001/highScores")
    .then(r=>r.json())
    .then(setJedis)
  }, []);

  const renderJediMasters = jedis.sort((a,b)=>{return b.score - a.score})
  .map(jedi=>{
    return (
        <tr key={jedi.id}>
          <td>{jedi.name}</td>
          <td>{jedi.wpm}</td>
          <td>{jedi.accuracy}%</td>
          <td>{jedi.score}</td>
        </tr>
    )
  })

  return (
    <table>
      <thead id="swFont">
        <tr>
          <th>Leaderboard</th>
        </tr>
      </thead>
       <thead>
        <tr>
          <th>Master</th>
          <th>Words/Minute</th>
          <th>Accuracy</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
      {renderJediMasters}
      </tbody>
    </table>
  )
}