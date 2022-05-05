import { getAll, getById, save } from "./http.service";

const url = `${process.env.REACT_APP_BE_URL}api/courses`;

export const addCourse = async (data) => {
  const savedCourse = await save(url, data);
  return savedCourse;
};
export const getAllCourses = async () => {
  const courses = await getAll(url);
  return courses;
};
export const getCourseById = async (id) => {
  const course = await getById(url, id);
  // console.log("Course");
  // console.log(course);
  return course;
};
