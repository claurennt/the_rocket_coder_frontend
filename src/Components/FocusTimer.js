import React from "react";
import ReactGlobe from "react-globe";
import { useMemo } from "react";
// import * as THREE from "three";
import { useState, useEffect, useRef } from "react";
import useInterval from "react-useinterval";
import Timer from "./Timer";
import TimerControls from "./TimerControls";
import TimesSet from "./TimesSet";
import { Container, Row, Col, Jumbotron } from "react-bootstrap";
import beep1 from "../sounds/beep1.mp3";
import beep2 from "../sounds/beep2.mp3";
import "./FocusTimer.css";

function FocusTimer({ weatherData, latitude, longitude }) {
  const [sessionLength, setSessionLength] = useState(25);
  const [cycle, setCycle] = useState(0);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60 * 1000);
  const [playOn, setPlayOn] = useState(false);
  const mode = ["Session"];
  const sound1 = useRef();
  const sound2 = useRef();
  const [soundChoice, setSoundChoice] = useState(sound2);
  const [volumeLev, setVolumeLev] = useState(0.5);

  useInterval(() => setTimeLeft(timeLeft - 1000), playOn ? 1000 : undefined);
  const [animationSequence, setAnimationSequence] = useState([]);

  // if the user does not allow location set it to the default
  if (!latitude || !longitude) {
    latitude = 30.005493;
    longitude = 31.477898;
  }

  // memorize opt
  const options = useMemo(() => {
    return {
      enableGlobeGlow: true,
      globeGlowCoefficient: 0.1,
      globeGlowColor: "gold",
      cameraAutoRotateSpeed: 0.9,
      cameraRotateSpeed: 1,
      enableCameraAutoRotate: true,
      enableCameraRotate: true,
      cameraMaxDistanceRadiusScale: 20,
      enableCameraZoom: false,
      enableMarkerGlow: true,
      markerRadiusScaleRange: [0.005, 0.02],
      markerType: "dot",
    };
  }, []);

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

  useEffect(() => {
    setTimeLeft(sessionLength * 60 * 1000);
  }, [sessionLength]);

  useEffect(() => {
    document.getElementById("beep").volume = volumeLev;
    document.getElementById("beep1").volume = volumeLev;
  }, [volumeLev]);

  useEffect(() => {
    if (timeLeft === 0 && cycle === 0) {
      setCycle(1);
      playSound(soundChoice.current);
    } else if (timeLeft === 0 && cycle === 1) {
      setCycle(0);
      playSound(soundChoice.current);
      setTimeLeft(sessionLength * 60 * 1000);
    }
  }, [timeLeft, sessionLength, cycle, soundChoice]);

  const reset = () => {
    console.log("reset func triggered");
    setPlayOn(false);
    setCycle(0);
    setTimeLeft(25 * 60 * 1000);
    setSessionLength(25);
    soundChoice.current.pause();
    soundChoice.current.currentTime = 0;
  };

  const handleSwitchChange = () => {
    if (soundChoice === sound1) {
      sound2.current.play();
      setSoundChoice(sound2);
    } else {
      sound1.current.play();
      setSoundChoice(sound1);
    }
  };
  const playSound = (sound) => {
    sound.play();
  };
  return (
    <>
      <div>
        {/* <button onClick={() => setAnimationSequence("singapore")}>
          Go to Singapore
        </button>
        <button onClick={() => setAnimationSequence("world")}>
          Travel the world
        </button> */}

        <Container
          fluid
          id="wrap"
          className="d-flex align-items-center justify-content-center"
          style={{ position: "absolute", top: "10px" }}
        >
          <Jumbotron id="jumbo" className="bg-transparent px-5 pt-5 pb-4">
            <Row>
              <Col className="mb-3">
                <h1 id="title" className="text-center text-light">
                  Focus Timer
                </h1>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={12}>
                <TimesSet
                  setSessionLength={setSessionLength}
                  sessionLength={sessionLength}
                  playOn={playOn}
                />
              </Col>
            </Row>
            <Row className="d-flex justify-content-center">
              <Col sm={12} md={6} className="">
                <Timer timeLeft={timeLeft} mode={mode} cycle={cycle} />
              </Col>
            </Row>
            <Row>
              <Col className="m-1">
                <TimerControls
                  reset={reset}
                  playOn={playOn}
                  setPlayOn={setPlayOn}
                  handleSwitchChange={handleSwitchChange}
                  setVolumeLevel={setVolumeLev}
                />
              </Col>
            </Row>
          </Jumbotron>
        </Container>
        <audio id="beep1" src={beep1} ref={sound1} />
        <audio id="beep" src={beep2} ref={sound2} />
      </div>
      {animationSequence && (
        <ReactGlobe
          markers={markers}
          animations={animationSequence}
          height="100vh"
          width="100%"
          options={options}
        />
      )}
    </>
  );
}

export default FocusTimer;
