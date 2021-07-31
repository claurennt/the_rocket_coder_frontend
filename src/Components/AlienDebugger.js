<<<<<<< HEAD
import React, { useState } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
=======
import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
>>>>>>> 3d6a27d09706352415b017b12def22b1547bedd1
import SnackbarContent from "@material-ui/core/SnackbarContent";
import axios from "axios";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Alien from "./Alien.gif";
import { Howl } from "howler";
import AlienSound from "./AlienSound.mp3";
import Typist from "react-typist";
import { makeStyles } from "@material-ui/core/styles";

import Snackbar from "@material-ui/core/Snackbar";
import Switch from "@material-ui/core/Switch";

import { withStyles } from "@material-ui/core/styles";
import GoogleLinks from "./GoogleLinks.js";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Button from "@material-ui/core/Button";

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
    marginRight: "150px",
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

  snack: { barContent: { maxWidth: 3 } },
});

const AntSwitch = withStyles((theme) => ({
  root: {
    position: "absolute",
    margin: "auto",
    right: 22,
    top: 22,
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: true,
}))(Switch);

export default function AlienDebugger({ checked, handleChangeMusic }) {
  const {
    // transcript,
    listening,

    browserSupportsSpeechRecognition,
    finalTranscript,
  } = useSpeechRecognition();
  const classes = useStyles();
  const [firstDialogue, setFirstDialogue] = useState(false);
  const [secondDialogue, setSecondDialogue] = useState(false);
  // const [isFetching, setIsFetching] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [mute, setMute] = useState(false);
  const [googleLinks, setGoogleLinks] = useState();

  useEffect(() => {
    const alienSound = new Howl({
      src: [AlienSound],
      loop: false,
      preload: true,
      volume: 0.5,
      onend: () => {
        setFirstDialogue(true);
      },
    });
    alienSound.play();
  }, []);

  useEffect(() => {
    if (!listening && finalTranscript) {
      console.log("send transcript to GoogleThis", finalTranscript);
      axios
        .post("https://rocket-coder-backend.herokuapp.com/googlethis", {
          transcript: finalTranscript,
        })
        .then((res) => {
          // setIsFetching(true);
          console.log(res);
          if (res.status === 400) {
            alert("Alien could not detect audio");
          } else {
            setGoogleLinks(res.data);
            // setIsFetching(false);
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

  const handleClose = () => {
    setOpenSnack(false);
    setTimeout(() => {
      setSecondDialogue(true);
    }, 1000);
  };

  const handleSkipScript = () => {
    setFirstDialogue(false);
    setSecondDialogue(false);
    setMute(false);
    setOpenSnack(false);
    SpeechRecognition.startListening();
  };

  return (
    <>
      <Button onClick={handleSkipScript} className={classes.button}>
        {!finalTranscript ? "Skip ᐅ" : "Again ᐅ"}
      </Button>
      <Box style={{ backgroundColor: "black" }}>
        <Container className={classes.root}>
          <Box
            display="flex"
            flexDirection="column"
            position="absolute"
            margin="0 auto"
          >
            <div style={{ color: "white", paddingTop: "3em" }}>
              <p>For debugging purposes:</p>
              <p>listening: {listening ? "true" : "false"}</p>
              <p>Final Transcript: {finalTranscript}</p>
            </div>

            {googleLinks && <GoogleLinks googleLinks={googleLinks} />}
          </Box>
        </Container>

        <AntSwitch
          checked={!mute}
          onChange={() => setMute(!mute)}
          name="muteMusic"
        />
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
              <p>Hi there, I am your alien debugger.. </p>
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
                  {/* <Button onClick={() => handlePostRequest("")}>
                    CLICK HERE
                  </Button> */}
                </div>
              </Typist>
              {/* <ClickAwayListener
                    onClickAway={handlePostRequest}
                  ></ClickAwayListener> */}
            </>
          )}
          {finalTranscript && (
            <Typist
              // onTypingDone={() => {
              //   console.log("firing request");
              // }}
              className={classes.text}
              cursor={{ element: "" }}
            >
              <p>{finalTranscript}</p>
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
          message={"Still stuck? Click me 👽"}
        />
      </Snackbar>
    </>
  );
}
