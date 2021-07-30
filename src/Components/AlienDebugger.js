import React, { useEffect, useState, useCallback } from "react";

import SnackbarContent from "@material-ui/core/SnackbarContent";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Alien from "./Alien.gif";
import AlienSound from "./AlienSound.mp3";
import Typist from "react-typist";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import ReactHowler from "react-howler";
import Snackbar from "@material-ui/core/Snackbar";
import Switch from "@material-ui/core/Switch";

import { withStyles } from "@material-ui/core/styles";
import GoogleLinks from "./GoogleLinks.js";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
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
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
    finalTranscript,
  } = useSpeechRecognition();

  const classes = useStyles();

  const [firstDialogue, setFirstDialogue] = useState(true);
  const [secondDialogue, setSecondDialogue] = useState(false);
  // const [mic, setMic] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [mute, setMute] = useState(false);
  const [googleLinks, setGoogleLinks] = useState();
  // const [recording, setRecording] = useState(finalTranscript);

  // useEffect(() => {
  //   SpeechRecognition.startListening();
  // }, [])

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleClose = () => {};

  // const handleClose = () => {
  //   setOpenSnack(false);
  //   setTimeout(() => {
  //     setSecondDialogue(true);
  //   }, 1000);
  // };

  const handleSkipScript = () => {
    setFirstDialogue(false);
    setSecondDialogue(false);
    setMute(false);
    setOpenSnack(false);
    // setMic(true);
  };
  // console.log(recording);

  function handlePostRequest(x) {
    console.log(transcript);
    // axios
    //   .post(
    //     "https://rocket-coder-backend.herokuapp.com/googlethis" /*"http://localhost:3005/googlethis"*/,
    //     transcript
    //   )
    //   .then((res) => {
    //     setIsFetching(true);
    //     console.log(res);
    //     if (res.status === 400) {
    //       alert("Alien could not detect audio");
    //     } else {
    //       setGoogleLinks(res.data);
    //       setIsFetching(false);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error.response);
    //   });
  }

  return (
    <React.Fragment>
      <ReactHowler
        src={`${AlienSound}`}
        playing={true}
        mute={mute}
        loop={true}
        volume={0.5}
      />
      {isFetching && (
        <Loader
          type="Rings"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      )}
      <Button onClick={() => handleSkipScript()} className={classes.button}>
        Skip ᐅ
      </Button>
      <Box style={{ backgroundColor: "black" }}>
        <Container className={classes.root}>
          <Box
            display="flex"
            flexDirection="column"
            position="absolute"
            margin="0 auto"
          >
            {firstDialogue && (
              <Typist
                onTypingDone={() => {
                  setTimeout(() => {
                    setFirstDialogue(false);
                  }, 2000);
                  setTimeout(() => {
                    setOpenSnack(true);
                  }, 5000);
                }}
                className={classes.text}
                cursor={{ element: "" }}
              >
                <Typist.Delay ms={2000} />
                <p>Hi there, I am your alien debugger.. </p>
                <p>Explain to me your code line by line...</p>
                <p>
                  Tell me which type of error are you getting and on which
                  line...
                </p>
              </Typist>
            )}

            <>
              <Snackbar
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                open={openSnack}
                // onClose={handleClose}
                onClick={() => setSecondDialogue(true)}
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

            {secondDialogue && (
              <>
                <Typist
                  onTypingDone={() => {
                    setMute(true);
                    console.log("listening");
                    SpeechRecognition.startListening();

                    // setTimeout(() => {
                    //   handlePostRequest();
                    // }, 15000);
                  }}
                  className={classes.text}
                  cursor={{ element: "" }}
                >
                  <div>
                    <p>
                      I will use my extraterrestrial powers to help unstuck
                      you... Talk to me...
                    </p>
                    <p>transcript: {transcript}</p>
                    <Button onClick={() => handlePostRequest("")}>
                      CLICK HERE
                    </Button>
                  </div>
                </Typist>
                {/* <ClickAwayListener
          onClickAway={handlePostRequest}
        ></ClickAwayListener> */}
              </>
            )}

            {googleLinks && <GoogleLinks googleLinks={googleLinks} />}
          </Box>

          <Typography
            component="div"
            style={{
              background: `url(${Alien}) `,
              backgroundPosition: "top",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              height: "100vh",
            }}
          />
        </Container>

        <AntSwitch
          checked={!mute}
          onChange={() => setMute(!mute)}
          name="muteMusic"
        />
      </Box>
    </React.Fragment>
  );
}
