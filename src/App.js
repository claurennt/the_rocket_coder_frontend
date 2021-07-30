import "./App.css";
import { useState, useEffect } from "react";
import { usePosition } from "use-position";
import useNasaPicture from "./useNasaPicture";
import SwipeableTemporaryDrawer from "./Components/SwipeableTemporaryDrawer";
import React from "react";
import Home from "./Components/Home";
// import CustomReactWeather from "./CustomReactWeather";
import { Switch, Route } from "react-router-dom";
import AlienDebugger from "./Components/AlienDebugger";
import DiscoverEvents from "./Components/DiscoverEvents";
import FocusTimer from "./Components/FocusTimer";
import RoboCodingQuiz from "./Components/RoboCodingQuiz";
import Shortcuts from "./Components/Shortcuts";
// import SpaceMusic from "./rComponents/SpaceMusic";

// import Paper from "@material-ui/core/Paper";

function App() {
  const [weatherData, setWeatherData] = useState();
  const { picOfTheDay } = useNasaPicture();
  const [location, setLocation] = useState();
  // const l = useLocation();
  // console.log(l);
<<<<<<< HEAD

=======
<<<<<<< HEAD
  const watch = true;
=======

>>>>>>> main
>>>>>>> aliendebuggerdebugging
  const { latitude, longitude } = usePosition();

  const [checked, setChecked] = useState(false);

  const handleChangeMusic = () => {
    setChecked((prev) => !prev);
  };

  // useEffect(() => {
  //   if (latitude && longitude) {
  //     const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

  //     fetch(url)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setLocation(data);
  //         console.log({ data });
  //       });
  //   }
  // }, [longitude, latitude]);

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

            latitude: data.coord.lat,
            longitude: data.coord.lon,
          });
          console.log(data);
        });
    }

  }, [longitude, latitude]);

  console.log(picOfTheDay);
  return (
    <div className="App">
      <SwipeableTemporaryDrawer />
      <Switch>
        <Route path="/aliendebugger">
          <AlienDebugger
            checked={checked}
            handleChangeMusic={handleChangeMusic}
          />
        </Route>
        <Route path="/discoverevents">
          <DiscoverEvents />
        </Route>
        <Route path="/focustimer/">
          <FocusTimer weatherData={weatherData} />
        </Route>
        <Route path="/robocodingquiz/">
          <RoboCodingQuiz />
        </Route>
        <Route path="/shortcuts/">
          <Shortcuts />
        </Route>
        <Route path="/">
          <Home
            picOfTheDay={picOfTheDay}
            weatherData={weatherData}
            checked={checked}
            handleChangeMusic={handleChangeMusic}
            location={location}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
