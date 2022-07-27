import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Button } from "@mui/material";
import { Interweave } from "interweave";
import React, { useEffect, useState } from "react";
import "./ViewCourse.css";
import { getQuizById } from "../../service/quiz.service";
import { useDispatch, useSelector } from "react-redux";
import { quizActions } from "../../store/quiz-slice";
import {CustomButton} from "../../components/Button/CustomButton"
import CustomAccordion from "../../components/Accordion/Accordion";
import CustomTab from "../../components/Tab/CustomTab";
import "./QuizDisplay.css";
import Box from '@mui/material/Box'
import QuizStart from "./QuizStart";

const QuizDisplay = () => {
  const [data, setData] = useState();
  // const [overlay, setOverlay] = useState();
  const dispatch = useDispatch();
  const selectedUnit = useSelector((state) => state.course.selectedUnit);
  const quiz = useSelector((state) => state.course.curriculum[selectedUnit.section]["units"][selectedUnit.unit]['quiz']);
  console.log("Quiz")
  console.log(selectedUnit)
  console.log(quiz)

  // const body = useSelector((state) => state.course.contentBody);
  // const { Track, trackEvent } = useTracking({ page: "QuizDiaplay" });


// const getData = async () => {
//   //Fetches the data from the db
//   const response = await getQuizById("625a9f51a51d00f5ef8d15c7");
//   console.log(response);
//   setData(response);
//   dispatch(quizActions.setQuestion(response.question));
//   dispatch(quizActions.setAnswers(response.answers));
//   // 
// };
// dispatch(courseActions.setCurriculum([...response.curriculum]));
  // dispatch(courseActions.setSelectedUnit({ section: 0, unit: 0 }));
  // dispatch(courseActions.setNextUnit());
// useEffect(() => {
//   getData();
// }, []);

  return (
    <div className="quiz_container">

    

<Button variant="outlined" className="button-cancel">Cancel</Button>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label"> {
  <Box component="div" fontSize={30}>
    <Interweave content=
     {quiz[0].question} />
   </Box>
}</FormLabel>
       
        <br></br>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          // defaultValue="female"
          name="radio-buttons-group"
        >
          <FormControlLabel  value="e" control={<Radio />} label={
             <Box component="div" fontSize={20}>
              <Interweave content=
                {quiz[0].answers[0]} />
              </Box>
} />
          <FormControlLabel  value="a" control={<Radio />} label={
             <Box component="div" fontSize={20}>
              <Interweave content=
                {quiz[0].answers[1]} />
              </Box>
} />
          <FormControlLabel  value="b" control={<Radio />} label={
             <Box component="div" fontSize={20}>
              <Interweave content=
                {quiz[0].answers[2]} />
              </Box>
} />
          <FormControlLabel  value="c" control={<Radio />} label={
             <Box component="div" fontSize={20}>
              <Interweave content=
                {quiz[0].answers[3]} />
              </Box>
} />
          <FormControlLabel  value="d" control={<Radio />} label={
             <Box component="div" fontSize={20}>
              <Interweave content=
                {quiz[0].answers[4]} />
              </Box>
} />
        </RadioGroup>

        

       

      </FormControl>

      <Button className="button-next" variant="contained">next</Button>
       

    </div>
    

    
  );

}
export default QuizDisplay;
