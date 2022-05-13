import React, {useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function ScoreCard({addNewJedi}) {
  const scoreData = (JSON.parse(useParams().score))
  const [formData, setFormData] = useState({
    name: "Unknown Jedi",
    score: scoreData.finalScore,
    wpm: scoreData.wpm,
    accuracy: scoreData.accuracy,
  });

  const {score, wpm, accuracy} = formData;
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [key]:value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const sound = new Audio("https://www.myinstants.com/media/sounds/blaster.mp3");
    sound.play()

    fetch("http://localhost:8001/highScores", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData)
    })
    .then(r=>r.json())
    .then(newLeader=>addNewJedi(newLeader));

    navigate("/leaderboard");
  }

  return (
    <div>
      <h1 id='swFont' 
      style={{
        "color": '#FFE81F', 
        "fontSize": 'xxx-large'
      }}>Battle Summary</h1>
      <table style={{
        "border": 'none'}}>
        <thead>
          <tr>
            <th style={{
        "border": 'none',
        "fontSize": 'xx-large'}}>Score: {score}</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th style={{
        "border": 'none',
        "fontSize": 'large'}}> WPM: {wpm}</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th style={{
        "border": 'none',
        "fontSize": 'large'}}> Accuracy: {accuracy}</th>
          </tr>
        </thead>
      </table>
      <form onSubmit={handleSubmit}>
        <label>
          <input style={{"height": '20px'}} type="text" placeholder="Enter Name..." name="name"  onChange={handleChange} />
        </label>
        <input className="button" type="submit" value="Submit"  />
      </form>
    </div>
  )
}
