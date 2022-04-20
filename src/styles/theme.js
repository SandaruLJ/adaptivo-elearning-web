import { lightBlue } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#ADADAD",
      main: "#ff9c3f",
      dark: "#000",
      contrastText: "#fff",
    },

    secondary: {
      main: "#fff",
    },
  },
});

export default theme;
