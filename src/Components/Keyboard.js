import React, { useState, useEffect } from "react";
import MacKeyboard from "@uiw/react-mac-keyboard";
import { useSpring, animated } from "react-spring";
import "./Keyboard.css";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import SpeedIcon from "@material-ui/icons/Speed";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
export default function Keyboard() {
  const [keyCombination, setKeyCombination] = useState([]);
  const [open, setOpen] = useState(false);
  const [keyNr, setKeyNr] = useState([]);

  // entering animation fro keyboard
  const styles = useSpring({
    loop: false,
    to: [{ opacity: 1 }],
    from: { opacity: 0 },
    delay: 200,
  });

  useEffect(() => {
    document.onkeydown = (e) => {
      if (keyCombination.includes(e.which || keyNr.includes(e.key))) return;
      setKeyNr((prevKeyNr) => [...prevKeyNr, e.which]);
      setKeyCombination((prevKey) => [...prevKey, e.key]);
    };
  }, [keyCombination, keyNr]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      textAlign="center"
    >
      <Box justifyContent="flex-end">
        <Typography variant="h3" color="secondary" justifyContent="flex-end">
          Shortcuts Generator
        </Typography>
      </Box>
      {keyCombination && (
        <Box style={{ margin: "0 auto" }}>
          <TextareaAutosize
            style={{ width: "40vw", textAlign: "center", margin: "0 auto" }}
            aria-label="empty textarea"
            placeholder="Your shortcut combination will be desplayed here..."
            value={keyCombination
              .map((key) => {
                return key;
              })
              .join("+")}
          />
        </Box>
      )}
      <Button
        style={{
          maxWidth: "30px",
          maxHeight: "30px",
          minWidth: "30px",
          minHeight: "30px",
        }}
        onClick={handleClickOpen}
      >
        <SpeedIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <animated.div style={styles}>
        <MacKeyboard
          keyCode={keyNr}
          // onMouseDown={(e, item) => {
          //   console.log(e);
          //   if (item.keycode > -1) {
          //     if (keyNr.includes(item.keycode)) return;
          //     setKeyNr((prevKeyCodes) => [...prevKeyCodes, item.keycode]);
          //     setKeyCombination((prevKey) => [...prevKey, item.name[0]]);
          //   }
          // }}
        />
        <button onClick={() => setKeyCombination([])}>reset keys</button>
      </animated.div>
    </Box>
  );
}
