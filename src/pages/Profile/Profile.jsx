import { TabContext, TabPanel } from '@mui/lab';
import { Grid } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import TopBar from '../../components/TopBar/TopBar';
import ChangePassword from './ChangePassword';
import PersonalInformation from './PersonalInformation';
import './Profile.css';
import ProfileMenu from './ProfileMenu';


const Profile = (props) => {
  const [tabValue, setTabValue] = useState(0);

  return (
    <>
      <TopBar signOut={props.signOut} />
      <Grid
        container
        className="profile-container"
        spacing={4}
        direction="row"
        justifyContent="space-around"
      >
        <Grid item md={4}>
          <ProfileMenu tabValue={tabValue} setTabValue={setTabValue} />
        </Grid>
        <Grid item md={8}>
          <TabContext value={tabValue}>
            <TabPanel value={0}>
                <PersonalInformation />
              </TabPanel>
              <TabPanel value={1}>
                <ChangePassword />
              </TabPanel>
          </TabContext>
        </Grid>
      </Grid>
    </>
  );
}

export default Profile;
