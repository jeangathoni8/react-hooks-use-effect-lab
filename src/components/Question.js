import React, { useState, useEffect } from "react";
// Question component

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect (() => {
    //if the timer reaches 0, reset it and call onAnswered(false)
    if (timeRemaining === 0) {
      setTimeRemaining(10);
      onAnswered(false);
      return; //Prevent setting up a new timeout if time ran out
    }

    //Set up a timeout to decrease the timer every second
    const timer = setTimeout(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000);
    //Cleanup function to clear the timeout if the component unmounts or updates
    return () => clearTimeout(timer);
  }, [timeRemaining, onAnswered]); //Add onAnswered to the dependency array
  

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
