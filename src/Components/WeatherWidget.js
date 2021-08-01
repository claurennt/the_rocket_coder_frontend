import React from "react";

import ReactAnimatedWeather from "react-animated-weather";

export default function WeatherWidget({ weatherData }) {
  const codeMapping = {
    "01d": "CLEAR_DAY",
    "01n": "CLEAR_NIGHT",
    "02d": "PARTLY_CLOUDY_DAY",
    "02n": "PARTLY_CLOUDY_NIGHT",
    "03d": "PARTLY_CLOUDY_DAY",
    "03n": "PARTLY_CLOUDY_NIGHT",
    "04d": "CLOUDY",
    "04n": "CLOUDY",
    "09d": "RAIN",
    "09n": "RAIN",
    "10d": "RAIN",
    "10n": "RAIN",
    "11d": "RAIN",
    "11n": "RAIN",
    "13d": "SNOW",
    "13n": "SNOW",
    "50d": "FOG",
    "50n": "FOG",
  };

  return (
    <>
      <div className="App-container-weather">
        <div
          className="weather"
          style={{
            display: "flex",
            padding: "1px",
            outlineHeight: "10px",
            alignItems: "flex-end",
            marginRight: "30px",
          }}
        >
          <div style={{ alignSelf: "center" }}>
            <ReactAnimatedWeather
              icon={codeMapping[weatherData.icon]}
              color="white"
              size={50}
              animate={true}
            />
          </div>
          <div>
            <h5 style={{ color: "white" }}>
              {" "}
              {Math.round(weatherData.temperature)}°C{" "}
            </h5>

            <h5 style={{ color: "white", alignSelf: "center" }}>
              {weatherData.city}
            </h5>
          </div>
        </div>
      </div>
    </>
  );
}
