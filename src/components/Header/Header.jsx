import { ArrowDropDown, Logout, Search, ShoppingCartOutlined } from "@mui/icons-material";
import { Avatar, Divider, Grid, IconButton, InputAdornment, ListItemIcon, Menu, MenuItem, OutlinedInput, Typography } from "@mui/material";
import { Auth } from "aws-amplify";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CustomButton from "../Button/CustomButton";
import "./Header.css";

const Header = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const [firstname, setFirstname] = useState("");
  const [userInitials, setUserInitials] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);

  const [search, setSearch] = useState();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((data) => {
      setFirstname(data.attributes.given_name);
      setUserInitials(`${data.attributes.given_name[0]}${data.attributes.family_name[0]}`);
    });
  }, []);

  const handleLogout = () => {
    Auth.signOut().then(() => setAuthenticated(false));
  };

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(() => setAuthenticated(true))
      .catch(() => setAuthenticated(false));
  }, []);

  return (
    <div className="header">
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <Grid item lg={8}>
          <Grid container alignItems={"center"} spacing={2}>
            <Grid item md={3}>
              <div className="header-logo">
                <Link to="/">
                  <img src="images/adaptivo.png" />
                </Link>
              </div>
            </Grid>
            <Grid item md={9}>
              <OutlinedInput
                notched={false}
                fullWidth
                className="header-search"
                color="secondary"
                size="small"
                placeholder="Search for Courses"
                value={search}
                type="text"
                name="search"
                // onChange={props.onChange}
                endAdornment={
                  <InputAdornment position="end">
                    <Search />
                  </InputAdornment>
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={3}>
          <Grid container spacing={1} alignItems={"center"} justifyContent="flex-end">
            <Grid item xs={1}>
              {/* <ShoppingCartOutlined /> */}
            </Grid>
            {authenticated ? (
              <>
                <Grid item xs={5}>
                  <Link to="/mycourses" style={{ textDecoration: "none", textAlign: "right" }}>
                    <h3 className="my-course-txt">My Courses</h3>
                  </Link>
                </Grid>
                <Grid item xs={6}>
                  <div onClick={handleClick} style={{ display: "flex", cursor: "pointer", justifyContent: "flex-end" }}>
                    <Typography variant="body1" class="firstname">
                      {firstname}
                    </Typography>
                    <IconButton className="accountButton" disableRipple>
                      <Avatar src={undefined}>{userInitials}</Avatar>
                      <ArrowDropDown />
                    </IconButton>
                  </div>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={3}>
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <h3 className="login-text">Login</h3>
                  </Link>
                </Grid>
                <Grid item xs={5}>
                  <Link to="/signup">
                    <CustomButton name="Sign Up" color="light-orange-bordered" />
                  </Link>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar /> My Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Header;
