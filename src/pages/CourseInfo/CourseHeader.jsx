import { Language } from "@mui/icons-material";
import { Card, Button, CardActions, CardContent, CardMedia, Container, Rating, Typography } from "@mui/material";
import { VideoCard } from "material-ui-player";
import React, { useEffect } from "react";
import CourseInfoAccordion from "../../components/CourseInfoAccordion/CourseInfoAccordion";
import "./CourseHeader.css";

const CourseHeader = ({ data }) => {
  data.subtitle = "Learn math the easy way!";
  const rating = 4.5;
  const enrolled = 13;
  const instructor = "John Doe";
  const preview = data["trailer"] ? data.trailer.url : "";

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Container className="course-header-container">
      <div className="info-wrapper">
        <Typography variant="h4" className="text title">
          {data.title}
        </Typography>
        <Typography variant="subtitle1" className="text subtitle">
          {data.subtitle}
        </Typography>

        <div className="rating-enrolled-wrapper">
          <Rating value={rating} precision={0.5} readOnly className="rating" />
          <Typography variant="string" className="text enrolled">
            {enrolled} enrolled
          </Typography>
        </div>

        <Typography variant="string" fontSize={15} className="text instructor">
          Instructor: {instructor}
        </Typography>

        <div className="language-wrapper">
          <Language htmlColor="white" />
          <Typography variant="string" className="text language-text">
            {data.language}
          </Typography>
        </div>
      </div>

      <div className="preview-wrapper">
        <Card>
          <CardMedia component="video" controls src={preview} alt="Course Preview" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <span className="currency">{data.currency}</span> {data.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              You can preview the course here before purchasing.
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" size="large" fullWidth>
              <span>
                Buy ( <span className="currency">{data.currency}</span> {data.price} )
              </span>
            </Button>
            <Button variant="contained" color="secondary" size="large" fullWidth>
              Try Course
            </Button>
          </CardActions>
        </Card>
        <Typography variant="h6" fontWeight={700} className="curriculum-heading">
          Curriculum
        </Typography>
        <div className="curriculum-accordion">{data.hasOwnProperty("curriculum") && <CourseInfoAccordion curriculum={data.curriculum} />}</div>
      </div>
    </Container>
  );
};

export default CourseHeader;
