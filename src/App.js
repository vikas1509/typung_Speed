import React, { useState, useRef, useEffect } from "react";
import "./App.css";

// Moved the Word component outside of the App component
const Word = React.memo(({ text, active, correct }) => {
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
  });

  let className = "";
  if (correct) {
    className = "correct";
  } else if (correct === false) {
    className = "incorrect";
  } else if (active) {
    className = "active";
  }

  return <span className={className}>{text} ({renderCount.current})</span>;
});

const getCloud = () => `vikas nikhil liya niya giya piya aiya neelu 
pawan tappu suman javascript react html css grid 
flexbox selectors node js frontend backend earth
mars `.split(' ').sort(() => Math.random() > 0.5 ? 1 : -1);

function Timer(props){

  const {correctWords, startCounting} = props
  const [timeElapsed, setTimeElapsed] = useState(0);
  useEffect(()=>{
    if(startCounting){
      setInterval(()=>{

setTimeElapsed(oldTime => oldTime+1)

      }, 1000)
    }
  },[startCounting])
  const minutes = timeElapsed/60;

  return <div>
    <p>Time :{timeElapsed}</p>
    <p>speed : {(correctWords/minutes) || 0} WPM</p>
  </div>
}

const App = () => {
  const [userInput, setUserInput] = useState('');
  const cloud = useRef(getCloud());
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [correctWordArray, setCorrectWordArray] = useState([]);
const [startCounting, setStartCounting] = useState(false);

  // function processInput(value) {
  //  if(!startCounting){
  //   setStartCounting(true);
  //  }
  // //  setUserInput(value);
  //   if (value.endsWith(' ')) {
  //     const word = value.trim();
  //     const isCorrect = word === cloud.current[activeWordIndex];
  //     setCorrectWordArray(correctWordArray => {
  //       const newCorrectWordArray = [...correctWordArray];
  //       newCorrectWordArray[activeWordIndex] = isCorrect;
  //       return newCorrectWordArray;
  //     });
  //     setActiveWordIndex(activeWordIndex + 1);
  //     setUserInput('');
  //   }
  // }
  function processInput(value) {
    if (!startCounting) {
      setStartCounting(true);
    }
    setUserInput(value); // Update userInput with the current value
    if (value.endsWith(' ')) {
      const word = value.trim();
      const isCorrect = word === cloud.current[activeWordIndex];
      setCorrectWordArray(correctWordArray => {
        const newCorrectWordArray = [...correctWordArray];
        newCorrectWordArray[activeWordIndex] = isCorrect;
        return newCorrectWordArray;
      });
      setActiveWordIndex(activeWordIndex + 1);
      setUserInput(''); // Clear the input field after processing the word
    }
  }
  

  return (
    <div>
      <h1>Typing Test</h1>
      <Timer startCounting={startCounting}
      correctWords={correctWordArray.filter(Boolean).length}/>
      <p>
        {cloud.current.map((word, index) => (
          <Word
            key={index} // Added key prop for React list rendering
            text={word}
            active={index === activeWordIndex}
            correct={correctWordArray[index]}
          />
        ))}
      </p>
      <label htmlFor="typing-input">Type the words:</label>
      <input
        id="typing-input"
        type="text"
        value={userInput}
        onChange={(e) => processInput(e.target.value)}
        autoFocus
      />
    </div>
  );
};

export default App;
