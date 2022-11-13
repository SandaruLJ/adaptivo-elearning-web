import { Close } from "@mui/icons-material";
import { DialogActions, DialogContentText, FormControlLabel, Grid, Radio, RadioGroup } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { analyzePreferences } from "../../service/learningStyles.service";
import { getAllPreferences } from "../../service/preference.service";
import CustomButton from "../Button/CustomButton";

import DialogComponent from "./DialogComponent";
import { Auth } from "aws-amplify";

const PreferenceDialog = (props) => {
  const [value, setValue] = useState();
  const model = useRef();
  const [step, setStep] = useState(1);
  const [qNo, setQNo] = useState(0);
  const [answers, setAnswers] = useState(Array(8).fill(4));
  const [user, setUser] = useState();
  // const user = useSelector((state) => state.auth.user);

  const [data, setData] = useState();

  const getData = async () => {
    const response = await getAllPreferences();
    console.log(response);
    setData(response);
  };

  useEffect(() => {
    getData();
    console.log(user);
    Auth.currentAuthenticatedUser().then((data) => {
      setUser(data.attributes);
    });
  }, []);
  const handleContinue = () => {
    setStep(step + 1);
  };
  const handleNext = () => {
    if (qNo < data.length - 1) {
      setQNo(qNo + 1);
    }
    setStep(step + 1);
  };
  const handlePrevious = () => {
    if (qNo != 0) {
      setQNo(qNo - 1);
      setStep(step - 1);
    }
  };
  const handleClose = () => {
    model.current.handleClose();
  };
  const handleFinish = () => {
    model.current.handleClose();
    const request = {
      email: user.email,
      answers: answers,
    };
    console.log(request);
    // analyzePreferences(request);
  };
  const handleChange = (qNo, e) => {
    const temp = answers;
    temp[qNo] = e.target.value;
    setAnswers(temp);
  };

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
          <div className="preference-dialog">
            <div className="close-icon" onClick={handleClose}>
              <Close />
            </div>
            <Grid container alignItems={"center"}>
              <Grid item md={7}>
                {step == 1 ? (
                  <div>
                    <div className="welcome-txt">WELCOME</div>
                    <div className="quick-tour-start-txt">Let's start with a quick onboarding tour</div>
                    <div className="quick-start-caption">We'll have you up and running in no time</div>
                    <div className="mt-3">
                      <Grid container spacing={2}>
                        <Grid item>
                          <CustomButton onclick={handleContinue} color="orange fit-content rounded" name={"Get Started"}></CustomButton>
                        </Grid>
                        <Grid item>
                          <CustomButton onclick={handleClose} color="grey fit-content rounded" name={"Skip for now"}></CustomButton>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                ) : step == 2 ? (
                  <div className="preference-data-container">
                    <div className="welcome-txt">Hi {user && user.given_name},</div>
                    {/* <div className="quick-tour-start-txt">Let's start with a quick onboarding tour</div> */}
                    <div className="quick-start-caption mt-2">
                      Adaptivo aims to provide a dynamic personalized learning exerience. In order to personalize your expereience we will need to know your preferences. Can you please click
                      <strong> 'Continue'</strong> to share your preferences with us. So that you will be gaining a personalized learning experience
                    </div>
                    <div className="mt-3">
                      <Grid container spacing={2}>
                        <Grid item>
                          <CustomButton onclick={handleContinue} color="orange fit-content rounded" name={"Continue"}></CustomButton>
                        </Grid>
                        <Grid item>
                          <CustomButton onclick={handleClose} color="grey fit-content rounded" name={"Exit"}></CustomButton>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                ) : step == data.length + 3 ? (
                  <div className="preference-data-container">
                    <div className="welcome-txt">Adaptivo</div>
                    <div className="quick-tour-start-txt">Thank you for your time !</div>
                    <div className="quick-start-caption">Now you can start enjoy learning!</div>
                    <div className="mt-3">
                      <CustomButton onclick={handleFinish} color="orange fit-content " name={"Start Learning"}></CustomButton>

                      {/* <Grid container spacing={2}>
                        <Grid item>
                          <CustomButton onclick={handleFinish} color="orange fit-content " name={"Start Learning"}></CustomButton>
                        </Grid>
                        <Grid item>
                          <CustomButton onclick={handleClose} color="grey fit-content rounded" name={"Exit"}></CustomButton>
                        </Grid>
                      </Grid> */}
                    </div>
                  </div>
                ) : (
                  data && (
                    <div className="preference-data-container">
                      <div className="preference-question">{`${qNo + 1}. ${data[qNo].question}`}</div>
                      <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group" name="controlled-radio-buttons-group" value={value} onChange={(e) => handleChange(qNo, e)}>
                        {data[qNo].answers.map((answer) => {
                          return <FormControlLabel value={answer.answer} control={<Radio size="small" />} label={answer.answer} />;
                        })}
                      </RadioGroup>
                      <Grid container spacing={2} className="preference-dialog-btn-container" justifyContent={"flex-end"}>
                        <Grid item>{qNo != 0 && <CustomButton onclick={handlePrevious} color="grey fit-content" name={"Previous"}></CustomButton>}</Grid>
                        <Grid item>
                          {qNo == data.length - 1 ? (
                            <CustomButton onclick={handleNext} color="orange fit-content" name={"Finish"}></CustomButton>
                          ) : (
                            <CustomButton onclick={handleNext} color="orange fit-content" name={"Next"}></CustomButton>
                          )}
                        </Grid>
                      </Grid>
                      {/* <DialogActions className="mt-2">
                        {qNo != 0 && <CustomButton onclick={handlePrevious} color="grey fit-content" name={"Previous"}></CustomButton>}

                        {qNo == data.length - 1 ? (
                          <CustomButton onclick={handleFinish} color="orange fit-content" name={"Finish"}></CustomButton>
                        ) : (
                          <CustomButton onclick={handleNext} color="orange fit-content" name={"Next"}></CustomButton>
                        )}
                      </DialogActions> */}
                    </div>
                  )
                )}
              </Grid>
              <Grid item md={5}>
                {step == 1 ? (
                  <img src="/images/onboarding-1.jpg" className="onboarding-image-1" />
                ) : step == 2 ? (
                  <img src="/images/onboarding-2.png" className="onboarding-image-1" />
                ) : (
                  <img src="/images/onboarding-1.jpg" className="onboarding-image-1" />
                )}
              </Grid>
            </Grid>
            {data && (
              <div className="progress-circle-container">
                {Array(data.length + 3)
                  .fill(1)
                  .map((x, y) => (
                    <div className={`progress-circle ${y + 1 == step ? "selected" : ""}`}></div>
                  ))}
              </div>
            )}

            {/* <strong>Hi, John!</strong>
              <div className="mt-1">
                Adaptivo aims to provide a dynamic personalized learning exerience. In order to personalize your expereience we will need to know your preferences. Can you please click 'Continue' to
                share your preferences with us. So that you will be gaining a personalized learning experience
              </div> */}
            {/* <DialogActions className="mt-2">
                <CustomButton onclick={handleContinue} color="orange fit-content" name={"Continue"}></CustomButton>
                <CustomButton onclick={handleClose} color="grey fit-content" name={"Skip"}></CustomButton>
              </DialogActions> */}
          </div>
          //   ) : (
          //     data && (
          //       <div>
          //         <div className="preference-question">{`${qNo + 1}. ${data[qNo].question}`}</div>
          //         <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group" name="controlled-radio-buttons-group" value={value} onChange={handleChange}>
          //           {data[qNo].answers.map((answer) => {
          //             return <FormControlLabel value={answer.answer} control={<Radio size="small" />} label={answer.answer} />;
          //           })}
          //         </RadioGroup>

          //         <DialogActions className="mt-2">
          //           {qNo != 0 && <CustomButton onclick={handlePrevious} color="grey fit-content" name={"Previous"}></CustomButton>}

          //           {qNo == data.length - 1 ? (
          //             <CustomButton onclick={handleFinish} color="orange fit-content" name={"Finish"}></CustomButton>
          //           ) : (
          //             <CustomButton onclick={handleNext} color="orange fit-content" name={"Next"}></CustomButton>
          //           )}
          //         </DialogActions>
          //       </div>
          //     )
          //   )
        }
        displayActionButtons={false}
        displayTitle={false}
      />
    </>
  );
};
export default PreferenceDialog;
