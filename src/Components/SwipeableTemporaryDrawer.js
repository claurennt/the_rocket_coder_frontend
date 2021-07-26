// https://material-ui.com/components/drawers/
// use Audiowave font (linked in sidebar.css)
// look for icons and credit where they r taken from in the credits on the bottom
// create routes for each component in the sidebar
// styling should also be relevant to the projec design
import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PublicIcon from "@material-ui/icons/Public";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import MenuIcon from "@material-ui/icons/Menu";
import {
  AlienOutline,
  Telescope,
  RobotLoveOutline,
  RocketLaunchOutline,
} from "mdi-material-ui";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AlienDebugger from "./SidebarComponents/AlienDebugger";
import DiscoverEvents from "./SidebarComponents/DiscoverEvents";
import FocusTimer from "./SidebarComponents/FocusTimer";
import RoboCodingQuiz from "./SidebarComponents/RoboCodingQuiz";
import Shortcuts from "./SidebarComponents/Shortcuts";
import SpaceMusic from "./SidebarComponents/SpaceMusic";

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
    <Router>
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === "top" || anchor === "bottom",
        })}
        role="none presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {/* {["Alien Debugger", "Focus Timer"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <AlienOutline /> : <PublicIcon />}
            </ListItemIcon>
            <ListItemText secondary={text} />
          </ListItem>
        ))}
      </List>
      <List>
        {["Discover Events", "Space Music"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <Telescope /> : <MusicNoteIcon />}
            </ListItemIcon>
            <ListItemText secondary={text} />
          </ListItem>
        ))}
      </List>

      <List>
        {["Robo Quiz", "Shortcuts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <RobotLoveOutline /> : <RocketLaunchOutline />}
            </ListItemIcon>
            <ListItemText secondary={text} />
          </ListItem>
        ))}
      </List>

      <List>
        {["Credits"].map((text, index) => (
          <ListItem button key={text} bottom="1px">
            <ListItemText secondary={text} />
          </ListItem>
        ))}
      </List> */}

          {["Alien Debugger"].map((text, index) => (
            <Link to="/aliendebugger" className={classes.link}>
              <ListItem button key={text}>
                <ListItemIcon>
                  <AlienOutline />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <List>
          {["Focus Timer"].map((text, index) => (
            <Link to="/focustimer" className={classes.link}>
              <ListItem button key={text}>
                <ListItemIcon>
                  <PublicIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <List>
          {["Discover Events"].map((text, index) => (
            <Link to="/discoverevents" className={classes.link}>
              <ListItem button key={text}>
                <ListItemIcon>
                  <Telescope />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <List>
          {["Space Music"].map((text, index) => (
            <Link to="/spacemusic" className={classes.link}>
              <ListItem button key={text}>
                <ListItemIcon>
                  <MusicNoteIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {["Robo Coding Quiz"].map((text, index) => (
            <Link to="/robocodingquiz" className={classes.link}>
              <ListItem button key={text}>
                <ListItemIcon>
                  <RobotLoveOutline />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <List>
          {["Shortcuts"].map((text, index) => (
            <Link to="/shortcuts" className={classes.link}>
              <ListItem button key={text}>
                <ListItemIcon>
                  <RocketLaunchOutline />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
      </div>
    </Router>
  );

  return (
    <div
      className="drawer"
      style={{
        backgroundColor: "hsla(0, 0%, 0%, 0)",
        display: "inline",
      }}
    >
      <Router>
        <div>
          {["left"].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button
                onClick={toggleDrawer(anchor, true)}
                style={{
                  backgroundColor: "hsla(0, 0%, 0%, 0)",
                  color: "white",
                }}
                text={{ text: "click" }}
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
          <Switch />
          <Route path="/aliendebugger" component={AlienDebugger} />
          <Route path="/discoverevents" component={DiscoverEvents} />
          <Route path="/focustimer" component={FocusTimer} />
          <Route path="/robocodingquiz" component={RoboCodingQuiz} />
          <Route path="/shortcuts" component={Shortcuts} />
          <Route path="/spacemusic" component={SpaceMusic} />
          <Switch />
        </div>
      </Router>
    </div>
  );
}
