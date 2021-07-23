import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";

import ListItemText from "@material-ui/core/ListItemText";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import { withStyles } from "@material-ui/core/styles";

import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@material-ui/icons/CheckBoxOutlineBlankOutlined";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import { useSpring, animated } from "react-spring";

const useStyles = makeStyles((theme) => ({
  listItem: {
    width: "50%",
    margin: "0 auto",
    background: "#628395",
    color: "white",
    padding: "0px",
  },
  checkBox: {
    color: "white",
  },
}));

export default function Task({
  toggleCheck,
  task,
  deleteTask,
  editTask,
  onFinishEditing,
}) {
  const classes = useStyles();
  const { id, text, checked, editing } = task;

  const { x } = useSpring({
    from: { x: 0 },
    x: checked ? 0 : 1,
    config: { duration: 400 },
  });

  return (
    <animated.div
      style={{
        opacity: x.to({ range: [0, 1], output: [0.3, 0.8] }),
      }}
    >
      <ListItem
        dense
        className={classes.listItem}
        onBlur={(e) => onFinishEditing(e, id)}
      >
        {" "}
        {!checked ? (
          <CheckBoxOutlineBlankOutlinedIcon
            className={classes.checkBox}
            onClick={() => toggleCheck(id)}
            style={{ fill: "white" }}
          />
        ) : (
          <CheckBoxOutlinedIcon
            onClick={() => toggleCheck(id)}
            className={classes.checkBox}
            style={{ fill: "white" }}
          />
        )}
        {/* <WhiteCheckbox checked={checked} name="checkedG" fontSize="small" /> */}
        <ListItemText
          contentEditable={editing ? "true" : "false"}
          suppressContentEditableWarning={true}
          primary={text}
          style={{ marginLeft: "10px" }}
        />{" "}
        <EditOutlinedIcon
          style={{ cursor: "pointer" }}
          className={classes.icon}
          onClick={() => {
            editTask(id);
          }}
        />
        <DeleteOutlinedIcon
          style={{ cursor: "pointer" }}
          className={classes.icon}
          onClick={() => deleteTask(id)}
        />
      </ListItem>
    </animated.div>
  );
}
