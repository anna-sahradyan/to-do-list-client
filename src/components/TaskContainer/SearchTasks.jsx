import React, { useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import moment from "moment/moment";
import {
  Due,
  Files,
  Image,
  SearchBox,
  Status,
  TaskBody,
  TaskComponentContainer,
  TaskData,
  TaskDown,
  TaskHidden,
  TaskIndex,
  TaskInfo,
  TaskPriority,
  TaskTitle,
} from "./taskStyled";
import TaskDrawerComponent from "./TaskDrawerComponent";
import toast from "react-hot-toast";

const SearchTasks = ({ tasks, setTasks, task }) => {
  const [searchResultFound, setSearchResultFound] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  const handleInputChange = e => {
    setIsDrawerOpen(true);
    setSearchInput(e.target.value);
    setSelectedTask(null); // Reset selected task when input changes
  };

  const handleSearch = () => {
    const inputAsNumber = parseInt(searchInput, 10);
    if (
      !isNaN(inputAsNumber) &&
      inputAsNumber >= 1 &&
      inputAsNumber <= tasks.length
    ) {
      const index = inputAsNumber - 1; // Convert to 0-based index
      setSelectedTask(tasks[index]);
    } else {
      // Search by task title or number
      const foundTask = tasks.find(
        task =>
          (task.number && task.number.includes(searchInput)) ||
          (task.title &&
            task.title.toLowerCase().includes(searchInput.toLowerCase())),
      );

      setSelectedTask(foundTask || null);
      if (!foundTask) {
        toast("No matching tasks found.", { icon: "⚔️" });
      }
    }
  };
  const getColorByPriority = priority => {
    switch (priority) {
      case "high":
        return "#C81616";
      case "medium":
        return "#f5a623";
      case "low":
        return "#007acc";
      default:
        return "black";
    }
  };
  const priorityColor = getColorByPriority(task.priority);
  return (
    <>
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
          placeholder="Search by index or keyword"
          inputProps={{ "aria-label": "search" }}
          value={searchInput}
          onChange={handleInputChange}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={handleSearch}
        >
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      </Paper>
      {selectedTask && (
        <Drawer
          anchor={"left"}
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
          <Box p={2} width="500px" role="presentation"></Box>
          <SearchBox>
            <TaskComponentContainer>
              <Status>{selectedTask.status}</Status>
              <TaskInfo>
                <TaskTitle>
                  {selectedTask.title}
                  <TaskPriority
                    style={{ color: getColorByPriority(selectedTask.priority) }}
                  >
                    {selectedTask.priority}
                  </TaskPriority>
                  <TaskIndex>{tasks.indexOf(selectedTask) + 1}</TaskIndex>
                </TaskTitle>
                <TaskBody>
                  {selectedTask.body}
                  <Image
                    src={selectedTask.image}
                    alt=""
                    style={{ maxWidth: "30%" }}
                  />
                  <Files>{selectedTask.files}</Files>

                  <Due>
                    🥳 Deadline::
                    {moment(selectedTask.dueDate).format("MMMM D, YYYY h:mm A")}
                  </Due>
                </TaskBody>
              </TaskInfo>
              <TaskDown>
                <TaskData> 🧐 Initiate::{selectedTask.creationDate}</TaskData>
                <TaskHidden>
                  <TaskDrawerComponent
                    task={task}
                    tasks={tasks}
                    setTasks={setTasks}
                  />
                </TaskHidden>
              </TaskDown>
            </TaskComponentContainer>
          </SearchBox>
        </Drawer>
      )}
    </>
  );
};

export default SearchTasks;

