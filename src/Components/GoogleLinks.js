import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";

import Fade from "@material-ui/core/Fade";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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
}));

export default function GoogleLinks({ googleLinks }) {
  console.log(googleLinks);

  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    // <div className={classes.root}>
    //   <FormControlLabel
    //     control={<Switch checked={checked} onChange={handleChange} />}
    //     label="Show"
    //   />
    //   <div className={classes.container}>

    <>
      {googleLinks.results.map((result) => {
        return <p>{result.url}</p>;
      })}{" "}
    </>
  );
}
