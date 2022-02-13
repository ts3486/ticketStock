import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      main: "#fffff",
    },
    background: {
      default: "#757de8",
      paper: "#fff",
    },
    text: {
      primary: "#000",
      secondary: "#000",
    },
  },
});
