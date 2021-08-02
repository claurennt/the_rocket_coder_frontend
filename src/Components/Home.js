import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import MainBody from "./MainBody";
import { withStyles } from "@material-ui/core/styles";
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";
import IconButton from "@material-ui/core/IconButton";
import { theme } from "./MainBodyStyles";
import Typography from "@material-ui/core/Typography";

import Box from "@material-ui/core/Box";
import { ThemeProvider } from "@material-ui/core/styles/";
import { ClientContext } from "graphql-hooks";
import { client } from "../Client/GraphQLClient";

import WeatherWidget from "./WeatherWidget";

import ReactPlayer from "react-player";
import MusicNoteOutlinedIcon from "@material-ui/icons/MusicNoteOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const ImgTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "transparent",
    position: "relative",
    color: "white",
    maxWidth: 220,
    padding: "0px",
    margin: "1px",
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
  },
  paper: {
    margin: theme.spacing(1),
  },
  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
}));

export default function Home({
  picOfTheDay,
  weatherData,
  checked,
  handleChangeMusic,
}) {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div
        style={
          picOfTheDay
            ? {
                backgroundImage: `url( ${picOfTheDay.imgUrl})`,
                backgroundColor: "black",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "101vh",
              }
            : { backgroundColor: "black", height: "100vh" }
        }
      >
        <div
          className="wrapper"
          style={{
            display: "flex",
            marginTop: "0px",
          }}
        >
          {weatherData && <WeatherWidget weatherData={weatherData} />}

          {/* this is the package added for the music player https://github.com/CookPete/react-player */}
        </div>
        {picOfTheDay && (
          <ImgTooltip
            title={
              <>
                <Typography color="inherit">
                  <strong>title</strong>:{picOfTheDay.imgTitle}
                  <br />
                  <strong>copyright:</strong> {picOfTheDay.imgCopyright}
                </Typography>
              </>
            }
          >
            <Box
              style={{
                position: "absolute",
                margin: "auto",
                right: 0,
                bottom: 0,
              }}
            >
              <IconButton
                style={{ color: "white" }}
                aria-label="display image info"
              >
                <PhotoCameraOutlinedIcon />
              </IconButton>
            </Box>
          </ImgTooltip>
        )}
        <ClientContext.Provider value={client}>
          {" "}
          <MainBody />
        </ClientContext.Provider>
        <FormControlLabel
          style={{
            position: "absolute",
            margin: "auto",
            left: 30,
            bottom: 0,
          }}
          control={<Switch checked={checked} onChange={handleChangeMusic} />}
        />
        <IconButton
          style={{
            color: "white",
            position: "absolute",
            margin: "auto",
            left: 0,
            bottom: 0,
          }}
        >
          <MusicNoteOutlinedIcon />
        </IconButton>

        <div className={classes.container}>
          <Fade in={checked}>
            <div className="player-wrapper">
              <ReactPlayer
                className="react-player"
                url="https://www.youtube.com/watch?v=tNkZsRW7h2c"
                width="15%"
                height="15%"
                cursor="pointer"
                controls={true}
                origin="https://www.youtube.com/watch?v=tNkZsRW7h2c"
              />
            </div>
          </Fade>
        </div>
      </div>{" "}
    </ThemeProvider>
  );
}
