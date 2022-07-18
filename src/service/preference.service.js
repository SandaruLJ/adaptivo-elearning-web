import { getAll, save } from "./http.service";

const url = `${process.env.REACT_APP_BE_URL}api/preferences`;

export const getAllPreferences = async () => {
  const Preference = await getAll(url);
  return Preference;
};
