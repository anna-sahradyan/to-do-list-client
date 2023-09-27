import React, { useState } from "react";
import { Nav, Title, Wrapper, WrapperToDoList } from "./taskStyled";
import SearchIcon from "@mui/icons-material/Search";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  Paper,
  InputBase,
  TextField,
  FormControl,
} from "@mui/material";
import toast from "react-hot-toast";

const CreateTask = ({ tasks, desc, setTasks, setDesc }) => {
  const [open, setOpen] = React.useState(false);
  const [task, setTask] = useState({
    id: " ",
    title: " ",
    body: " ",
    subTitle: "",
    status: " ",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    if (task.title.length < 3 || task.body.length < 3)
      return toast.error(
        "A task must have more than 3 characters in both title and body",
      );
    if (task.title.length > 100 || task.body.length > 100)
      return toast.error(
        "A task must have less than 100 characters in both title and body",
      );
    setTasks(prev => {
      const list = [...prev, task];
      localStorage.setItem("tasks", JSON.stringify(list));
      return list;
    });

    toast.success("Task Created");
    setOpen(false);
    setTask({
      id: uuidv4(),
      title: "",
      body: "",
      subTitle: "",
      status: "",
    });
  };
  console.log(task.title);
  console.log(task.body);
  return (
    <>
      <Wrapper>
        <Nav>
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
                  onChange={e =>
                    setTask({ ...task, id: uuidv4(), title: e.target.value })
                  }
                />
                <TextField
                  id="outlined-multiline-flexible"
                  label="Description"
                  multiline
                  maxRows={4}
                  sx={{ margin: 1 }}
                  value={task.body}
                  onChange={e =>
                    setTask({ ...task, id: uuidv4(), body: e.target.value })
                  }
                />
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSubmit}>Add</Button>
            </DialogActions>
          </Dialog>

          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search in your to-do list. "
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          </Paper>
        </Nav>
        <WrapperToDoList></WrapperToDoList>
      </Wrapper>
    </>
  );
};

export default CreateTask;