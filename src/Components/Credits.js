// here go the credits of all the things used in the project

// alien gif https://bestanimations.com/gifs/Little-Gray-Extraterrestrial-Alien-Face.html

import React from "react";

import "./styles.css";
// Import the necessary styles, or include them another way with your build process
import "react-star-wars-crawl/lib/index.css";
import video from "../Components/video.mp4";
export default function Credits() {
  // const styles = {
  //   container: {
  //     width: "100%",
  //     height: "100%",
  //     background: "red",
  //     overflow: "hidden",
  //   },
  //   fade: {
  //     position: "relative",
  //     width: "100%",
  //     minHeight: "60vh",
  //     top: "-25px",
  //     backgroundImage: "linear-gradient(0deg, transparent, black 75%)",
  //     zIndex: 1,
  //   },
  //   textContainer: {
  //     display: "flex",
  //     justifyContent: "center",
  //     position: "relative",
  //     height: "800px",
  //     color: "#feda4a",
  //     fontFamily: "'Pathway Gothic One', sans-serif",
  //     fontSize: "500%",
  //     fontWeight: "600",
  //     letterSpacing: "6px",
  //     lineHeight: "150%",
  //     perspective: "400px",
  //     textAlign: "justify",
  //   },
  //   crawl: {
  //     position: "relative",
  //     top: "9999px",
  //     transformOrigin: "50% 100%",
  //     animation: "crawl 60s linear",
  //   },
  //   title: {
  //     fontSize: "20%",
  //     textAlign: "center",
  //   },
  //   subTitle: {
  //     margin: "0 0 100px",
  //     textTransform: "uppercase",
  //   },
  // };

  return (
    <>
      <h2 style={{ textAlign: "center", padding: "10px" }}>
        The Rocket Coder was coded by :
      </h2>
      <div>
        <div class="team">
          <div class="card">
            <div class="circle-container">
              <h1>C</h1>
            </div>
            <h2>Claudia</h2>
            <p>GitHub</p>
            <p>Linkedin</p>
          </div>

          <div class="card">
            <div class="circle-container">
              <h1>Z</h1>
            </div>
            <h2>Zina</h2>
            <p>GitHub</p>
            <p>Linkedin</p>
          </div>

          <div class="card">
            <div class="circle-container">
              <h1>Z</h1>
            </div>
            <h2>Gülden</h2>
            <p>GitHub</p>
            <p>Linkedin</p>
          </div>
        </div>
        <div></div>
        <video
          src={video}
          width="1550"
          height="500"
          autoplay="autoplay"
        ></video>
        {/* <div
          style={{
            position: "absolute",
            fontFamily: "'Pathway Gothic One', sans-serif",
          }}
        >
          <h1> Hiiiii </h1>
        </div> */}
        {/* <div
          style={{ height: "510px", marginTop: "200px", position: "absolute" }}
        > */}

        {/* </div> */}

        {/* <div style={{ maxHeight: "100px", position: "relative" }}>
          <Crawl
            title="Episode IV"
            subTitle="A New Hope"
            text="It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire. During the battle, Rebel spies managed to steal secret plans to the Empire’s ultimate weapon, the DEATH STAR, an armored space station with enough power to destroy an entire planet. Pursued by the Empire’s sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy…"
          />
        </div> */}
      </div>
    </>
  );
}
