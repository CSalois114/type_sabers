import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function ScoreCard({submitArr}) {
  const [formData, setFormData] = useState({
    name: "Unknown Jedi",
    score: submitArr[2],
    wpm: submitArr[0],
    accuracy: submitArr[1],
  });
  
  console.log(submitArr)
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [key]:value,
    })
    console.log(formData)
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
      <h1 id='swFont' style={{"color": '#FFE81F'}}>Battle Summary</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input style={{"height": '20px'}} type="text" placeholder="Enter Name..." name="name" onChange={handleChange} />
        </label>
        <input className="button" type="submit" value="Submit"  />
        <br />
        <label>Accuracy: {formData.accuracy}</label>
        <br />
        <label>WPM: {formData.wpm}</label>
        <br />
        <label>Score: {formData.score}</label>
      </form>
    </div>
  )
}
