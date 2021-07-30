import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 180,
  },
  container: {
    display: "flex",
  },
  paper: {
    margin: theme.spacing(1),
  },

  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
  box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    color: "red",
  },
}));

export default function GoogleLinks({ googleLinks }) {
  console.log(googleLinks);

  const classes = useStyles();

  return (
    // <div className={classes.root}>
    //   <FormControlLabel
    //     control={<Switch checked={checked} onChange={handleChange} />}
    //     label="Show"
    //   />
    //   <div className={classes.container}>
    <Box display="flex" flexDirection="column" m={5}>
      {googleLinks.results.map((result) => {
        return (
          <Link className={classes.link} href={result.url}>
            {result.title}
          </Link>
        );
      })}{" "}
    </Box>
  );
}
