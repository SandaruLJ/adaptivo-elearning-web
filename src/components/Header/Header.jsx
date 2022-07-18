import { Search, ShoppingCart, ShoppingCartOutlined } from "@mui/icons-material";
import { Grid, InputAdornment, OutlinedInput } from "@mui/material";
import React from "react";
import { useState } from "react";
import CustomButton from "../Button/CustomButton";
import "./Header.css";

const Header = () => {
  const [search, setSearch] = useState();

  return (
    <div className="header">
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <Grid item lg={8}>
          <Grid container alignItems={"center"} spacing={2}>
            <Grid item md={3}>
              <div className="header-logo">
                <img src="images/adaptivo.png" />
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
            <Grid item xs={2}>
              <ShoppingCartOutlined />
            </Grid>
            <Grid item xs={3}>
              <h3 className="login-text">Login</h3>
            </Grid>
            <Grid item xs={5}>
              <CustomButton name="Sign Up" color="light-orange-bordered" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
