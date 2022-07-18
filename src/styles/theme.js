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
    tertiary: {
      light: "#ff7961",
      main: "#FF9E43",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

export default theme;
