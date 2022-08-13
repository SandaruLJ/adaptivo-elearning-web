import { Card, DialogActions } from "@mui/material";
import { Auth } from "aws-amplify";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../Button/CustomButton";
import DialogComponent from "./DialogComponent";
import { Description, Quiz, Videocam } from "@mui/icons-material";
import "./RecommendationDialog.css";
import { getRecommendations } from "../../service/recommendation";
import { MagicSpinner } from "react-spinners-kit";
import { courseActions } from "../../store/course-slice";
import { updateCurriculum } from "../../service/usercourse.service";

const RecommendationDialog = (props) => {
  const model = useRef();

  const [loading, setLoading] = useState(true);

  const [firstname, setFirstname] = useState();
  const [email, setEmail] = useState();

  const [knowledgeResults, setKnowledgeResults] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const [step, setStep] = useState(1);

  const [firstOneWrong, setFirstOneWrong] = useState(false);

  const dispatch = useDispatch();

  const course = useSelector((state) => state.course);
  const curriculum = useSelector((state) => state.course.curriculum);
  const selectedUnitPosition = useSelector((state) => state.course.selectedUnit);

  const getData = async () => {
    setLoading(true);
    getRecommendations(email, knowledgeResults).then((data) => {
      if (data && data["units"]) {
        setRecommendations(data.units);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((data) => {
      setFirstname(data.attributes.given_name);
      setEmail(data.attributes.email);
    });

    model.current.handleClickOpen();

    if (props.knowledgeResults.length !== 0) {
      if (props.knowledgeResults.length === 1) {
        setFirstOneWrong(true);
      }
      props.knowledgeResults.shift();
    }

    setKnowledgeResults(props.knowledgeResults);
  }, []);

  useEffect(() => {
    if (knowledgeResults.length !== 0 && email) {
      getData();
    }

    if (knowledgeResults.length === 0) {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    }
  }, [knowledgeResults, email]);

  const handleContinue = () => {
    setStep(step + 1);
  };

  const handleClose = () => {
    model.current.handleClose();
  };

  const handleAddRecommendations = () => {
    let adaptedCurriculum = JSON.parse(JSON.stringify(curriculum));

    let units = curriculum[selectedUnitPosition.section]["units"];

    let previous = units.slice(0, selectedUnitPosition.unit + 1);
    let next = units.slice(selectedUnitPosition.unit + 1);

    const adaptedUnits = previous.concat(recommendations, next);

    adaptedCurriculum[selectedUnitPosition.section]["units"] = adaptedUnits;

    dispatch(courseActions.setCurriculum(adaptedCurriculum));

    model.current.handleClose();

    let updatedCurriculum = [];

    adaptedCurriculum.forEach((section, sectionIndex) => {
      let updatedSection = JSON.parse(JSON.stringify(section));
      section.units.forEach((unit, unitIndex) => {
        let updatedUnit = JSON.parse(JSON.stringify(unit));

        if (unit.type != "quiz") {
          updatedUnit[unit.type] = typeof unit[unit.type] === "object" ? unit[unit.type]._id : unit[unit.type];
        }

        let updatedQuestions = [];
        if (unit.quiz && unit.quiz.questions) {
          unit.quiz.questions.forEach((question) => {
            updatedQuestions.push(question._id);
          });

          updatedUnit.quiz.questions = updatedQuestions;
          console.log("updated unit");
          console.log(updatedUnit);
        }

        updatedSection.units[unitIndex] = updatedUnit;
      });
      updatedCurriculum[sectionIndex] = updatedSection;
    });

    console.log(updatedCurriculum);
    updateCurriculum(course.id, { learningPath: updatedCurriculum });
  };

  useEffect(() => {}, []);

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
        title={loading ? "Loading Recommendations..." : "Recommendations"}
        body={
          step == 1 ? (
            <div>
              <strong>Hi, {firstname}!</strong>

              {loading ? (
                <div>
                  <div className="mt-1">We are checking your current knowledge and preparing recommendations for you. Please wait...</div>
                  <div className="spinner-container">
                    <MagicSpinner color="#ff9c3f" size="96" />
                  </div>

                  <DialogActions className="mt-2">
                    <CustomButton onclick={handleClose} color="grey fit-content" name={"Cancel"}></CustomButton>
                  </DialogActions>
                </div>
              ) : (
                <div>
                  <div className="mt-1">
                    {recommendations.length !== 0 ? (
                      <div>
                        We've found some resources that could help you get through this lesson. We suggest you go through them before continuing this lesson. Click <strong>CONTINUE</strong> to view
                        the recommendations.
                      </div>
                    ) : firstOneWrong ? (
                      <div>
                        Your knowledge is sufficient to continue learning "{course.curriculum[selectedUnitPosition.section].name}". Click <strong>CONTINUE</strong> to keep learning.
                      </div>
                    ) : (
                      <div>
                        You have sufficient knowledge on "{course.curriculum[selectedUnitPosition.section].name}"! You can <strong>SKIP</strong> to the next section, or continue learning.
                      </div>
                    )}
                  </div>
                  <DialogActions className="mt-2">
                    {recommendations.length !== 0 ? (
                      <>
                        <CustomButton onclick={handleContinue} color="orange fit-content" name={"Continue"}></CustomButton>
                        <CustomButton onclick={handleClose} color="grey fit-content" name={"Skip"}></CustomButton>
                      </>
                    ) : firstOneWrong ? (
                      <CustomButton onclick={handleClose} color="orange fit-content" name={"Continue"}></CustomButton>
                    ) : (
                      <CustomButton onclick={handleClose} color="orange fit-content" name={"Got It"}></CustomButton>
                    )}
                  </DialogActions>
                </div>
              )}
            </div>
          ) : (
            recommendations && (
              <div>
                <div className="mt-1">
                  Click <strong>ADD RECOMMENDATIONS</strong> to add these resources to your personal course curriculum.
                </div>

                {recommendations &&
                  recommendations.map((recommendation) => (
                    <Card variant="outlined" className="resource-container">
                      <div className="resource-item">
                        {recommendation.type === "video" || recommendation.type === "additionalVideo" || recommendation.type === "realExampleVideo" ? (
                          <Videocam />
                        ) : recommendation.type === "quiz" ? (
                          <Quiz />
                        ) : (
                          <Description />
                        )}
                        <span className="item-name">{recommendation.name}</span>
                      </div>
                    </Card>
                  ))}

                <DialogActions className="mt-2">
                  <CustomButton onclick={handleAddRecommendations} color="orange fit-content" name={"Add Recommendations"}></CustomButton>
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
