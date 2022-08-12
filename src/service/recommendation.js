import { save } from './http.service';

const url = `${process.env.REACT_APP_BE_URL}api/learning-path/recommendations/`;

export const getRecommendations = async (userId, knowledge_results) => {
  return await save(`${url}${userId}`, knowledge_results);
}
