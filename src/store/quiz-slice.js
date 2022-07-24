import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
  name: "quiz",
  initialState: { selectedUnit: { section: 0, unit: 0 }, question: "", explanation: "", answers: [] },
  reducers: {
    setQuestion(state, actions) {
      state.question = actions.payload;
    },
    setExplanation(state, actions) {
      state.explanation = actions.payload;
    },
    setAnswers(state, actions) {
      state.answers = actions.payload;
    },
    // setNextUnit(state, actions) {
    //   const selectedSection = state.selectedUnit.section;
    //   const selectedUnit = state.selectedUnit.unit;
    //   const curriculum = state.curriculum;
    //   const unitLength = curriculum[selectedSection].units.length;
    //   let unit = curriculum[selectedSection].units[selectedUnit + 1];
    //   let nextSection, nextUnit;

    //   if (selectedUnit < unitLength - 1) {
    //     nextSection = selectedSection;
    //     nextUnit = selectedUnit + 1;
    //     unit = curriculum[nextSection].units[nextUnit];
    //   } else {
    //     nextSection = selectedSection + 1;
    //     nextUnit = 0;
    //     unit = curriculum[nextSection].units[nextUnit];
    //   }
    //   state.nextUnit = {
    //     section: nextSection,
    //     unit: nextUnit,
    //     unitName: unit.name,
    //   };
    // },
    // goToNextUnit(state, actions) {
    //   const selectedSection = state.selectedUnit.section;
    //   const selectedUnit = state.selectedUnit.unit;
    //   const curriculum = state.curriculum;
    //   const unitLength = curriculum[selectedSection].units.length;
    //   let unit = curriculum[selectedSection].units[selectedUnit + 1];

    //   if (selectedUnit < unitLength - 1) {
    //     state.selectedUnit = { section: selectedSection, unit: selectedUnit + 1 };
    //     unit = curriculum[selectedSection].units[selectedUnit + 1];
    //   } else {
    //     console.log("In else");
    //     unit = curriculum[selectedSection + 1].units[0];
    //     state.selectedUnit = { section: selectedSection + 1, unit: 0 };
    //   }
    //   let type = unit.type;
    //   let body;

    //   if (unit.isConceptLink) {
    //     type = "video";
    //     body = unit.loId.video.url;
    //   } else {
    //     if (type == "video") {
    //       body = unit.video.url;
    //     } else if (type == "audio") {
    //       body = unit.audio.url;
    //     } else if (type == "note") {
    //       body = unit.note;
    //     }
    //   }
    //   state.contentType = type;
    //   state.contentBody = body;
    // },
    // setContent(state, actions) {
    //   state.contentType = actions.payload.type;
    //   state.contentBody = actions.payload.body;
    // },
  },
});

export const quizActions = quizSlice.actions;

export default quizSlice;
