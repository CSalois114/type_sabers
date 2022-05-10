import React, { useState, useEffect } from "react";

export default function Game() {
  const [gameText, setGameText] = useState("");
  const [userEntry, setUserEntry] = useState("");
  const [textIndex, setTextIndex] = useState(0);
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
    }
  }

  return (
    <div id="game">
      <p>
        <span className="completed">{completed}</span>
        <span className="uncompleted">{uncompleted}</span>
      </p>
      <input onChange={handleEntry} value={userEntry} />
    </div>
  );
}
