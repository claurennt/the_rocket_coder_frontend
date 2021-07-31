// https://material-ui.com/components/drawers/
// use Audiowave font (linked in sidebar.css)
// look for icons and credit where they r taken from in the credits on the bottom
// create routes for each component in the sidebar
// styling should also be relevant to the projec design
import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
// import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PublicIcon from "@material-ui/icons/Public";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
// import MusicNoteIcon from "@material-ui/icons/MusicNote";
import MenuIcon from "@material-ui/icons/Menu";
import {
  AlienOutline,
  // Telescope,
  RobotLoveOutline,
  RocketLaunchOutline,
} from "mdi-material-ui";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 200,

    paddingTop: "10px",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
}));

export default function SwipeableTemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="none presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className={classes.list}>
        {["Home"].map((text, index) => (
          <Link to="/" className={classes.link} key={index}>
            <ListItem button>
              <ListItemIcon>
                <HomeOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body2">{text}</Typography>}
              />
            </ListItem>
          </Link>
        ))}
      </List>
      <List className={classes.list}>
        {["Alien Debugger"].map((text, index) => (
          <Link to="/aliendebugger" className={classes.link} key={index}>
            <ListItem button>
              <ListItemIcon>
                <AlienOutline />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body2">{text}</Typography>}
              />
            </ListItem>
          </Link>
        ))}
      </List>
      <List>
        {["Focus Timer"].map((text, index) => (
          <Link to="/focustimer" className={classes.link} key={index}>
            <ListItem button>
              <ListItemIcon>
                <PublicIcon />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body2">{text}</Typography>}
              />
            </ListItem>
          </Link>
        ))}
      </List>
      {/* <List>
        {["Discover Events"].map((text, index) => (
          <Link to="/discoverevents" className={classes.link} key={index}>
            <ListItem button>
              <ListItemIcon>
                <Telescope />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body2">{text}</Typography>}
              />
            </ListItem>
          </Link>
        ))}
      </List> */}
      <List>
        {["Robo Coding Quiz"].map((text, index) => (
          <Link to="/robocodingquiz" className={classes.link} key={index}>
            <ListItem button key={index}>
              <ListItemIcon>
                <RobotLoveOutline />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body2">{text}</Typography>}
              />
            </ListItem>
          </Link>
        ))}
      </List>
      <List>
        {["Shortcuts"].map((text, index) => (
          <Link to="/shortcuts" className={classes.link} key={index}>
            <ListItem button key={index}>
              <ListItemIcon>
                <RocketLaunchOutline />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body2">{text}</Typography>}
              />
            </ListItem>
          </Link>
        ))}
      </List>
      <List>
        {["Credits"].map((text, index) => (
          <Link to="/shortcuts" className={classes.link}>
            <ListItem button key={index}>
              <ListItemText
                primary={<Typography variant="body2">{text}</Typography>}
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <>
      {["left"].map((anchor, index) => (
        <React.Fragment key={index}>
          <Button
            onClick={toggleDrawer(anchor, true)}
            style={{
              position: "absolute",
              margin: "auto",
              left: 0,
              top: 0,
              color: "#00FF41",
            }}
          >
            <MenuIcon />
            MENU
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </>
  );
}
