import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./LinearProgresswithLabel.css";
const LinearProgressWithLabel = (props) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }} className="linear-progress">
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" color="primary" {...props} />
      </Box>
      {props.displayValue && (
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="h6" color="text.primary">{`${Math.round(props.value)}%`}</Typography>
        </Box>
      )}
    </Box>
  );
};
export default LinearProgressWithLabel;
