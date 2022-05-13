import React from 'react'

export default function Leaderboard({jedis}) {
  console.log(jedis)

  const renderJediMasters = jedis.sort((a,b)=>{return b.score - a.score})
  .slice(0,10)
  .map(jedi=>{
    return (
        <tr key={jedi.id}>
          <td style={{"fontFamily": 'Days One'}}>{jedi.name.toUpperCase()}</td>
          <td style={{"fontWeight": '750'}}>{jedi.wpm}</td>
          <td style={{"fontWeight": '750'}}>{jedi.accuracy}%</td>
          <td id='swFont' style={{"color": '#FFE81F'}}>{jedi.score}</td>
        </tr>
    )
  });

  return (
    <div>
      <h1 id="swFont" style={{"color": '#FFE81F', "fontSize": 'xxx-large'}}>Leaderboard</h1>
      <table style={{background: "black"}}>
        <thead>
          <tr>
            <th>Master</th>
            <th>Words/Minute</th>
            <th>Accuracy</th>
            <th id='swFont' style={{"color": '#FFE81F'}}>Score</th>
          </tr>
        </thead>
        <tbody>
        {renderJediMasters}
        </tbody>
      </table>
    </div>
  )
}