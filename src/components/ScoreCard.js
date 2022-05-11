import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function ScoreCard({submitArr}) {
  const [formData, setFormData] = useState({
    name: "Unknown Jedi",
    score: submitArr[2],
    wpm: submitArr[0],
    accuracy: submitArr[1],
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

    fetch("http://localhost:8001/highScores", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData)
    });
    navigate("/leaderboard")

  }

  return (
    <div>
      <h1 id='swFont' 
      style={{
        "color": '#FFE81F', 
        "font-size": 'xxx-large'
      }}>Battle Summary</h1>
      <table style={{
        "border": 'none'}}>
        <thead>
          <tr>
            <th style={{
        "border": 'none',
        "font-size": 'xx-large'}}>Score: {score}</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th style={{
        "border": 'none',
        "font-size": 'large'}}> WPM: {wpm}</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th style={{
        "border": 'none',
        "font-size": 'large'}}> Accuracy: {accuracy}</th>
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
