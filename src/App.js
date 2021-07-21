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
  const [backgroundImage, setBackgroundImage] = useState(null);

  // 3. Create out useEffect function
  useEffect(() => {
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_KEY}&date=2021-07-18`
    )
      .then((response) => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then((data) => setBackgroundImage(data.url));
  }, []);
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
  const style = {
    backgroundImage: `url( ${backgroundImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  return (
    backgroundImage && (
      <div className="App" style={style}>
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
    )
  );
}

export default App;
