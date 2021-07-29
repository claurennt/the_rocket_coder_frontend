import React, { useState } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
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
import MicOffOutlinedIcon from "@material-ui/icons/MicOffOutlined";
import { withStyles } from "@material-ui/core/styles";
import GoogleLinks from "./GoogleLinks.js";
import RotateLeftOutlinedIcon from "@material-ui/icons/RotateLeftOutlined";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import MicNoneOutlinedIcon from "@material-ui/icons/MicNoneOutlined";
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
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const classes = useStyles();
  const [firstDialogue, setFirstDialogue] = useState(true);
  const [secondDialogue, setSecondDialogue] = useState(false);
  const [mic, setMic] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [mute, setMute] = useState(false);
  const [googleLinks, setGoogleLinks] = useState();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleClose = () => {
    setOpenSnack(false);
    setTimeout(() => {
      setSecondDialogue(true);
    }, 1000);
  };

  const handlePostRequest = () => {
    SpeechRecognition.stopListening();
    axios
      .post(
        "https://rocket-coder-backend.herokuapp.com/googlethis" /*http://localhost:3001/googlethis*/,
        { transcript: transcript }
      )
      .then((res) => {
        setIsFetching(true);
        setMic(false);
        console.log(res);

        if (res.status === 400) {
          alert("Alien could not detect audio");
        } else {
          setGoogleLinks(res.data);
          setIsFetching(false);
        }
      })
      .catch((error) => {
        console.log("Could not help you");
        console.log(error.message);
      });
  };

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
              <ClickAwayListener onClickAway={handleClose}>
                <Snackbar
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  open={openSnack}
                  onClose={handleClose}
                >
                  <SnackbarContent
                    style={{
                      backgroundColor: "#BDFFF3",
                      color: "#5B217F",
                    }}
                    message={"Still stuck? Click me.->"}
                  />
                </Snackbar>
              </ClickAwayListener>
            </>

            {secondDialogue && (
              <>
                <Typist
                  onTypingDone={() => {
                    setTimeout(() => {
                      setSecondDialogue(false);
                      setMic(true);
                    }, 2000);
                    setMute(true);
                  }}
                  className={classes.text}
                  cursor={{ element: "" }}
                >
                  <div>
                    <p>
                      I will use my extraterrestrial powers to help unstuck
                      you...{" "}
                    </p>
                  </div>
                </Typist>
              </>
            )}
            {mic && (
              <>
                <Box display="flex" flexDirection="row">
                  <Button onClick={SpeechRecognition.startListening}>
                    <MicNoneOutlinedIcon />
                  </Button>
                  <Button onClick={() => handlePostRequest()}>
                    <MicOffOutlinedIcon />
                  </Button>
                  <Button onClick={resetTranscript}>
                    <RotateLeftOutlinedIcon />
                  </Button>
                  <p className={classes.text}>{transcript}</p>
                </Box>
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
