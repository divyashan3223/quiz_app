// git quiz app

import React, { useRef, useState, useEffect } from "react";
import "./quiz.css";
import { data } from "../../assets/data";

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[0]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);
  let Open_array = [Option1, Option2, Option3, Option4];

  useEffect(() => {
    setQuestion(data[index]);
    Open_array.forEach((option) => {
      if (option.current) {
        option.current.classList.remove("correct", "incorrect");
      }
    });
  }, [index]);

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("incorrect");
        Open_array[question.ans - 1].current.classList.add("correct");
      }
      setLock(true);
    }
  };

  const next = () => {
    if (lock) {
      setIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        if (newIndex < data.length) {
          return newIndex;
        } else {
          alert(`Quiz completed! Your score: ${score}/${data.length}`);
          return prevIndex;
        }
      });
      setLock(false);
    }
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <br />
      <h2>
        {index + 1}.{question.question}
      </h2>
      <ul>
        <li ref={Option1} onClick={(e) => checkAns(e, 1)}>
          {question.option1}
        </li>
        <li ref={Option2} onClick={(e) => checkAns(e, 2)}>
          {question.option2}
        </li>
        <li ref={Option3} onClick={(e) => checkAns(e, 3)}>
          {question.option3}
        </li>
        <li ref={Option4} onClick={(e) => checkAns(e, 4)}>
          {question.option4}
        </li>
      </ul>
      <div className="btn_container">
        <button onClick={next} className="button">
          Next
        </button>
        <div className="index">
          {index + 1} of {data.length} questions
        </div>
        <div className="score">
          Score: {score} / {data.length}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
