import { getAll, getById, save } from "./http.service";

const url = `${process.env.REACT_APP_BE_URL}api/learning-path`;

export const generateLearningPath = async (data, email) => {
  const learningPath = await save(`${url}/adjust-to-knowledge/${email}`, data);
  return learningPath;
};
