import React, { useEffect, useState } from "react";
import "./QuizDisplay.css";
import { useDispatch, useSelector } from "react-redux";
// import "./ViewCourse.css";
import { Button } from "@mui/material";

const QuizStart = () => {
    const [data, setData] = useState();
    // const [overlay, setOverlay] = useState();
    const dispatch = useDispatch();
    const selectedUnit = useSelector((state) => state.course.selectedUnit);
    const quiz = useSelector((state) => state.course.curriculum[selectedUnit.section]["units"][selectedUnit.unit]['quiz']);
    console.log("Quiz")
    console.log(selectedUnit)
    console.log(quiz)
  
    return (
        <div className="quiz_start">
            <div className="title">
            <h1>Section Quiz</h1>
            </div>

            <div className="subTitle">
            <h2>Quiz No &nbsp;| &nbsp; 5 questions</h2>
                </div>           
          
         

            <Button variant="contained" size="large">Start</Button>&nbsp;&nbsp;&nbsp;
            <Button variant="text" size="large">Skip</Button>
            </div>
    
    );
 
}

export default QuizStart;