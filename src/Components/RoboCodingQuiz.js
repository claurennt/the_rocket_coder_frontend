import React from "react";
import Quiz from "react-quiz-component";
import { quiz1 } from "./quiz1";
import Robot from "./Robot.jpeg";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));
const onCompleteAction = (obj) => {
  console.log(obj);
  // YOUR LOGIC GOES HERE
};
export default function RoboCodingQuiz() {
  const classes = useStyles();
  const [quiz, setQuiz] = React.useState(quiz1);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(5);

  const handleChange = (e) => {
    quiz1["landingHeaderText"] = `${e.target.value} Questions`;
    setValue(e.target.value);
    const test = Object.assign({}, quiz["questions"].slice(0, e.target.value));
    console.log(quiz1);
    console.log(test);
    setQuiz(test);
    console.log(quiz);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
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
        <FormControl
          className={classes.formControl}
          style={{ marginLeft: "200px" }}
        >
          <InputLabel id="demo-controlled-open-select-label">
            Questions
          </InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={value}
            onChange={handleChange}
            name="select"
          >
            <MenuItem value={5}>Five</MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={15}>Fifteen</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div
        className="quizes"
        style={{
          marginLeft: "180px",
          marginTop: "0px",
        }}
      >
        {quiz && (
          <Quiz
            quiz={quiz}
            shuffle={true}
            showDefaultResult={true}
            onComplete={onCompleteAction}
            showInstantFeedback={true}
          />
        )}
      </div>
    </div>
  );
}
