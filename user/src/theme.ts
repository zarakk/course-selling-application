import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#e7005e",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#20183e",
      contrastText: "#ffffff",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#242145",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h5: {
          color: "black",
        },
        h2: {
          color: "black",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&.MuiButton-root:hover": {
            backgroundColor: "#ff1675",
            color: "white",
          },
          "&.navbar-btn:hover": {
            backgroundColor: "#585fa2 !important",
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "white",
        },
      },
    },
  },
});

export default theme;
