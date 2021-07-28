import React from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { useState } from "react";
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
import SpeechSynthesis from "./SpeechSynthetis";

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
  const classes = useStyles();
  const [firstDialogue, setFirstDialogue] = useState(true);
  const [secondDialogue, setSecondDialogue] = useState(false);
  // const [thirdDialogue, setThirdDialogue] = useState(false);

  const [openSnack, setOpenSnack] = useState(false);
  const [mute, setMute] = useState(false);

  const handleClose = () => {
    setOpenSnack(false);
    setTimeout(() => {
      setSecondDialogue(true);
    }, 1000);
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
      <SpeechSynthesis />
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
                    message={"Still Stuck? Click on me."}
                  />
                </Snackbar>
              </ClickAwayListener>
            </>
            {/* )} */}

            {secondDialogue && (
              <>
                <Typist
                  onTypingDone={() => setMute(false)}
                  // setThirdDialogue(true);

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
                <Typist.Delay ms={1000} />
                <div>
                  <SpeechSynthesis />
                </div>
              </>
            )}
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
