import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grow from "@material-ui/core/Grow";

import Link from "@material-ui/core/Link";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     height: 180,
//   },
//   container: {
//     display: "flex",
//   },
// }));

export default function GoogleLinks({ googleLinks }) {
  console.log(googleLinks);

  // const classes = useStyles();
  // const [checked, setChecked] = React.useState(false);

  // const handleChange = () => {
  //   setChecked((prev) => !prev);
  // };

  return (
    // <div className={classes.root}>
    //   <FormControlLabel
    //     control={<Switch checked={checked} onChange={handleChange} />}
    //     label="Show"
    //   />
    //   <div className={classes.container}>

    <Box display="flex" flexDirection="column" justifyContent="center">
      {googleLinks.results.map((result, index) => {
        return (
          <Grow
            in={googleLinks}
            style={{
              transformOrigin: "5 5 5",
              color: "#00FF41",
            }}
            {...(googleLinks ? { timeout: Number(index + "000") } : {})}
          >
            <Link href={result.url}>{result.title}</Link>
          </Grow>
        );
      })}{" "}
    </Box>
  );
}
