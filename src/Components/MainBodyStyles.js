import { makeStyles } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import { css } from "@emotion/react";

// styling material UI components
const useStyles = makeStyles((theme) => ({
  box: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
  },
  input: {
    width: "50%",
    "&:before": {
      borderBottom: "1px solid white",
    },
    "&:hover:not($disabled):not($focused):not($error):before": {
      borderBottom: "2px solid white",
    },
    "&:after": {
      borderBottom: "3px solid white",
    },
  },
}));

// styling MATERIAL ui typography elements
const theme = createTheme();
theme.typography.h3 = {
  color: "white",
  padding: "15px",
  fontSize: "2rem",
  "@media (min-width:600px)": {
    fontSize: "2rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "3rem",
  },
  fontWeight: "300",
};

theme.typography.h5 = {
  color: "white",
  padding: "15px",
  fontSize: "1.2rem",
  "@media (min-width:600px)": {
    fontSize: "1.25rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem",
  },
  fontWeight: "300",
};
theme.typography.subtitle1 = {
  color: "white",
  padding: "15px",
  fontSize: "0.75rem",
  "@media (min-width:600px)": {
    fontSize: "0.75rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "0.75rem",
  },
  fontWeight: "300",
};

// styling loader
const loaderCSS = css`
  display: block;
  margin: 0 auto;
  width: 10;
`;

export { useStyles, theme, loaderCSS };
