import React from "react";
import ReactGlobe from "react-globe";
import Typography from "@material-ui/core/Typography";
import { useState, useEffect } from "react";
function FocusTimer({ weatherData, latitude, longitude }) {
  const [animationSequence, setAnimationSequence] = useState([]);

  // if the user does not allow location set it to the default
  if (!latitude || !longitude) {
    latitude = 30.005493;
    longitude = 31.477898;
  }

  // properties of the marker on the globe
  const markers = [
    {
      id: "marker1",
      color: "red",
      coordinates: [latitude, longitude],
      value: 50,
    },
  ];

  useEffect(() => {
    setAnimationSequence([
      {
        coordinates: [latitude, longitude],
        focusAnimationDuration: 3000,
        focusDistanceRadiusScale: 3,
        focusEasingFunction: ["Linear", "None"],
      },
    ]);
  }, [latitude, longitude]);

  return (
    <>
      {animationSequence && (
        <ReactGlobe
          markers={markers}
          animations={animationSequence}
          height="100vh"
          width="100%"
          options={{
            enableGlobeGlow: true,
            globeGlowCoefficient: 0.1,
            globeGlowColor: "gold",
            cameraAutoRotateSpeed: 0.5,
            cameraRotateSpeed: 1,
            enableCameraAutoRotate: true,
            enableCameraRotate: true,
            cameraMaxDistanceRadiusScale: 20,
            enableCameraZoom: false,
            enableMarkerGlow: true,
            markerRadiusScaleRange: [0.005, 0.02],
            markerType: "dot",
          }}
        />
      )}
      <div>
        {/* <button onClick={() => setAnimationSequence("singapore")}>
          Go to Singapore
        </button>
        <button onClick={() => setAnimationSequence("world")}>
          Travel the world
        </button> */}
        <Typography variant="subtitle1">12</Typography>
      </div>
    </>
  );
}

export default FocusTimer;
