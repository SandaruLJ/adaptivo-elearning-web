import { getAll, save } from "./http.service";

const url = `${process.env.REACT_APP_BE_URL}api/activity`;

export const addActivity = async (data) => {
  const savedActivity = await save(url, data);
  return savedActivity;
};
export const getAllActivity = async () => {
  const activity = await getAll(url);
  return activity;
};
