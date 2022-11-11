import { Avatar, Card, CardContent, CardHeader, Tab, Tabs } from '@mui/material';
import { Auth } from 'aws-amplify';
import React, { useEffect, useState} from 'react';
import './ProfileMenu.css';


const ProfileMenu = ({ tabValue, setTabValue, avatarSrc }) => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    initials: ""
  });

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((data) => {
      setUserData({
        firstName: data.attributes.given_name,
        lastName: data.attributes.family_name,
        initials: data.attributes.given_name[0] + data.attributes.family_name[0],
      });
      console.log(data);
    });
  }, []);

  const handleTabChange = (_, newValue) => {
    setTabValue(newValue);
  }

  return (
    <Card
      className="profile-menu-container"
      sx={{ "--Card-radius": "32px" }}
    >
      <CardHeader
        avatar={
          <Avatar
            src={avatarSrc}
            sx={{ width: 96, height: 96, fontSize: 48 }}
          >
            {userData.initials}
          </Avatar>
        }
        title={`${userData.firstName} ${userData.lastName}`}
        subheader="Student"
      />

      <CardContent>
        <Tabs
          orientation="vertical"
          value={tabValue}
          onChange={handleTabChange}
        >
          <Tab label="Personal Information" id={0} />
          <Tab label="Change Password" id={1} />
          <Tab label="Learning Path" id={2} />
        </Tabs>
      </CardContent>
    </Card>
  );
}

export default ProfileMenu;
