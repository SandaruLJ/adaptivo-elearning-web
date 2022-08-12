import { getAll, getById, save } from "./http.service";

const url = `${process.env.REACT_APP_BE_URL}api/learningStyles`;

export const analyzePreferences = async (data) => {
  const learningStyle = await save(`${url}/onboarding`, data);
  return learningStyle;
};
export const getLearningStylesByUser = async (email) => {
  const learningStyle = await getById(`${url}/user`, email);
  return learningStyle;
};
