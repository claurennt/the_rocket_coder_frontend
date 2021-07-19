import "./App.css";

import ReactWeather, { useOpenWeather } from "react-open-weather";
import { useState, useEffect } from "react";
import { usePosition } from "use-position";

import { ClientContext } from "graphql-hooks";
import { client } from "./db/GraphQLClient";

import MainBody from "./Components/MainBody";

function App() {
  const [location, setLocation] = useState();
  const watch = true;
  const { latitude, longitude } = usePosition(watch);
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: process.env.REACT_APP_YOUR_API_KEY,
    lat: latitude,
    lon: longitude,
    lang: "en",
    unit: "metric", // values are (metric, standard, imperial)
  });
  const customStyles = {
    background: "yellow",
    fontFamily: "Roboto",
    gradientStart: "red",
    gradientMid: "#04A7F9",
    gradientEnd: "#4BC4F7",
    locationFontColor: "#FFF",
    todayTempFontColor: "#FFF",
    todayDateFontColor: "#B5DEF4",
    todayRangeFontColor: "#B5DEF4",
    todayDescFontColor: "#B5DEF4",
    todayInfoFontColor: "#B5DEF4",
    todayIconColor: "#FFF",
  };
  useEffect(() => {
    fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en ` //domain.com/path/?param1=value1&param2=value2"
    )
      .then((response) => response.json())
      .then((data) => {
        setLocation(data);
        console.log(data);
      });
  }, [longitude, latitude]);

  return (
    <div className="App">
      <div className="App-container-weather">
        {location && (
          <ReactWeather
            theme={customStyles}
            isLoading={isLoading}
            errorMessage={errorMessage}
            data={data}
            lang="en"
            locationLabel={location.city}
            unitsLabels={{ temperature: "°C", windSpeed: "Km/h" }}
            showForecast={false}
          />
        )}
      </div>
      <ClientContext.Provider value={client}>
        {" "}
        <div>
          <MainBody />
        </div>
      </ClientContext.Provider>
    </div>
  );
}

export default App;
