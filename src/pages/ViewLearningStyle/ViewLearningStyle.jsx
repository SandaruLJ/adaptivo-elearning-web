import React from "react";
import TopBar from "../../components/TopBar/TopBar";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./ViewLearningStyle.css";
import { Grid } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

const ViewLearningStyle = (props) => {
  const data = {
    labels: ["Active", "Reflective", "Visual", "Verbal", "Sequential", "Global", "Sensing", "Intuitive"],
    datasets: [
      {
        label: "Learning Style Strength",
        data: [12, 19, 3, 5, 2, 3, 8, 2, 1],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        position: "right",
      },
    },
  };
  return (
    <div>
      <TopBar signOut={props.signOut} displayProgress={false} />
      <div className="main-content">
        <Grid container justifyContent={"space-between"}>
          <Grid item md={5}>
            <h2 className="learning-style-heading">Learning Style Preview</h2>
            <div className="learning-style-chart">
              <Pie data={data} options={options} />
            </div>
          </Grid>
          <Grid item md={5}>
            <h2 className="learning-style-heading">My Prominent Learning Style</h2>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ViewLearningStyle;
