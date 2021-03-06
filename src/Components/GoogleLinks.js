import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  textHelp: {
    fontFamily: "Audiowide",
    fontSize: "30px",

    color: "white",
    textAlign: "center",
    lineHeight: "1em",
    paddingTop: "50PX",
  },
  linkTitle: {
    fontSize: "20px",
    fontWeight: 700,
    paddingBottom: "18px",
  },
}));

export default function GoogleLinks({ googleLinks }) {
  const classes = useStyles();
  console.log(googleLinks !== undefined);
  return (
    <Grid
      container
      flexdirection="row"
      justifyContent="space-between"
      alignContent="center"
      style={{ width: "90vw", marginTop: "10%" }}
    >
      <Grid item xs={4}>
        <p
          className={classes.textHelp}
          style={{ textShadow: "2px 2px #00000" }}
        >
          Here is what you are looking for
        </p>
        {googleLinks.results.length === 0
          ? googleLinks.people_also_ask.slice(0, 3).map((tip, index) => {
              return (
                <Grow
                  in={googleLinks !== undefined}
                  style={{
                    transformOrigin: "5 5 5",
                    color: "#00FF41",
                    display: "block",
                  }}
                  {...(googleLinks ? { timeout: Number(index + "000") } : {})}
                >
                  {/* create search query string with people_also_ask string values append them to google endpoint */}
                  <Link
                    target="_blank"
                    className={classes.linkTitle}
                    href={`http://www.google.com/search?q=${tip.replace(
                      "",
                      "+"
                    )}`}
                  >
                    {tip}
                  </Link>
                </Grow>
              );
            })
          : googleLinks.results.slice(0, 3).map((result, index) => {
              return (
                <Grow
                  in={googleLinks !== undefined}
                  style={{
                    transformOrigin: "5 5 5",
                    color: "#00FF41",
                    display: "block",
                  }}
                  {...(googleLinks ? { timeout: Number(index + "000") } : {})}
                >
                  <Link
                    target="_blank"
                    className={classes.linkTitle}
                    href={result.url}
                  >
                    {result.title}
                  </Link>
                </Grow>
              );
            })}
      </Grid>
      <Box alignSelf="center" xs={4}>
        <Grow
          in={googleLinks !== undefined}
          style={{
            transformOrigin: "5 5 5",
            color: "#00FF41",
            right: "100px",
            top: "40px",
          }}
          {...(googleLinks ? { timeout: 6000 } : {})}
        >
          <Button
            style={{
              backgroundColor: "#00FF41",
              fontFamily: "Audiowide",
              color: "black",
              width: "320px",
            }}
            target="_blank"
            href={
              googleLinks.results[3]?.url ??
              `http://www.google.com/search?q=${googleLinks.people_also_ask[3].replace(
                "",
                "+"
              )}`
            }
          >
            {" "}
            Or maybe u r feeling lucky!? ????
          </Button>
        </Grow>
      </Box>
    </Grid>
  );
}
