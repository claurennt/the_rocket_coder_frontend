import "./App.css";
import { useState, useEffect } from "react";
import { usePosition } from "use-position";

import { ClientContext } from "graphql-hooks";
import { client } from "./db/GraphQLClient";

import MainBody from "./Components/MainBody";
import CustomReactWeather from "./CustomReactWeather";

function App() {
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

  return (
    <div className="App">
      <div className="App-container-weather">
        {latitude && longitude && location && (
          <CustomReactWeather
            latitude={latitude}
            longitude={longitude}
            location={location}
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
