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

// import CustomReactWeather from "./CustomReactWeather";

import Tooltip from "@material-ui/core/Tooltip";
import MainBody from "./Components/MainBody";
import { withStyles } from "@material-ui/core/styles";
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";
import IconButton from "@material-ui/core/IconButton";

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

function App() {
  const [weatherData, setWeatherData] = useState();
  const { picOfTheDay } = useNasaPicture();
  const [location, setLocation] = useState();

  const watch = true;
  const { latitude, longitude } = usePosition(watch);

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
        {weatherData && <WeatherWidget weatherData={weatherData} />}
        <SwipeableTemporaryDrawer />
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
      </div>{" "}
    </ThemeProvider>
  );
}

export default App;
