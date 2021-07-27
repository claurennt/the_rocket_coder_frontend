import React from "react";
import Quiz from "react-quiz-component";
import { quiz } from "./quiz";
import Robot from "./Robot.jpeg";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
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
}));
const onCompleteAction = (obj) => {
  console.log(obj);
  // YOUR LOGIC GOES HERE
};
export default function RoboCodingQuiz() {
  const { questions } = quiz;
  console.log(questions);
  const classes = useStyles();
  const [question, setQuestions] = React.useState();
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setQuestions(event.target.value);
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
            value={question}
            onChange={handleChange}
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
        {/* {for (let = 1; i<questions.lenght)} */}
        <Quiz
          quiz={quiz}
          shuffle={true}
          showDefaultResult={true}
          onComplete={onCompleteAction}
          showInstantFeedback={true}
        />
      </div>
    </div>
  );
}
