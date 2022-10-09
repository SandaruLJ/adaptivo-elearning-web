import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TopBar from '../../components/TopBar/TopBar';
import { getCourseById } from '../../service/course.service';
import CourseDetails from './CourseDetails';
import CourseHeader from './CourseHeader';
import './CourseInfo.css';

const CourseInfo = (props) => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState({});
  
  useEffect(async () => {
    setCourseData(await getCourseById(id));
  }, []);

  return (
    <>
      <TopBar signOut={props.signOut} />
      <CourseHeader data={courseData} />
      <div className="course-info-body">
        <CourseDetails data={courseData} />
      </div>
    </>
  )
}

export default CourseInfo;