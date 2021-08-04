// here go the credits of all the things used in the project

// alien gif https://bestanimations.com/gifs/Little-Gray-Extraterrestrial-Alien-Face.html

import React from "react";

import "./styles.css";
// Import the necessary styles, or include them another way with your build process
import guelden from "../Components/guelden.png";
import zina from "../Components/zina.png";
import video from "../Components/video.mp4";
import claudia from "../Components/claudia.png";
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
        The Rocket Coder 🚀 was coded 👩🏻‍💻 by :
      </h2>
      <div>
        <div class="team">
          <div class="card">
            <div class="circle-container">
              <img src={guelden} alt="" width="255px" height="260px" />
            </div>
            <h2>Gülden</h2>
            <ul style={{ listStyleType: "none" }}>
              <li>
                {" "}
                <a
                  className="github"
                  href="https://www.linkedin.com/mwlite/in/gülden-bayar-705962218"
                >
                  Linkedin
                </a>
              </li>
              <li>
                {" "}
                <a className="github" href="https://github.com/GueldenBayar">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          <div class="card">
            <div class="circle-container">
              <img src={zina} alt="" width="255px" height="260px" />
            </div>
            <h2>Zina</h2>
            <ul style={{ listStyleType: "none" }}>
              <li>
                {" "}
                <a
                  className="github"
                  href="https://de.linkedin.com/in/zina-el-nahel"
                >
                  Linkedin
                </a>
              </li>
              <li>
                <a className="github" href="https://github.com/zinaelnahel">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          <div class="card">
            <div class="circle-container">
              <img src={claudia} alt="" width="255px" height="260px" />
            </div>
            <h2>Claudia</h2>
            <ul
              style={{ listStyleType: "none", textAlign: "center important!" }}
            >
              <li>
                <a
                  className="github"
                  href="https://www.linkedin.com/in/hello-world-claudia-here/"
                >
                  Linkedin
                </a>
              </li>
              <li>
                {" "}
                <a className="github" href="https://github.com/claurennt">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div></div>
        <video
          src={video}
          width="1000"
          height="500"
          autoplay="autoplay"
          controls="controls"
          style={{ marginLeft: "200px" }}
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
