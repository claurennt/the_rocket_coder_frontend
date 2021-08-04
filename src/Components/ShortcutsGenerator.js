import React, { useState, useEffect, useCallback, useRef } from "react";

import "./Keyboard.css";

import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Chip from "@material-ui/core/Chip";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import ufo_icon from "./ufo_icon.png";
import { makeStyles } from "@material-ui/core/styles";

import MacKeyboard from "@uiw/react-mac-keyboard";
import { useSpring, animated } from "react-spring";

import Box from "@material-ui/core/Box";
import { ToastsContainer, ToastsStore } from "react-toasts";
const localStorageShortcutsNameSpace = process.env.REACT_APP_SHORTCUTSSPACE;

const useStyles = makeStyles((theme) => ({
  chip: {
    color: "red",
    border: "none",
    fontWeight: "bold",
  },
}));

export default function Keyboard() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [keyNr, setKeyNr] = useState([]);
  const [shortcut, setShortcut] = useState([]);
  const [shortcutComment, setShortcutComment] = useState("");
  const [shortcutName, setShortcutName] = useState([]);

  const inputRef = useRef(null);

  // save items on the local storage
  useEffect(() => {
    if (shortcutName.length) {
      localStorage.setItem(
        localStorageShortcutsNameSpace,
        JSON.stringify(shortcutName)
      );
    }
  }, [shortcutName]);

  // get items from local storage
  useEffect(() => {
    const json = localStorage.getItem(localStorageShortcutsNameSpace);
    const savedShortcuts = JSON.parse(json);
    if (savedShortcuts) {
      setShortcutName(savedShortcuts);
    }
  }, []);

  // entering animation fro keyboard
  const styles = useSpring({
    loop: false,
    to: [{ opacity: 1 }],
    from: { opacity: 0 },
    delay: 200,
  });
  const stylesText = useSpring({
    loop: false,
    to: [{ opacity: 1 }],
    from: { opacity: 0 },
    delay: 400,
  });

  // save key numbers in a state for the keyboard and keyCode that pressed in another state
  const handleKeyDown = useCallback(
    (e) => {
      if (shortcut.includes(e.which || keyNr.includes(e.key))) return;
      setKeyNr((prevKeyNr) => [...prevKeyNr, e.which]);
      setShortcut((prevKey) => [...prevKey, e.key]);
    },
    [shortcut, keyNr]
  );

  useEffect(() => {
    document.onkeydown = handleKeyDown;
  }, [handleKeyDown]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteShortcut = (i) => {
    let shortcutsClone = [...shortcutName];
    shortcutsClone.splice(i, 1);
    setShortcutName(shortcutsClone);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const newShortcut = {
      shortcut: shortcut.join("+"),
      comment: shortcutComment,
    };
    setShortcutName(
      shortcutName ? [...shortcutName, newShortcut] : newShortcut
    );

    ToastsStore.success("Shortcut saved!");
    setKeyNr("");
    setShortcut("");
    setShortcutComment("");
    inputRef.current.blur();
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        textAlign="center"
      >
        <Box>
          <Typography
            variant="h3"
            color="secondary"
            style={{ marginTop: "30px", fontSize: "2.75em", fontWeight: "500" }}
          >
            Shortcuts Generator
          </Typography>
        </Box>

        <Box style={{ margin: "0 auto" }}>
          <animated.div style={stylesText}>
            <form
              onSubmit={(e) => handleOnSubmit(e)}
              style={{
                margin: "0 auto",
                marginTop: "10px",
                marginBottom: "50px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <input
                style={{
                  width: "40vw",
                  textAlign: "center",
                  margin: "10px",
                  paddingTop: "40px",
                  fontSize: "1.25rem",
                  outline: "0",
                  borderWidth: "0 0 2px",
                  borderColor: "#00FF41",
                  focus: {
                    borderColor: "green",
                  },
                }}
                placeholder="What is this shortcut for?"
                ref={inputRef}
                label="Shortcut comment"
                name="textinput"
                value={shortcutComment}
                onFocus={() => {
                  console.log("focusinnnnng");
                  document.onkeydown = () => {};
                }}
                onChange={(e) => {
                  setShortcutComment(e.target.value);
                  localStorage.setItem("shortcutComment", e.target.value);
                }}
                onBlur={(e) => {
                  console.log("blurreeeeed");
                  document.onkeydown = handleKeyDown;
                }}
                onSubmit={() => {}}
              />
            </form>
          </animated.div>
          <ToastsContainer store={ToastsStore} />
        </Box>

        <animated.div style={styles}>
          <p
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginLeft: "5%",
              fontSize: "0.9rem",
              color: "#F5055A",
            }}
          >
            1. Type shortcut on your laptopkeyboard
          </p>
          <MacKeyboard
            keyCode={keyNr}
            onMouseDown={(e, item) => {
              console.log(e);
              if (item.keycode > -1) {
                if (keyNr.includes(item.keycode)) return;
                setKeyNr((prevKeyCodes) => [...prevKeyCodes, item.keycode]);
                setShortcut((prevKey) => [...prevKey, item.name]);
              }
            }}
          />
        </animated.div>

        <Button
          onClick={handleClickOpen}
          style={{
            backgroundColor: "white",
            border: "1px solid #00FF41",
            padding: "0",
            color: "black",
            width: "230px",
            margin: "0 auto",
            top: "30px",
          }}
        >
          See my shortcuts
          <img src={ufo_icon} key={24} style={{ width: "40px" }} alt="ufo" />
        </Button>
        <Dialog
          open={open}
          maxWidth="md"
          height="80vh"
          fullWidth
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"My Shortcuts"}</DialogTitle>
          <DialogContent style={{ height: "600px", overflow: "scroll" }}>
            <ul>
              {shortcutName &&
                shortcutName.map((s, i) => (
                  <DialogContentText
                    id="alert-dialog-description"
                    key={i + "0000"}
                  >
                    <li key={i}>
                      <span>
                        {" "}
                        <strong>{s.shortcut}</strong> = <em>{s.comment}</em>{" "}
                      </span>
                      <Chip
                        variant="outlined"
                        size="small"
                        label="౼"
                        className={classes.chip}
                        onClick={() => handleDeleteShortcut(i)}
                        key={i + "00"}
                      />
                    </li>
                  </DialogContentText>
                ))}
            </ul>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
}
