import "./App.css";
import { useState, useEffect } from "react";
import { usePosition } from "use-position";
import useNasaPicture from "./useNasaPicture";

import { ClientContext } from "graphql-hooks";
import { client } from "./Client/GraphQLClient";
import WeatherWidget from "./Components/WeatherWidget";
import MainBody from "./Components/MainBody";
// import CustomReactWeather from "./CustomReactWeather";

function App() {
  const [weatherData, setWeatherData] = useState();
  const { picOfTheDay } = useNasaPicture();
  const [location, setLocation] = useState();

  const watch = true;
  const { latitude, longitude } = usePosition(watch);

  useEffect(() => {
    if (latitude && longitude) {
      const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
      // console.log({ url });
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
    <>
      <div
        className="App"
        style={
          picOfTheDay
            ? {
                backgroundImage: `url( ${picOfTheDay})`,
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

        <ClientContext.Provider value={client}>
          {" "}
          <MainBody />
        </ClientContext.Provider>
      </div>
    </>
  );
}

export default App;
