import React, { useState } from "react";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, Drawer } from "@mui/material";
import toast from "react-hot-toast";

import Form from "./Form";
import {
  PartDrawer,
  TaskDescDrawer,
  TaskSubTaskLi,
  TaskSubTaskUl,
  TaskTitleDrawer,
  TitleDrawer,
} from "./taskStyled";

import moment from "moment";

const options = ["Delete", " Write Comments"];

const ITEM_HEIGHT = 48;

const TaskDrawerComponent = ({ task, tasks, setTasks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [edit, setEdit] = useState({
    id: null,
    title: "",
    body: "",
    image: "",
    subTitle: "",
    status: "queue",
    files: "",
    dueDate: moment().format("YY/DD/HH:mm"),
    priority: "",
    subTasks: [],
    creationDate: moment().format("YY/DD/HH:mm"),
  });
  //!part move
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //?open and close drawer and delete
  const openModal = option => {
    setSelectedOption(option);
    setIsModalOpen(true);
    if (option === "Delete") {
      const id = task.id;
      // const dTasks = tasks.filter(task => task.id !== id);
      const dTasks = [...tasks].filter(task => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(dTasks));
      setTasks(dTasks);
      toast("task removed", { icon: "👻 🫦" });
    } else {
      setIsDrawerOpen(true);
    }
  };
  //?part of edit with submit
  const submitUpdate = (taskId, newValue) => {
    updateTask(taskId, newValue);
    setEdit({
      id: null,
      title: "",
      body: "",
      image: "",
      subTitle: "",
      status: "queue",
      files: " ",
      priority: "",
      dueDate: moment().format("DD/MM/YY HH:mm"),
      subTasks: [],
      creationDate: moment().format("YY/DD/HH:mm"),
    });
  };
  //!update todo list
  const updateTask = (taskId, newValue) => {
    setTasks(prevTasks => {
      return prevTasks.map(todo => {
        if (todo.id === taskId) {
          return {
            ...todo,
            title: newValue.title || todo.title,
            body: newValue.body || todo.body,
            image: newValue.image || todo.image,
            subTitle: newValue.subTitle || todo.subTitle,
            status: newValue.status || todo.status,
            files: newValue.files || todo.files,
            dueDate: newValue.dueDate || todo.dueDate,
            priority: newValue.priority || todo.priority,
            subTasks: newValue.subTasks || todo.subTasks,
            creationDate: newValue.creationDate || todo.creationDate,
          };
        } else {
          return todo;
        }
      });
    });
    console.log(newValue);
  };
  const handleEditClick = taskToEdit => {
    setEdit({
      id: taskToEdit.id,
      title: taskToEdit.title,
      body: taskToEdit.body,
      image: taskToEdit.image,
      dueDate: taskToEdit.dueDate,
      subTitle: taskToEdit.subTitle,
      status: taskToEdit.status,
      files: taskToEdit.files,
      priority: taskToEdit.priority,
      subTasks: taskToEdit.subTasks,
      creationDate: taskToEdit.creationDate,
    });
    console.log(taskToEdit);
    setIsDrawerOpen(true);
  };
  return (
    <>
      <Drawer
        anchor={"right"}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        PaperProps={{
          sx: {
            "&.MuiDrawer-paper": {
              backgroundImage: `url('/img/bac1.jpg')`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            },
          },
        }}
      >
        <Box p={2} width="600px" role="presentation">
          <PartDrawer>
            <TitleDrawer>this is the task you chose</TitleDrawer>
            <Form
              tasks={tasks}
              setTasks={setTasks}
              submitUpdate={submitUpdate}
              edit={edit}
              setEdit={setEdit}
            />
            {task && (
              <>
                <TaskTitleDrawer>Task Title: {task.title}</TaskTitleDrawer>
                <TaskDescDrawer>Task Description: {task.body}</TaskDescDrawer>
                {task.subTasks &&
                  Array.isArray(task.subTasks) &&
                  task.subTasks.length > 0 && (
                    <TaskSubTaskUl>
                      {task.subTasks.map((subTask, index) => {
                        return (
                          <TaskSubTaskLi key={index}>{subTask}</TaskSubTaskLi>
                        );
                      })}
                    </TaskSubTaskUl>
                  )}
              </>
            )}
          </PartDrawer>
        </Box>
      </Drawer>
      <BorderColorOutlinedIcon onClick={() => handleEditClick(task)} />
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map(option => (
          <MenuItem
            key={option}
            onClick={() => openModal(option, setIsDrawerOpen)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default TaskDrawerComponent;



