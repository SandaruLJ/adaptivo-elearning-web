import { DialogContentText } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import DialogComponent from "./DialogComponent";

const PreferenceDialog = (props) => {
  const [value, setValue] = useState();
  const model = useRef();

  const handleOkay = () => {};
  const handleChange = (e) => {};

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
          <div>
            <strong>Hi, John!</strong>
            <div className="mt-1">
              Adaptivo aims to provide a dynamic personalized learning exerience. In order to personalize your expereience we will need to know your preferences. Can you please click 'Continue' to
              share your preferences with us. So that you will be gaining a personalized learning experience
            </div>
          </div>
        }
        handleOkay={handleOkay}
        okayText={"Continue"}
        cancelText={"Skip"}
        borderedButton={true}
      />
    </>
  );
};
export default PreferenceDialog;
