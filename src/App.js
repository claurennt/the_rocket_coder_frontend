import "./App.css";
import { useState, useEffect } from "react";
import { usePosition } from "use-position";
import useNasaPicture from "./useNasaPicture";

import { ClientContext } from "graphql-hooks";
import { client } from "./db/GraphQLClient";

import MainBody from "./Components/MainBody";
import CustomReactWeather from "./CustomReactWeather";

function App() {
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
    </>
  );
}

export default App;
