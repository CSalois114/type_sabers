import React, { useState, useEffect } from "react";

export default function Game() {
  const [gameText, setGameText] = useState("");
  const [userEntry, setUserEntry] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [errors, setErrors] = useState(0);
  console.log(textIndex, gameText.charAt(textIndex))

  const completed = gameText.slice(0, textIndex);
  const uncompleted = gameText.slice(textIndex);

  useEffect(() => {
    fetch("http://localhost:8001/gameTexts")
      .then((res) => res.json())
      .then((data) => setGameText(data.level1));
  }, []);

  const handleEntry = (e) => {
    if(e.target.value.slice(-1) === gameText.charAt(textIndex)){
      setUserEntry(gameText.charAt(textIndex) === " " ? "" : e.target.value)
      setTextIndex(textIndex + 1)  
    } else {
      setErrors(errors + 1)
    }
  }

  return (
    <div id="game">
      <div id="gameTextBox">
        <div id="gameText">
          <span className="completed">{completed}</span>
          <span id="cursor" style={{color:"red"}}>|</span>
          <span className="uncompleted">{uncompleted}</span>
        </div>
      </div>
      <input onChange={handleEntry} value={userEntry} />
      <span> Total Errors: {errors}</span>
    </div>
  );
}
