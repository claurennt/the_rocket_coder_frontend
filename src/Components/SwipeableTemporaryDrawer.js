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

import MenuIcon from "@material-ui/icons/Menu";
import { AlienOutline, RobotLoveOutline } from "mdi-material-ui";
import ufo_icon from "./ufo_icon.png";
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
          <Link to="/" className={classes.link} key={1}>
            <ListItem button key={2}>
              <ListItemIcon key={3}>
                <HomeOutlinedIcon key={4} />
              </ListItemIcon>
              <ListItemText
                key={5}
                primary={<Typography variant="body2">{text}</Typography>}
              />
            </ListItem>
          </Link>
        ))}
      </List>
      <List className={classes.list}>
        {["Alien Debugger"].map((text, index) => (
          <Link to="/aliendebugger" className={classes.link} key={6}>
            <ListItem button key={7}>
              <ListItemIcon key={8}>
                <AlienOutline key={9} />
              </ListItemIcon>
              <ListItemText
                key={10}
                primary={<Typography variant="body2">{text}</Typography>}
              />
            </ListItem>
          </Link>
        ))}
      </List>
      <List>
        {["Focus Timer"].map((text, index) => (
          <Link to="/focustimer" className={classes.link} key={11}>
            <ListItem button key={12}>
              <ListItemIcon key={13}>
                <PublicIcon key={14} />
              </ListItemIcon>
              <ListItemText
                key={15}
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
          <Link to="/robocodingquiz" className={classes.link} key={16}>
            <ListItem button key={17}>
              <ListItemIcon key={18}>
                <RobotLoveOutline key={19} />
              </ListItemIcon>
              <ListItemText
                key={20}
                primary={<Typography variant="body2">{text}</Typography>}
              />
            </ListItem>
          </Link>
        ))}
      </List>
      <List>
        {["Shortcuts Generator"].map((text, index) => (
          <Link to="/shortcutsgenerator" className={classes.link} key={21}>
            <ListItem button key={22}>
              <ListItemIcon key={23}>
                <img
                  src={ufo_icon}
                  key={24}
                  style={{ width: "24px", margin: "0", padding: "0" }}
                  alt="ufo"
                />
              </ListItemIcon>
              <ListItemText
                key={25}
                primary={<Typography variant="body2">{text}</Typography>}
              />
            </ListItem>
          </Link>
        ))}
      </List>
      <List>
        {["Credits"].map((text, index) => (
          <Link to="/credits" className={classes.link} key={26}>
            <ListItem button key={27}>
              <ListItemText
                key={28}
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
            id="menu"
            onClick={toggleDrawer(anchor, true)}
            style={{
              position: "absolute",
              margin: "auto",
              left: 0,
              top: 0,
              color: "#00FF41",
            }}

            // text={{ text: "click" }}
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
