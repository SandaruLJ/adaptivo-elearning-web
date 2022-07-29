import React, { Fragment, useState } from "react";
import "./TopBar.css";
import { Avatar, Divider, Grid, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { ArrowDropDown, Fullscreen, FullscreenExit, Logout } from "@mui/icons-material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Link, useNavigate } from "react-router-dom";
import CircularProgressWithIcon from "../CircularProgresswithIcon/CircularProgresswithIcon";
import store from "../../store";
import { useSelector } from "react-redux";

//Admin TopBar
const TopBar = (props) => {
  const state = store.getState();
  const userInitials = `${state.auth.user.attributes.given_name[0]}${state.auth.user.attributes.family_name[0]}`;

  const [anchorEl, setAnchorEl] = useState(null);
  const courseName = useSelector((state) => state.course.courseName);
  const progress = useSelector((state) => state.course.progress);

  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      className={`topBar
                ${props.collapsed && "topBarExtended"}`}
    >
      <Fragment>
        {/* TopBar content (left) */}
        <Grid container spacing="2" alignItems="center" justifyContent="space-between">
          <Grid item>
            <Grid container spacing="30" alignItems="center">
              <Grid item onClick={() => navigate("/")}>
                {/* <Link to="/" className="logo">
                  adaptivo
                </Link> */}
                <img src="images/adaptivo.png" className="logo-img" />
              </Grid>
              <Grid item>
                <div>
                  <h3>{courseName}</h3>
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <Grid container spacing={1} alignItems="center" className="mr-2">
                  <Grid item>
                    <CircularProgressWithIcon value={progress} />
                  </Grid>
                  <Grid item>
                    <h4>Your Progress</h4>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <IconButton className="iconButton">
                  <DarkModeIcon />
                </IconButton>
              </Grid>

              <Grid item>
                <IconButton className="iconButton">{props.fullscreen ? <FullscreenExit /> : <Fullscreen />}</IconButton>
              </Grid>

              {/* Account button */}

              <Grid item>
                <IconButton className="accountButton" disableRipple onClick={handleClick}>
                  <Avatar src={props.avatarSrc}>{userInitials}</Avatar>
                  <ArrowDropDown />
                </IconButton>
              </Grid>
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
          <MenuItem onClick={props.signOut}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Fragment>

      {/* TopBar content (right) */}
    </div>
  );
};
export default TopBar;
