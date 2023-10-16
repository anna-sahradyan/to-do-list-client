import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Paper,
  TextField,
} from "@mui/material";
import { Title } from "./taskStyled";
import MenuItem from "@mui/material/MenuItem";
import UploadFile from "./UploadFile";
import { v4 as uuidv4 } from "uuid";
import moment from "moment/moment";
import toast from "react-hot-toast";

const Form = ({ setTasks, submitUpdate, edit }) => {
  const [flag, setFlag] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [task, setTask] = useState(() => {
    const defaultTask = {
      id: uuidv4(),
      title: "",
      body: "",
      subTitle: "",
      image: "",
      status: "queue",
      dueDate: moment().format("YY/DD/HH:mm"),
      priority: "",
      subTasks: "",
      creationDate: moment().format("YY/DD/HH:mm"),
      files: selectedFiles,
    };

    return edit ? { ...defaultTask, ...edit } : defaultTask;
  });
  useEffect(() => {
    if (edit && edit.id) {
      setTask({ ...task, ...edit });
    }
  }, [edit]);
  const handleClickOpen = () => {
    setOpen(true);
    setFlag(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTask("");
  };
  const handleFileChange = e => {
    const file = e.target.files[0];
    setSelectedFiles(e.target.files[0].name);
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result;
      setTask(prevTask => ({
        ...prevTask,
        image: imageUrl,
      }));
    };
    reader.readAsDataURL(file);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (edit && edit.id) {
      submitUpdate(edit.id, task);
    } else {
      if (task.title.length < 3 || task.body.length < 3)
        return toast.error(
          "A task must have more than 3 characters in both title and body",
        );
      if (task.title.length > 100 || task.body.length > 100)
        return toast.error(
          "A task must have less than 100 characters in both title and body",
        );
      const newTask = {
        ...task,
        files: selectedFiles,
        image: task.image,
      };
      setTasks(prev => {
        const list = [...prev, newTask];
        localStorage.setItem("tasks", JSON.stringify(list));
        return list;
      });
      toast.success("Task Created");
    }
    setOpen(false);
    setTask({
      id: "",
      title: "",
      body: "",
      image: "",
      subTitle: "",
      status: "queue",
      files: " ",
      priority: "",
      dueDate: moment().format("YY/DD/HH:mm"),
      subTasks: "",
      creationDate: moment().format("YY/DD/HH:mm"),
    });
    setSelectedFiles(null);
  };

  return (
    <>
      <Paper>
        <Button onClick={handleClickOpen}>Open form dialog</Button>
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <Title>Write the title and description here.</Title>
        <DialogContent>
          <FormControl onSubmit={e => e.preventDefault()}>
            <TextField
              id="outlined-multiline-flexible"
              label="Title"
              multiline
              maxRows={4}
              sx={{ margin: 1 }}
              value={task.title}
              onChange={e => setTask({ ...task, title: e.target.value })}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              multiline
              maxRows={4}
              sx={{ margin: 1 }}
              value={task.body}
              onChange={e => setTask({ ...task, body: e.target.value })}
            />
            <TextField
              id="due-date"
              label="Due Date"
              type="datetime-local"
              sx={{ margin: 1 }}
              value={task.dueDate}
              onChange={e => {
                setTask({ ...task, dueDate: e.target.value });
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="priority"
              label="Priority"
              select
              sx={{ margin: 1 }}
              value={task.priority}
              onChange={e => setTask({ ...task, priority: e.target.value })}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </TextField>
            <TextField
              id="sub-task"
              label="Sub-Tasks"
              multiline
              sx={{ margin: 1 }}
              value={task.subTasks}
              onChange={e => setTask({ ...task, subTasks: e.target.value })}
            />
            <UploadFile handleFileChange={handleFileChange} />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Form;
