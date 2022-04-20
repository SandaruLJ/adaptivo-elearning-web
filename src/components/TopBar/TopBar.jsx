import React, { useEffect, useState } from "react";
import "./TopBar.css";
import { Avatar, Badge, FormControl, FormHelperText, Grid, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { ArrowDropDown, Fullscreen, FullscreenExit, KeyboardArrowLeft, Menu, Search, Visibility } from "@mui/icons-material";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import { width } from "@mui/system";
import { Link } from "react-router-dom";
import CircularProgressWithIcon from "../CircularProgresswithIcon/CircularProgresswithIcon";

//Admin TopBar
const TopBar = (props) => {
  return (
    <div
      className={`topBar
                ${props.collapsed && "topBarExtended"}`}
    >
      {/* TopBar content (left) */}
      <Grid container spacing="2" alignItems="center" justifyContent="space-between">
        <Grid item>
          <Grid container spacing="30" alignItems="center">
            <Grid item>
              <Link to="/" className="logo">
                Elearning
              </Link>
            </Grid>
            <Grid item>
              <div>
                <h3>Machine Learning BootCamp</h3>
              </div>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <Grid container spacing={1} alignItems="center" className="mr-2">
                <Grid item>
                  <CircularProgressWithIcon value={25} />
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
              <IconButton className="accountButton" disableRipple>
                <Avatar src={props.avatarSrc}>{props.avatarTxt}</Avatar>
                <ArrowDropDown />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* TopBar content (right) */}
    </div>
  );
};
export default TopBar;
