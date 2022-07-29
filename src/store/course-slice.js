import { createSlice } from "@reduxjs/toolkit";
import { markComplete, markDuration, setCurrentUnit } from "../service/usercourse.service";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    selectedUnit: { section: 0, unit: 0 },
    courseName: "",
    curriculum: [],
    contentType: "",
    contentBody: "",
    contentDuration: 0,
    nextUnit: { section: 0, unit: 1, unitName: "" },
    previousUnit: { section: 0, unit: 0 },
    id: "",
    progress: "",
  },
  reducers: {
    setSelectedUnit(state, actions) {
      state.selectedUnit = actions.payload;
    },
    setCourseName(state, actions) {
      state.courseName = actions.payload;
    },
    setCurriculum(state, actions) {
      state.curriculum = actions.payload;
    },
    setId(state, actions) {
      state.id = actions.payload;
    },
    setProgress(state, actions) {
      state.progress = actions.payload;
    },
    setNextUnit(state, actions) {
      const selectedSection = state.selectedUnit.section;
      const selectedUnit = state.selectedUnit.unit;

      const curriculum = state.curriculum;
      const unitLength = curriculum[selectedSection].units.length;
      let unit = curriculum[selectedSection].units[selectedUnit + 1];
      let nextSection, nextUnit;

      if (selectedUnit < unitLength - 1) {
        nextSection = selectedSection;
        nextUnit = selectedUnit + 1;
        unit = curriculum[nextSection].units[nextUnit];
      } else {
        nextSection = selectedSection + 1;
        nextUnit = 0;
        unit = curriculum[nextSection].units[nextUnit];
      }
      state.nextUnit = {
        section: nextSection,
        unit: nextUnit,
        unitName: unit.name,
      };
    },
    markComplete(state, actions) {
      const selectedSection = state.selectedUnit.section;
      const selectedUnit = state.selectedUnit.unit;
      const curriculum = state.curriculum;
      curriculum[selectedSection].units[selectedUnit].isCompleted = true;

      const completeRequest = {
        _id: state.id,
        sectionCount: selectedSection,
        unitCount: selectedUnit,
        isCompleted: true,
      };
      state.curriculum = curriculum;

      markComplete(completeRequest);
    },
    markVideoDuration(state, actions) {
      let selectedSection, selectedUnit;
      if (actions.payload.hasOwnProperty("section")) {
        selectedSection = actions.payload.section;
        selectedUnit = actions.payload.unit;
      } else {
        selectedSection = state.selectedUnit.section;
        selectedUnit = state.selectedUnit.unit;
      }

      const curriculum = state.curriculum;
      curriculum[selectedSection].units[selectedUnit].duration = actions.payload.duration;

      state.contentDuration = actions.payload.duration;

      const completeRequest = {
        _id: state.id,
        sectionCount: selectedSection,
        unitCount: selectedUnit,
        duration: actions.payload.duration,
      };
      state.curriculum = curriculum;

      markDuration(completeRequest);
    },
    goToNextUnit(state, actions) {
      const selectedSection = state.selectedUnit.section;
      const selectedUnit = state.selectedUnit.unit;
      const curriculum = state.curriculum;

      state.previousUnit = {
        section: selectedSection,
        unit: selectedUnit,
      };

      const unitLength = curriculum[selectedSection].units.length;
      let unit = curriculum[selectedSection].units[selectedUnit + 1];
      let temp;

      if (selectedUnit < unitLength - 1) {
        state.selectedUnit = { section: selectedSection, unit: selectedUnit + 1 };
        temp = { section: selectedSection, unit: selectedUnit + 1 };
        unit = curriculum[selectedSection].units[selectedUnit + 1];
      } else {
        unit = curriculum[selectedSection + 1].units[0];
        state.selectedUnit = { section: selectedSection + 1, unit: 0 };
        temp = { section: selectedSection + 1, unit: 0 };
      }
      let type = unit.type;
      let body;

      if (unit.isConceptLink) {
        type = "video";
        body = unit.loId.video.url;
      } else {
        if (type == "video") {
          body = unit.video.url;
        } else if (type == "audio") {
          body = unit.audio.url;
        } else if (type == "note") {
          body = unit.note;
        }
      }
      state.contentType = type;
      state.contentBody = body;
      state.contentDuration = unit.duration;
    },
    setContent(state, actions) {
      state.contentType = actions.payload.type;
      state.contentBody = actions.payload.body;
      state.contentDuration = actions.payload.duration;
    },
  },
});

export const courseActions = courseSlice.actions;

export default courseSlice;
