import React, { useState, useEffect, useRef } from "react";

export default function Game() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [level, setLevel]           = useState(0);
  const [userEntry, setUserEntry]   = useState("");
  const [errors, setErrors]         = useState(0);
  const [gameObj, setGameObj]       = useState({
    level: "",
    title: "",
    text: ""
  });

  const startTime = useRef(new Date());
  
  const index = useRef(0);
  const textIndex = index.current

  const cursor = useRef();
  const gameBox = useRef();
  const checkIsGameOver = () => (
    cursor.current.getBoundingClientRect().top <
    gameBox.current.getBoundingClientRect().top
  );

  const completed = gameObj.text.slice(0, textIndex);
  const uncompleted = gameObj.text.slice(textIndex);

  useEffect(() => {
    fetch("http://localhost:8001/gameTexts")
      .then((res) => res.json())
      .then((data) => setGameObj(data[level]));
  }, []);

  useEffect(() => {
    let tickRate
    if(!isGameOver) {
      tickRate = setInterval(() => {
        if(checkIsGameOver()){
          clearInterval(tickRate);
          setIsGameOver(true);
        }
      }, 500);
    }
    
    return(() => {
      clearInterval(tickRate)
    });
  }, [isGameOver, gameObj])

  const handleEntry = (e) => {
    if(e.target.value.slice(-1) === gameObj.text.charAt(textIndex)){
      setUserEntry(gameObj.text.charAt(textIndex) === " " ? "" : e.target.value)
      index.current = textIndex + 1  
    } else {
      setErrors(errors + 1)
    }
  }

  const secondsSinceStart = () => (new Date().getTime() - startTime.current.getTime()) / 1000


  const display = () => {
    if(isGameOver){
       return (
         <div>
          <h1 className="completed title over">Game Over</h1>
          <h4 className="completed title">{Math.floor(secondsSinceStart())} Seconds</h4>
        </div>
       )
    } else {
       return (
        <div id="gameText">
          <h3 className="completed title">{gameObj.level}</h3>
          <h2 className="completed title">{gameObj.title}</h2>
          <span className="completed">{completed}</span>
          <span className="uncompleted">{uncompleted}
            <div id="cursor" ref={cursor}>|</div>
          </span>
        </div>
      )
    }
  }

  return (
    <div id="game">
      <div id="gameTextBox" ref={gameBox}>
        {display()}
      </div>
      <input onChange={handleEntry} value={userEntry} />
      <span> Total Errors: {errors}</span>
    </div>
  );
}
