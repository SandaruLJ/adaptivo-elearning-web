import { getAll, save } from "./http.service";

const url = `${process.env.REACT_APP_BE_URL}api/learningStyles`;

export const analyzePreferences = async (data) => {
  const learningStyle = await save(`${url}/onboarding`, data);
  return learningStyle;
};
