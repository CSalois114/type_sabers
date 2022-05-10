import React, { useState, useEffect } from "react";

export default function Game() {
  const [level, setLevel] = useState(0)
  const [gameObj, setGameObj] = useState({
    level: "",
    title: "",
    text: ""
  });
  const [userEntry, setUserEntry] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [errors, setErrors] = useState(0);
  console.log(textIndex, gameObj.text.charAt(textIndex))

  const completed = gameObj.text.slice(0, textIndex);
  const uncompleted = gameObj.text.slice(textIndex);

  useEffect(() => {
    fetch("http://localhost:8001/gameTexts")
      .then((res) => res.json())
      .then((data) => setGameObj(data[level]));
  }, []);

  const handleEntry = (e) => {
    if(e.target.value.slice(-1) === gameObj.text.charAt(textIndex)){
      setUserEntry(gameObj.text.charAt(textIndex) === " " ? "" : e.target.value)
      setTextIndex(textIndex + 1)  
    } else {
      setErrors(errors + 1)
    }
  }

  return (
    <div id="game">
      <div id="gameTextBox">
        <div id="gameText">
          <h3 className="completed title">{gameObj.level}</h3>
          <h2 className="completed title">{gameObj.title}</h2>
          <span className="completed">{completed}</span>
          <span className="uncompleted">{uncompleted}
            <div id="cursor">|</div>
          </span>
        </div>
      </div>
      <input onChange={handleEntry} value={userEntry} />
      <span> Total Errors: {errors}</span>
    </div>
  );
}
