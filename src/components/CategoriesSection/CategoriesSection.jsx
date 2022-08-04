import { Abc, Business, Calculate, DataThresholding, DeveloperMode, MoreHoriz, MultilineChart, Science, ShowChart } from "@mui/icons-material";
import { Grid } from "@mui/material";
import React from "react";
import CustomButton from "../Button/CustomButton";
import CategoryCard from "../CategoryCard/CategoryCard";
import "./CategoriesSection.css";

const CategoriesSection = () => {
  return (
    <div className="categories-section">
      <Grid container alignItems={"center"}>
        <Grid item md={4}>
          <div className="ct-sec-title">Explore our Popular Categories</div>
          <div className="ct-sec-description">Look into yourself, get something in return as your achievement</div>
          <CustomButton color="light-orange-bordered fit-content" name="Browse all Categories" />
        </Grid>
        <Grid item md={8}>
          <Grid container spacing={2} rowSpacing={4}>
            <Grid item>
              <CategoryCard bg="blue-bg" name="Art & Design" icon={<MultilineChart fontSize="large" />} />
            </Grid>
            <Grid item>
              <CategoryCard bg="pink-bg" name="Development" icon={<DeveloperMode fontSize="large" />} />
            </Grid>
            <Grid item>
              <CategoryCard bg="green-bg" name="DataScience" icon={<DataThresholding fontSize="large" />} />
            </Grid>
            <Grid item>
              <CategoryCard bg="orange-bg" name="Marketing" icon={<ShowChart fontSize="large" />} />
            </Grid>
            <Grid item>
              <CategoryCard bg="purple-bg" name="Business" icon={<Business fontSize="large" />} />
            </Grid>
            <Grid item>
              <CategoryCard bg="light-green-bg" name="Science" icon={<Science fontSize="large" />} />
            </Grid>
            <Grid item>
              <CategoryCard bg="yellow-bg" name="Maths" icon={<Calculate fontSize="large" />} />
            </Grid>
            <Grid item spacing={2}>
              <CategoryCard bg="violet-bg" name="English" icon={<Abc fontSize="large" />} />
            </Grid>
            <Grid item spacing={2}>
              <CategoryCard bg="green-bg" name="View All" icon={<MoreHoriz fontSize="large" />} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default CategoriesSection;
