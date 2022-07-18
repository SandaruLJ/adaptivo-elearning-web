import { MultilineChart } from "@mui/icons-material";
import { Grid } from "@mui/material";
import React from "react";
import "./CategoryCard.css";

const CategoryCard = (props) => {
  return (
    <div className="category-card">
      <Grid container flexDirection={"column"} alignItems="center">
        <Grid item>
          <div className={`category-card-icon ${props.bg}`}>{props.icon}</div>
        </Grid>
        <Grid item>
          <div className="category-card-name">{props.name}</div>
        </Grid>
      </Grid>
    </div>
  );
};

export default CategoryCard;
