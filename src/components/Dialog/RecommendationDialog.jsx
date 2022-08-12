import { Card, DialogActions, DialogContentText, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Auth } from "aws-amplify";
import React, { useEffect, useRef, useState } from "react";
import { getAllPreferences } from "../../service/preference.service";
import CustomButton from "../Button/CustomButton";
import DialogComponent from "./DialogComponent";
import { Description, Videocam, VolumeUp } from "@mui/icons-material";
import "./RecommendationDialog.css";
import { getRecommendations } from "../../service/recommendation";
import { MagicSpinner } from "react-spinners-kit";


const RecommendationDialog = (props) => {
  const [value, setValue] = useState();
  const model = useRef();

  const [loading, setLoading] = useState(true);

  const [firstname, setFirstname] = useState();

  const [knowledgeResults, setKnowledgeResults] = useState();
  const [recommendations, setRecommendations] = useState([]);

  const [step, setStep] = useState(1);
  const [qNo, setQNo] = useState(0);

  const [data, setData] = useState();

  const getData = async () => {
    setLoading(true)
    getRecommendations('1', knowledgeResults).then(data => {
      setRecommendations(data);
      setTimeout(() => setLoading(false), 5000);
    });  // TODO: Make userId dynamic
  };

  useEffect(() => {
    Auth.currentAuthenticatedUser().then(data => {
      setFirstname(data.attributes.given_name);
    });

    model.current.handleClickOpen();

    setKnowledgeResults({
      courseId: "1",
      lesson: "1",
      unit: "1",
      concepts: [
        {
          conceptId: "2",
          knowledge: 80,
          learningObjects: [
            "6",
            "7"
          ]
        },
        {
          conceptId: "3",
          knowledge: 80,
          learningObjects: [
            "8",
            "9"
          ]
        }
      ]
    });
  }, []);

  useEffect(() => {
    getData();
  }, [knowledgeResults]);

  const handleContinue = () => {
    setStep(step + 1);
  };

  const handleClose = () => {
    model.current.handleClose();
  };
  
  useEffect(() => {
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
        title={loading ? "Loading Recommendations..." : "Fresh Recommendations!"}
        body={
          step == 1 ? (
            <div>
              <strong>Hi, {firstname}!</strong>

              {loading ?
                <div>
                  <div className="mt-1">We are checking your current knowledge and preparing recommendations for you. Please wait...</div>
                  <div className="spinner-container">
                    <MagicSpinner color="#ff9c3f" size="96" />
                  </div>

                  <DialogActions className="mt-2">
                    <CustomButton onclick={handleClose} color="grey fit-content" name={"Cancel"}></CustomButton>
                  </DialogActions>
                </div>
                :
                <div>
                  <div className="mt-1">
                    We've found some resources that could help you get through this lesson. We suggest you go through them before continuing this lesson.
                    Click <strong>CONTINUE</strong> to view the recommendations.
                  </div>
                  <DialogActions className="mt-2">
                    <CustomButton onclick={handleContinue} color="orange fit-content" name={"Continue"}></CustomButton>
                    <CustomButton onclick={handleClose} color="grey fit-content" name={"Skip"}></CustomButton>
                  </DialogActions>
                </div>
              }
            </div>
          ) : (
            recommendations && (
              <div>
                <div className="mt-1">
                  Click <strong>ADD RECOMMENDATIONS</strong> to add these resources to your personal course curriculum.
                </div>

                {recommendations && recommendations.map(recommendation => (
                  <Card variant="outlined" className="resource-container">
                    <div className="resource-item">
                      {
                        recommendation.type === 'video' ? <Videocam /> :
                        recommendation.type === 'audio' ? <VolumeUp /> :
                        recommendation.type === 'text' ? <Description /> : ''
                      }
                      <span className="item-name">{recommendation.name}</span>
                    </div>
                  </Card>
                ))}

                <DialogActions className="mt-2">                  
                    <CustomButton onclick={handleClose} color="orange fit-content" name={"Add Recommendations"}></CustomButton>
                    <CustomButton onclick={handleClose} color="grey fit-content" name={"Cancel"}></CustomButton>
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
export default RecommendationDialog;
