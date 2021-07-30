import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grow from "@material-ui/core/Grow";

import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 180,
  },
  container: {
    display: "flex",
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
      {googleLinks.results.map((result, index) => {
        return (
          <Grow
            in={checked}
            style={{ transformOrigin: "5 5 5" }}
            {...(checked ? { timeout: index } : {})}
          >
            <Link href={result.url}>{result.title}</Link>
          </Grow>
        );
        {
          /* Conditionally applies the timeout prop to change the entry speed. */
        }
      })}{" "}
    </>
  );
}
