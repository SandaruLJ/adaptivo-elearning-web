import { save } from "./http.service";

const url = `${process.env.REACT_APP_BE_URL}api/quiz-selection`;

export const getNextQuestion = async (data) => {
  const nextQuestion = await save(url, data);
  return nextQuestion;
};
