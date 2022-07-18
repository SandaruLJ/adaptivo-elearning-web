import { DialogActions, DialogContentText, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { getAllPreferences } from "../../service/preference.service";
import CustomButton from "../Button/CustomButton";

import DialogComponent from "./DialogComponent";

const PreferenceDialog = (props) => {
  const [value, setValue] = useState();
  const model = useRef();
  const [step, setStep] = useState(1);
  const [qNo, setQNo] = useState(0);

  const [data, setData] = useState();

  const getData = async () => {
    const response = await getAllPreferences();
    console.log(response);
    setData(response);
  };

  useEffect(() => {
    getData();
  }, []);
  const handleContinue = () => {
    setStep(step + 1);
  };
  const handleNext = () => {
    if (qNo < data.length - 1) {
      setQNo(qNo + 1);
    }
  };
  const handlePrevious = () => {
    if (qNo != 0) {
      setQNo(qNo - 1);
    }
  };
  const handleClose = () => {
    model.current.handleClose();
  };
  const handleFinish = () => {
    model.current.handleClose();
  };
  const handleChange = () => {};

  useEffect(() => {
    model.current.handleClickOpen();
  }, []);
  return (
    <>
      {/* <CustomButton
        name="Link Concept"
        color="light-orange"
        onclick={() => {
          model.current.handleClickOpen();
        }}
      /> */}

      <DialogComponent
        ref={model}
        title={"Welcome to Adaptivo!"}
        body={
          step == 1 ? (
            <div>
              <strong>Hi, John!</strong>
              <div className="mt-1">
                Adaptivo aims to provide a dynamic personalized learning exerience. In order to personalize your expereience we will need to know your preferences. Can you please click 'Continue' to
                share your preferences with us. So that you will be gaining a personalized learning experience
              </div>
              <DialogActions className="mt-2">
                <CustomButton onclick={handleContinue} color="orange fit-content" name={"Continue"}></CustomButton>
                <CustomButton onclick={handleClose} color="grey fit-content" name={"Skip"}></CustomButton>
              </DialogActions>
            </div>
          ) : (
            data && (
              <div>
                <div className="preference-question">{`${qNo + 1}. ${data[qNo].question}`}</div>
                <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group" name="controlled-radio-buttons-group" value={value} onChange={handleChange}>
                  {data[qNo].answers.map((answer) => {
                    return <FormControlLabel value={answer.answer} control={<Radio size="small" />} label={answer.answer} />;
                  })}
                </RadioGroup>

                <DialogActions className="mt-2">
                  {qNo != 0 && <CustomButton onclick={handlePrevious} color="grey fit-content" name={"Previous"}></CustomButton>}

                  {qNo == data.length - 1 ? (
                    <CustomButton onclick={handleFinish} color="orange fit-content" name={"Finish"}></CustomButton>
                  ) : (
                    <CustomButton onclick={handleNext} color="orange fit-content" name={"Next"}></CustomButton>
                  )}
                </DialogActions>
              </div>
            )
          )
        }
        displayActionButtons={false}
      />
    </>
  );
};
export default PreferenceDialog;
