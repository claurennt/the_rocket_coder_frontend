import React from "react";
import ReactGlobe from "react-globe";
<<<<<<< HEAD
import * as THREE from "three";
import { useState, useEffect } from "react";
function FocusTimer({ weatherData }) {
  const markers = [
    {
      id: "marker1",
      color: "red",
      coordinates: [weatherData.latitude, weatherData.longitude],
      value: 50,
    },
  ];
  const [animationSequence, setAnimationSequence] = useState([]);
  console.log(weatherData.latitude, weatherData.longitude);
  useEffect(() => {
    setAnimationSequence([
      {
        coordinates: [weatherData.latitude, weatherData.longitude],
        focusAnimationDuration: 3000,
        focusDistanceRadiusScale: 3,
        focusEasingFunction: ["Linear", "None"],
      },
    ]);
  }, [weatherData.latitude, weatherData.longitude]);

  // switch (animationSequence) {
  //   case "singapore":
  //     animations = [

  //     ];
  //     break;
  //   case "world":
  //     animations = [
  //       {
  //         coordinates: [1.3521, 103.8198],
  //         focusAnimationDuration: 3000,
  //         focusDistanceRadiusScale: 2,
  //         focusEasingFunction: ["Linear", "None"],
  //       },
  //       {
  //         coordinates: [39.9042, 116.4074],
  //         focusAnimationDuration: 3000,
  //         focusDistanceRadiusScale: 2,
  //         focusEasingFunction: ["Cubic", "InOut"],
  //       },
  //       {
  //         coordinates: [37.773972, -122.431297],
  //         focusAnimationDuration: 3000,
  //         focusDistanceRadiusScale: 2,
  //         focusEasingFunction: ["Back", "InOut"],
  //       },
  //       {
  //         coordinates: [40.73061, -73.935242],
  //         focusAnimationDuration: 3000,
  //         focusDistanceRadiusScale: 2,
  //         focusEasingFunction: ["Circular", "InOut"],
  //       },
  //       {
  //         coordinates: [51.5074, 0.1278],
  //         focusAnimationDuration: 3000,
  //         focusDistanceRadiusScale: 2,
  //         focusEasingFunction: ["Quadratic", "InOut"],
  //       },
  //       {
  //         coordinates: [1.3521, 103.8198],
  //         focusAnimationDuration: 5000,
  //         focusDistanceRadiusScale: 4,
  //         focusEasingFunction: ["Linear", "None"],
  //       },
  //     ];
  //     break;
  //   default:
  //     animations = [];
  // }
=======
// import * as THREE from "three";
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

>>>>>>> 3d6a27d09706352415b017b12def22b1547bedd1
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
<<<<<<< HEAD
            // globeGlowPower: 4,
            // globeGlowRadiusScale: 0.5,
            cameraAutoRotateSpeed: 0.5,
            // cameraMaxPolarAngle: (Math.PI * 9) / 16,
            // cameraMinPolarAngle: (Math.PI * 7) / 16,
=======
            cameraAutoRotateSpeed: 0.5,
>>>>>>> 3d6a27d09706352415b017b12def22b1547bedd1
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
<<<<<<< HEAD
=======
        <h1>12</h1>
>>>>>>> 3d6a27d09706352415b017b12def22b1547bedd1
      </div>
    </>
  );
}

export default FocusTimer;
