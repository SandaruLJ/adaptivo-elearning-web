import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Card, CardContent, CardHeader, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Auth } from 'aws-amplify';
import React from 'react';
import { useState } from 'react';
import CustomButton from '../../components/Button/CustomButton';
import './ChangePassword.css';

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [passwordInfo, setPasswordInfo] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  })

  const handleChange = (event) => {
    const {name, value} = event.target;
    setPasswordInfo({
      ...passwordInfo,
      [name]: value
    })
  }

  const handleSubmit = async () => {
    setLoading(true);
    const user = await Auth.currentAuthenticatedUser();
    const result = await Auth.changePassword(user, passwordInfo.current_password, passwordInfo.new_password);
    console.log(result);
    setLoading(false);
  }

  const handleShowPassword = (type) => {
    setShowPassword({
      ...showPassword,
      [type]: !showPassword[type]
    })
  }


  return (
    <Card variant="outlined" className="change-password-container">
      <CardHeader
        title="Change Password"
      />
      <CardContent>
        <Grid container spacing={4}>
          <Grid item md={12}>
            <FormControl className="change-password-input" variant="outlined">
              <InputLabel htmlFor="current_password">Current Password</InputLabel>
              <OutlinedInput
                id="current_password"
                name="current_password"
                label="Current Password"
                variant="outlined"
                type={showPassword.currentPassword ? "text" : "password"}
                value={passwordInfo.current_password}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handleShowPassword("currentPassword")}
                      edge="end"
                    >
                      {showPassword.currentPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item md={12}>
            <FormControl className="change-password-input" variant="outlined">
              <InputLabel htmlFor="new_password">New Password</InputLabel>
              <OutlinedInput
                id="new_password"
                name="new_password"
                label="New Password"
                variant="outlined"
                type={showPassword.newPassword ? "text" : "password"}
                value={passwordInfo.new_password}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handleShowPassword("newPassword")}
                      edge="end"
                    >
                      {showPassword.newPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item md={12}>
            <FormControl className="change-password-input" variant="outlined">
              <InputLabel htmlFor="confirm_password">Confirm New Password</InputLabel>
              <OutlinedInput
                id="confirm_password"
                name="confirm_password"
                label="Confirm New Password"
                variant="outlined"
                type={showPassword.confirmPassword ? "text" : "password"}
                value={passwordInfo.confirm_password}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handleShowPassword("confirmPassword")}
                      edge="end"
                    >
                      {showPassword.confirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item className="change-password-submit">
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

export default ChangePassword;
