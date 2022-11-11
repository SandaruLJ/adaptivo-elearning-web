import { Card, CardContent, CardHeader, FormControl, Grid, TextField } from '@mui/material';
import { Auth } from 'aws-amplify';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import CustomButton from '../../components/Button/CustomButton';
import './PersonalInformation.css';

const PersonalInformation = () => {
  const [loading, setLoading] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    given_name: "",
    family_name: "",
    email: "",
    phone_number: "",
    address: "",
  });

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((data) => {
      let info = data.attributes;
      setPersonalInfo({
        given_name: info["given_name"],
        family_name: info["family_name"],
        email: info["email"],
        phone_number: info["phone_number"],
        address: info["address"],
      });
    });
  }, []);

  const handleChange = (event) => {
    const {name, value} = event.target;
    setPersonalInfo({
      ...personalInfo,
      [name]: value
    })
  };

  const handleSubmit = async () => {
    setLoading(true);
    const user = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(user, personalInfo);
    setLoading(false);
  }


  return (
    <Card variant="outlined" className="personal-info-container">
      <CardHeader
        title="Personal Information"
      />
      <CardContent>
        <Grid container spacing={4}>
          <Grid item md={6}>
            <FormControl className="personal-info-input">
              <TextField
                id="given_name"
                name="given_name"
                label="First Name"
                variant="outlined"
                value={personalInfo.given_name}
                onChange={handleChange}
                required
              />
            </FormControl>
          </Grid>
          <Grid item md={6}>
            <FormControl className="personal-info-input">
              <TextField
                id="family_name"
                name="family_name"
                label="Last Name"
                variant="outlined"
                value={personalInfo.family_name}
                onChange={handleChange}
                required
              />
            </FormControl>
          </Grid>
          <Grid item md={6}>
            <FormControl className="personal-info-input">
              <TextField
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                value={personalInfo.email}
                onChange={handleChange}
                required
              />
            </FormControl>
          </Grid>
          <Grid item md={6}>
            <FormControl className="personal-info-input">
              <TextField
                id="phone_number"
                name="phone_number"
                label="Phone Number"
                variant="outlined"
                value={personalInfo.phone_number}
                onChange={handleChange}
                required
              />
            </FormControl>
          </Grid>
          <Grid item md={12}>
            <FormControl className="personal-info-input-wide">
              <TextField
                id="address"
                name="address"
                label="Address"
                variant="outlined"
                value={personalInfo.address}
                onChange={handleChange}
                required
              />
            </FormControl>
          </Grid>
          <Grid item className="personal-info-submit">
            <CustomButton
              name="Save Changes"
              color="orange"
              type="submit"
              loading={loading}
              onclick={handleSubmit}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default PersonalInformation;
