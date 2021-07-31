import React, { useState } from "react";
import Quiz from "react-quiz-component";
import { quiz1 } from "./quiz1";
import Robot from "./Robot.jpeg";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  box: {
    display: "flex",
    flexDirection: "column",
    width: "40%",
    marginLeft: "12%",
  },
  againBtn: {
    display: "flex",
    justifyContent: "flex-start",
    color: "#00FF41",
    paddingLeft: "0",
  },
}));

export default function RoboCodingQuiz() {
  const classes = useStyles();
  const [quiz, setQuiz] = React.useState(quiz1);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState();
  const [playAgainBtn, setPlayAgainBtn] = useState(false);

  const handleChange = (e) => {
    console.log(e);
    setValue(e.target.value);

    const arbitraryNrOfQuestions = {
      ...quiz1,
      questions: quiz1.questions.slice(0, e.target.value),
    };
    console.log({ arbitraryNrOfQuestions });
    setQuiz(arbitraryNrOfQuestions);
    // console.log(quiz);
  };

  const onQuizEnd = () => {
    setPlayAgainBtn(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div
      className="background"
      style={{
        background: ` url(${Robot}`,
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <div>
        <Box className={classes.box}>
          <h2>Welcome to the RoboQuiz</h2>
          <h3>
            This quiz is designed for you to refresh your coding skills and help
            you on your journey to becoming a Rocket Coder 🚀
          </h3>
          {playAgainBtn && (
            <>
              <Button className={classes.againBtn} onClick={refreshPage}>
                Play Again ↺
              </Button>
            </>
          )}
        </Box>
        {!value && (
          <FormControl
            className={classes.formControl}
            style={{ marginLeft: "200px" }}
          >
            <p>Choose number of questions:</p>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={value}
              onChange={handleChange}
              name="select"
              style={{ width: "50%" }}
            >
              <MenuItem value={1}>One</MenuItem>
              <MenuItem value={2}>Two</MenuItem>
              <MenuItem value={3}>Three</MenuItem>
              <MenuItem value={5}>Five</MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={15}>Fifteen</MenuItem>
            </Select>
          </FormControl>
        )}
      </div>
      <div
        className="quizes"
        style={{
          marginLeft: "180px",
          marginTop: "0px",
        }}
      >
        {value && quiz && (
          <Quiz
            quiz={quiz}
            shuffle={true}
            showDefaultResult={true}
            showInstantFeedback={true}
            onComplete={onQuizEnd}
          />
        )}
      </div>
    </div>
  );
}
