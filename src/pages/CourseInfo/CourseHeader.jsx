import { Language } from '@mui/icons-material';
import { Card, Button, CardActions, CardContent, CardMedia, Container, Rating, Typography } from '@mui/material';
import { VideoCard } from 'material-ui-player';
import React from 'react';
import "./CourseHeader.css";

const CourseHeader = ({ data }) => {
  data.subtitle = "Learn math the easy way!";
  const rating = 4.5;
  const enrolled = 13;
  const instructor = "John Doe";
  const preview = data["trailer"] ? data.trailer.url : "";

  return (
    <Container className="course-header-container">
      <div className="info-wrapper">
        <Typography variant="h4" className="text title">{data.title}</Typography>
        <Typography variant="subtitle1" className="text subtitle">{data.subtitle}</Typography>
        
        <div className="rating-enrolled-wrapper">
          <Rating
            value={rating}
            precision={0.5}
            readOnly
            className="rating"
          />
          <Typography variant="string"  className="text enrolled">{enrolled} enrolled</Typography>
        </div>

        <Typography variant="string" fontSize={15} className="text instructor">Instructor: {instructor}</Typography>

        <div className="language-wrapper">
          <Language htmlColor="white" />
          <Typography variant="string" className="text language-text">{data.language}</Typography>
        </div>
      </div>

      <Card sx={{ maxWidth: 345 }} className="preview-wrapper">
        <CardMedia
          component="video"
          controls
          src={preview}
          alt="Course Preview"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <span className="currency">{data.currency}</span> {data.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            You can preview the course here before purchasing.
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" size="small">Buy</Button>
          <Button size="small">Share</Button>
        </CardActions>
      </Card>

    </Container>
  )
}

export default CourseHeader;
