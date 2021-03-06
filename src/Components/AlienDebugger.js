import React, { useEffect, useState, useMemo } from "react";

import axios from "axios";
import GoogleLinks from "./GoogleLinks.js";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useHistory, useLocation } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

// Material-UI imports
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Alien from "./Alien.gif";
import { Howl } from "howler";
import AlienSound from "./AlienSound.mp3";
import Typist from "react-typist";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    margin: "0 auto",
  },
  text: {
    fontFamily: "Audiowide",
    fontSize: "40px",
    color: "white",
    textAlign: "center",
    lineHeight: "1em",
  },
  textFetch: {
    fontFamily: "Audiowide",
    fontSize: "40px",
    color: "white",
    textAlign: "center",
    lineHeight: "1em",
    position: "absolute",
    top: "2%",
  },

  button: {
    position: "absolute",
    margin: "auto",
    right: 22,
    top: 72,
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    color: "#00FF41",
  },
  boxLinks: {
    position: "absolute",
    margin: "auto",
    right: 22,
    top: 100,
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    color: "#00FF41",
  },
  snack: { barContent: { maxWidth: 3 } },
});

export default function AlienDebugger() {
  const { listening, browserSupportsSpeechRecognition, finalTranscript } =
    useSpeechRecognition();
  const classes = useStyles();
  const [firstDialogue, setFirstDialogue] = useState(false);
  const [secondDialogue, setSecondDialogue] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  const [googleLinks, setGoogleLinks] = useState();

  let history = useHistory();
  let location = useLocation();
  console.log(location);

  const alienSound = useMemo(
    () =>
      new Howl({
        src: [AlienSound],
        loop: false,
        preload: true,
        autoplay: true,
        volume: 0.5,
        onend: () => {
          setFirstDialogue(true);
        },
      }),
    []
  );

  useEffect(() => {
    // stop the sound on route change
    history.listen((location) => {
      location.pathname === "/aliendebugger"
        ? alienSound.play()
        : alienSound.stop();
    });
  }, [history, alienSound]);

  useEffect(() => {
    if (!listening && finalTranscript) {
      console.log("send transcript to GoogleThis", finalTranscript);
      setIsFetching(true);
      axios
        .post("https://rocket-coder-backend.herokuapp.com/googlethis", {
          transcript: finalTranscript,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 400) {
            alert("Alien could not detect audio");
          } else {
            setGoogleLinks(res.data);
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  }, [listening, finalTranscript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  console.log(history);
  const handleClose = () => {
    setOpenSnack(false);
    setTimeout(() => {
      setSecondDialogue(true);
    }, 1000);
  };

  const handleSkipScript = () => {
    setFirstDialogue(false);
    setSecondDialogue(false);
    setOpenSnack(false);
    alienSound.stop();
    SpeechRecognition.startListening();
  };
  console.log(googleLinks);
  return (
    <>
      {!finalTranscript ? (
        <Button onClick={handleSkipScript} className={classes.button}>
          Skip ???
        </Button>
      ) : (
        <Button
          onClick={() => window.location.reload()}
          className={classes.button}
        >
          Again ???
        </Button>
      )}
      <Box style={{ backgroundColor: "black" }}>
        <Container className={classes.root}>
          <Box
            display="flex"
            flexDirection="column"
            position="absolute"
            margin="0 auto"
            right="5%"
          >
            {/* show links after backend response */}
            {googleLinks && !isFetching && (
              <>
                <GoogleLinks googleLinks={googleLinks} />
              </>
            )}
            {/* <div style={{ color: "white", paddingTop: "3em" }}>
              <p>For debugging purposes:</p>
              <p>listening: {listening ? "true" : "false"}</p>
              <p>Final Transcript: {finalTranscript}</p>
            </div> */}
          </Box>
        </Container>
      </Box>
      <div
        style={{
          background: `url(${Alien}) `,
          backgroundPosition: "0% 25%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          width: "100%",
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-end"
          style={{ height: "100vh" }}
        >
          {firstDialogue && !finalTranscript && (
            <Typist
              onTypingDone={() => {
                setTimeout(() => {
                  setFirstDialogue(false);
                }, 2000);
                setTimeout(() => {
                  setOpenSnack(true);
                }, 4000);
              }}
              className={classes.text}
              cursor={{ element: "" }}
            >
              <Typist.Delay ms={2000} />
              <p>Hi there, I am your alien debugger...</p>
              <p>Explain to me your code</p>
              <p>Tell me the type of errors you get...</p>
            </Typist>
          )}
          {secondDialogue && !finalTranscript && (
            <>
              <Typist
                onTypingDone={() => {
                  SpeechRecognition.startListening();
                }}
                className={classes.text}
                cursor={{ element: "" }}
              >
                <div>
                  <p>I will now help you</p>
                  <p>with my extraterrestrial powers</p>
                  <p>Speak now and tell me your wish!</p>
                </div>
              </Typist>
            </>
          )}
          {/* show what the user asked on screen */}
          {finalTranscript && (
            <Typist
              className={classes.text}
              cursor={{ element: "" }}
              onTypingDone={() => {
                setTimeout(() => {
                  setIsFetching(false);
                }, 2000);
              }}
            >
              <p>"{finalTranscript}"</p>

              <p>Allright, I'm on it...</p>
            </Typist>
          )}
        </Grid>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={openSnack}
        onClick={handleClose}
      >
        <SnackbarContent
          style={{
            backgroundColor: "#BDFFF3",
            color: "#5B217F",
          }}
          message={"Still stuck? Click here!"}
        />
      </Snackbar>
    </>
  );
}
