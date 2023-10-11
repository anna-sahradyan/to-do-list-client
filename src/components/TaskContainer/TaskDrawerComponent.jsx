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
import * as PropTypes from "prop-types";

const options = [
  "Sub Tasks",
  "Delete",
  "File",
  " Write Comments",
  "Edit Property",
];

const ITEM_HEIGHT = 48;

const TaskDrawerComponent = ({ task, tasks, setTasks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [edit, setEdit] = useState({
    id: null,
    value: "",
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
    // if (option === "Edit Property") {
    //   const id = task.id;
    // }
  };
  //?part of edit

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
            <Form tasks={tasks} setTasks={setTasks} />
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
      <BorderColorOutlinedIcon />
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



