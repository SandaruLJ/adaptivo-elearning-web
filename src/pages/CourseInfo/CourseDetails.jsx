import { Circle, DoneOutline } from '@mui/icons-material';
import { Card, CardContent, Container, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React from 'react';
import "./CourseDetails.css";

const CourseDetails = ({ data }) => {
  const outcomes = data["outcomes"] ? data.outcomes : [];
  const requirements = data["requirements"] ? data.requirements : [];
  const description = data["description"] ? data.description : "";

  return (
    <Container className="details-container">
      <Card variant="outlined" className="content-card">
        <CardContent>
          <Typography variant="h6" fontWeight={700}>Learning Outcomes</Typography>
          { outcomes.map((item) => (
            <ListItem>
              <ListItemIcon>
                <DoneOutline className="bulletpoint-icon" />
              </ListItemIcon>
              <ListItemText>
                {item}
              </ListItemText>
            </ListItem>
          )) }
        </CardContent>
      </Card>

      <Card variant="outlined" className="content-card">
        <CardContent>
          <Typography variant="h6" fontWeight={700}>Requirements</Typography>
          { requirements.map((requirement) => (
            <ListItem>
            <ListItemIcon>
              <Circle className="bulletpoint-icon" />
            </ListItemIcon>
            <ListItemText>
              {requirement}
            </ListItemText>
          </ListItem>
          )) }
        </CardContent>
      </Card>

      <Card variant="outlined" className="content-card">
        <CardContent>
          <Typography variant="h6" fontWeight={700}>Description</Typography>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </CardContent>
      </Card>
    </Container>
  )
}

export default CourseDetails;
