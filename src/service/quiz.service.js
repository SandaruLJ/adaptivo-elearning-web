import { getAll, getById, save } from "./http.service";

const url = `${process.env.REACT_APP_BE_URL}api/quizes`;

export const addQuiz = async (data) => {
  const savedQuiz = await save(url, data);
  return savedQuiz;
};
export const getAllQuizes = async () => {
  const quizes = await getAll(url);
  return quizes;
};
export const getQuizById = async (id) => {
  const quiz = await getById(url, id);
  // console.log("quiz");
  // console.log(quiz);
  return quiz;
};
