import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import CircularProgress, { circularProgressClasses } from "@mui/material/CircularProgress";

export default function CircularProgressWithIcon(props) {
  //   return (
  //     <Box sx={{ position: "relative" }}>
  //       <CircularProgress
  //         variant="determinate"
  //         sx={{
  //           color: "#e5e5e5",
  //         }}
  //         size={40}
  //         thickness={4}
  //         value={100}
  //       />
  //       <CircularProgress
  //         variant="determinate"
  //         size={40}
  //         sx={{
  //           position: "absolute",
  //           left: 0,
  //           [`& .${circularProgressClasses.circle}`]: {
  //             strokeLinecap: "round",
  //           },
  //         }}
  //         thickness={4}
  //         {...props}
  //       />
  //     </Box>
  //   );
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <Box sx={{ position: "relative" }}>
        <CircularProgress
          variant="determinate"
          sx={{
            color: "#e5e5e5",
          }}
          size={40}
          thickness={4}
          value={100}
        />
        <CircularProgress
          variant="determinate"
          size={40}
          sx={{
            position: "absolute",
            left: 0,
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: "round",
            },
          }}
          thickness={4}
          {...props}
        />
      </Box>
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}
