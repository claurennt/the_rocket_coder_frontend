import { makeStyles } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import { css } from "@emotion/react";

// styling material UI components
const useStyles = makeStyles((theme) => ({
  box: {
    maxHeight: "100",

    display: "flex",
    justifyContent: "center",
    textAlign: "center",
  },
  root: {
    fontSize: "1.25rem",
    fontColor: "white",
    borderBottom: "1px solid white",
    width: "50%",
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
  fontWeight: "600",
};

theme.typography.h5 = {
  color: "white",
  padding: "0px",
  fontSize: "1.2rem",
  textShadow: "1px 1px #E1E5EA",
  "@media (min-width:600px)": {
    fontSize: "1.25rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem",
  },
  fontWeight: "400",
};
theme.typography.subtitle1 = {
  color: "white",
  position: "relative",
  alignSelf: "flex-end",
  bottom: "1px",
  fontSize: "1rem",
  "@media (min-width:600px)": {
    fontSize: "1rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1rem",
  },
  fontWeight: "300",
};
theme.typography.body1 = {
  color: "red",
  padding: "15px",
  fontSize: "7rem",
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
