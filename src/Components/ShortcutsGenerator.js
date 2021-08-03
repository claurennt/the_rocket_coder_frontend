import React, { useState, useEffect, useCallback } from "react";

import "./Keyboard.css";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import VirtualKeyboard from "./VirtualKeyboard";
import ufo_icon from "./ufo_icon.png";

export default function Keyboard() {
  const [open, setOpen] = useState(false);
  const [keyNr, setKeyNr] = useState([]);
  const [shortcut, setShortcut] = useState([]);

  const [shortcutComment, setShortcutComment] = useState("");
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

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      textAlign="center"
    >
      <Box>
        <Typography variant="h3" color="secondary">
          Shortcuts Generator
        </Typography>
      </Box>
      <VirtualKeyboard
        shortcut={shortcut}
        shortcutComment={shortcutComment}
        handleKeyDown={handleKeyDown}
        setShortcutComment={setShortcutComment}
        keyNr={keyNr}
      />
      <Button
        style={{
          maxWidth: "30px",
          maxHeight: "30px",
          minWidth: "30px",
          minHeight: "30px",
        }}
        onClick={handleClickOpen}
      >
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
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent style={{ height: "600px" }}>
          <DialogContentText id="alert-dialog-description">
            {shortcut}= {shortcutComment}}
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
    </Box>
  );
}
