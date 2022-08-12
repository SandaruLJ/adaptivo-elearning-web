import { save } from './http.service';

const url = `${process.env.REACT_APP_BE_URL}api/learning-path/adjust-to-knowledge/`;

export const getRecommendations = async (email, knowledge_results) => {
  return await save(`${url}${email}`, knowledge_results);
}
