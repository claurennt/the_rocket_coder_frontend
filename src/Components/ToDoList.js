import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import { useStyles } from "./MainBodyStyles";
import AddIcon from "@material-ui/icons/Add";
import List from "@material-ui/core/List";
import { nanoid } from "nanoid";
import { Scrollbars } from "react-custom-scrollbars";
import Task from "./Task";

const ToDo = () => {
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);

  const renderThumb = () => {
    const thumbStyle = {
      backgroundColor: "white",
      width: "1px",
    };
    return <div style={{ ...thumbStyle }} />;
  };

  // function to sort the order of the items in the list
  const compare = (a, b) => {
    if (a.createdAt > b.createdAt) return -1;
    if (b.createdAt > a.createdAt) return 1;
    return 0;
  };
  // function to add tasks
  const addNewTaskToList = (e) => {
    e.preventDefault();
    const newTask = {
      id: nanoid(),
      text: e.currentTarget.taskInput.value,
      checked: false,
      editing: false,
      createdAt: Date.now(),
    };
    setTasks(tasks ? [...tasks, newTask] : newTask);
    e.currentTarget.taskInput.value = "";
  };

  // function to toggle taskChecked property of clicked task based on id
  const toggleCheck = (id) => {
    const toggledtasks = tasks.map((task) => {
      if (task.id === id) {
        task.checked = !task.checked;
      }
      return task;
    });
    setTasks(toggledtasks);
  };

  // function to delete clicked task
  const deleteTask = (id) => {
    // updates state with all filtered tasks but the one we are clicking on(identified by id)
    const filteredtasks = tasks.filter((task) => id !== task.id);
    setTasks(filteredtasks);
  };

  // function to edit text
  const editTask = (id) => {
    // find the task we want to edit when we click on the edit button by the id and make it's editing prop to true
    const targetTask = tasks.find((task) => task.id === id);
    targetTask.editing = true;
    /*overwrite the state by inserting all the tasks that match the filter(i.e the tasks that are not the one we are editing)
     and the one we are editing separately (targetTask)*/
    setTasks([...tasks.filter((task) => task.id !== id), targetTask]);
  };

  /*After we edited and click outside(onBlur), we set the editing property
      back to false(i.e.contentEditable prop in the child = to false),
      then we subsitute the taskText property of that task with event.target.innerText and reupdate the state*/
  const finishEditingTask = (e, id) => {
    const targetTask = tasks.find((task) => task.id === id);
    targetTask.text = e.target.innerText;
    targetTask.editing = false;

    console.log({ target: e.target });
    setTasks([...tasks.filter((task) => task.id !== id), targetTask]);
  };

  return (
    <>
      <form onSubmit={addNewTaskToList}>
        <Input
          style={{ color: "white" }}
          className={classes.root}
          aria-describedby="todays-tasks"
          name="taskInput"
        />

        <IconButton aria-label="add" type="submit">
          <AddIcon style={{ color: "white", cursor: "pointer" }} />
        </IconButton>
      </form>
      <Scrollbars
        renderThumbVertical={renderThumb}
        style={{
          maxHeight: "30%",
          width: "auto",
          marginTop: "2.5rem",
        }}
      >
        <List>
          {tasks &&
            tasks
              .sort(compare)
              .map((task, index) => (
                <Task
                  key={index}
                  task={task}
                  toggleCheck={toggleCheck}
                  deleteTask={deleteTask}
                  editTask={editTask}
                  onFinishEditing={finishEditingTask}
                />
              ))}
        </List>
      </Scrollbars>
    </>
  );
};

export default ToDo;
