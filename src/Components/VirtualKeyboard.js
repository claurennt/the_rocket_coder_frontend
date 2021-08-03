import MacKeyboard from "@uiw/react-mac-keyboard";
import { useSpring, animated } from "react-spring";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

export default function VirtualKeyboard({
  shortcut,
  shortcutComment,
  handleKeyDown,
  setShortcutComment,
  keyNr,
}) {
  // entering animation fro keyboard
  const styles = useSpring({
    loop: false,
    to: [{ opacity: 1 }],
    from: { opacity: 0 },
    delay: 200,
  });

  return (
    <>
      {shortcut && (
        <Box style={{ margin: "0 auto" }}>
          <TextField
            style={{
              width: "40vw",
              textAlign: "center",
              margin: "60px",
            }}
            id="outlined-helperText"
            label="Shortcut comment"
            helperText="Add here a comment for your shortcut"
            variant="outlined"
            value={shortcutComment}
            onBlur={() => {
              console.log("blurreeeeed");
              document.onkeydown = handleKeyDown;
            }}
            onFocus={() => {
              console.log("focusinnnnng");
              document.onkeydown = () => {};
            }}
            onChange={(e) => {
              setShortcutComment(e.target.value);
            }}
          />
        </Box>
      )}
      <animated.div style={styles}>
        <MacKeyboard
          keyCode={keyNr}
          // onMouseDown={(e, item) => {
          //   console.log(e);
          //   if (item.keycode > -1) {
          //     if (keyNr.includes(item.keycode)) return;
          //     setKeyNr((prevKeyCodes) => [...prevKeyCodes, item.keycode]);
          //     setshortcut((prevKey) => [...prevKey, item.name[0]]);
          //   }
          // }}
        />
      </animated.div>
    </>
  );
}
