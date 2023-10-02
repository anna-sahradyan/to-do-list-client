import React, { useState } from "react";
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

const Form = ({ tasks, setTasks }) => {
  const [flag, setFlag] = useState(false);
  const [priority, setPriority] = useState("low");
  const [subTaskInput, setSubTaskInput] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [image, setImage] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [dueDate, setDueDate] = useState("");
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [task, setTask] = useState({
    id: uuidv4(),
    title: "",
    body: "",
    subTitle: "",
    image: "",
    status: "queue",
    dueDate: "",
    priority: "",
    subTasks: [],
    creationDate: moment().format("DD/MM/YY/HH:mm"),
    files: selectedFiles,
  });

  const handleClickOpen = () => {
    setOpen(true);
    setFlag(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleFileChange = e => {
    const file = e.target.files[0];
    setSelectedFiles(e.target.files[0].name);
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result; // Get the data URL
      setTask(prevTask => ({
        ...prevTask,
        image: imageUrl,
      }));
    };
    reader.readAsDataURL(file);
  };
  const handleSubmit = e => {
    e.preventDefault();
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
      dueDate: dueDate,
      files: selectedFiles,
      image: task.image,
      priority: priority,
    };
    setTasks(prev => {
      const list = [...prev, newTask];
      localStorage.setItem("tasks", JSON.stringify(list));
      return list;
    });
    toast.success("Task Created");
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
      creationDate: moment().format("YY/DD/HH:mm"),
    });
    setDueDate("");
    setSelectedFiles(null);
  };
  const handleAddSubTask = () => {};
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
              value={dueDate}
              onChange={e => {
                setDueDate(e.target.value);
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
              value={priority}
              onChange={e => setPriority(e.target.value)}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </TextField>
            {flag && (
              <>
                <TextField
                  id="sub-task"
                  label="Sub-Task"
                  sx={{ margin: 1 }}
                  value={subTaskInput}
                  onChange={e => setSubTaskInput(e.target.value)}
                />
                <Button onClick={handleAddSubTask}>Add Sub-Task</Button>
                <UploadFile handleFileChange={handleFileChange} />
              </>
            )}
            {/*<UploadFile handleFileChange={handleFileChange} />*/}
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