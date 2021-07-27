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

export default function AlienDebugger() {
  const classes = useStyles();
  const [firstDialogue, setFirstDialogue] = useState(true);
  const [secondDialogue, setSecondDialogue] = useState(false);
  // const [thirdDialogue, setThirdDialogue] = useState(false);

  const [openSnack, setOpenSnack] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
    setSecondDialogue(false);
  };

  return (
    <React.Fragment>
      <ReactHowler src={`${AlienSound}`} playing={true} />
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
                  setFirstDialogue(false);
                  setTimeout(() => {
                    setOpenSnack(true);
                  }, 5000);
                }}
                className={classes.text}
                cursor={{ element: "" }}
              >
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
                  autoHideDuration={6000}
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
              <Typist
                onTypingDone={() => {
                  setSecondDialogue(false);
                  // setThirdDialogue(true);
                }}
                className={classes.text}
                cursor={{ element: "" }}
              >
                <p></p>
                <p>
                  {" "}
                  I will use my extraterrestrial powers to help unstuck you...{" "}
                </p>
              </Typist>
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
      </Box>
    </React.Fragment>
  );
}
