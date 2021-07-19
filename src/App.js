import "./App.css";
import ReactWeather, { useOpenWeather } from "react-open-weather";
import { useState, useEffect } from "react";
import { usePosition } from "use-position";
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
      <header className="App-header">
        {location && (
          <ReactWeather
            isLoading={isLoading}
            errorMessage={errorMessage}
            data={data}
            lang="en"
            locationLabel={location.city}
            unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
            showForecast={false}
          />
        )}
      </header>
    </div>
  );
}

export default App;
