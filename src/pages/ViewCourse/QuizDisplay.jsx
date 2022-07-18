import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from "@mui/material";
import { Interweave } from "interweave";
import React, { useEffect, useState } from "react";
import CustomButton from "../../components/Button/CustomButton";

const QuizDisplay = (props) => {
  return (
    <div className="quiz-container">
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">How familiar are you with Force?</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          // defaultValue="female"
          name="radio-buttons-group"
        >
          <FormControlLabel value="neverHeard" control={<Radio />} label="I have never heard of it" />
          <FormControlLabel value="" control={<Radio />} label="I have heard of it, but don't know what is it" />
          <FormControlLabel value="" control={<Radio />} label="I have some idea of it, but it's not very clear" />
          <FormControlLabel value="" control={<Radio />} label="I know what is it and could explain what it's used for" />
          <FormControlLabel value="" control={<Radio />} label="I know what it is and when to use it, and I could use it to analyze data" />
        </RadioGroup>
      </FormControl>
      <div className="quiz-action-btns">
        <Grid container justifyContent="space-between" className="mt-2">
          <Grid item>
            <CustomButton name="Previous" color="grey" type="cancel" />
          </Grid>
          <Grid item>
            <CustomButton name="Next" color="orange" type="submit" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default QuizDisplay;
