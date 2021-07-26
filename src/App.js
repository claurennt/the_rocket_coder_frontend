import "./App.css";
import { useState, useEffect } from "react";
import { usePosition } from "use-position";
import useNasaPicture from "./useNasaPicture";
import { theme } from "./Components/MainBodyStyles";
import Typography from "@material-ui/core/Typography";
import SwipeableTemporaryDrawer from "./Components/SwipeableTemporaryDrawer";
import Box from "@material-ui/core/Box";
import { ThemeProvider } from "@material-ui/core/styles/";
import { ClientContext } from "graphql-hooks";
import { client } from "./Client/GraphQLClient";

import WeatherWidget from "./Components/WeatherWidget";
import React from "react";
import ReactPlayer from "react-player";
import MusicNoteOutlinedIcon from "@material-ui/icons/MusicNoteOutlined";
// import CustomReactWeather from "./CustomReactWeather";

import Tooltip from "@material-ui/core/Tooltip";
import MainBody from "./Components/MainBody";
import { withStyles } from "@material-ui/core/styles";
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";
import IconButton from "@material-ui/core/IconButton";

import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
// import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";
import FormControlLabel from "@material-ui/core/FormControlLabel";
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
  root: {
    height: 180,
  },
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

function App() {
  const [weatherData, setWeatherData] = useState();
  const { picOfTheDay } = useNasaPicture();
  const [location, setLocation] = useState();

  const watch = true;
  const { latitude, longitude } = usePosition(watch);
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  useEffect(() => {
    if (latitude && longitude) {
      const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setLocation(data);
          console.log({ data });
        });
    }
  }, [longitude, latitude]);

  // const images = images.map((image) =>
  useEffect(() => {
    if (latitude && longitude) {
      const iconUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=c97c5e5eec64ede6eb6cc5552280d0c3&units=metric`;
      fetch(iconUrl)
        .then((response) => response.json())
        .then((data) => {
          setWeatherData({
            icon: data.weather[0].icon,
            city: data.name,
            temperature: data.main.temp,
          });
          console.log(data);
        });
    }
  }, [longitude, latitude]);

  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={
          picOfTheDay
            ? {
                backgroundImage: `url( ${picOfTheDay.imgUrl})`,
                backgroundColor: "black",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "100vh",
              }
            : { backgroundColor: "black", height: "100vh" }
        }
      >
        <div
          className="wrapper"
          style={{
            dispaly: "flex",
            marginTop: "0px",
          }}
        >
          {weatherData && <WeatherWidget weatherData={weatherData} />}

          <SwipeableTemporaryDrawer />

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
          style={{ position: "absolute", margin: "auto", left: 30, bottom: 0 }}
          control={<Switch checked={checked} onChange={handleChange} />}
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
                controls="true"
              />
            </div>
          </Fade>
        </div>
      </div>{" "}
    </ThemeProvider>
  );
}

export default App;
