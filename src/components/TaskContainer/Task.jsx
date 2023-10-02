import React from "react";
import {
  Count,
  Span,
  SpanCount,
  TasksHeader,
  WrapperTask,
  HeaderBox,
  ButtonTask,
} from "./taskStyled";
import TaskModalContainer from "./TaskModalContainer";
import { useDrop } from "react-dnd";
import toast from "react-hot-toast";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";

const Task = ({
  status = "queue",
  tasks,
  setTasks,
  queue,
  setQueue,
  done,
  setDone,
  development,
  setDevelopment,
  creationDate,
}) => {
  //?part of drag  DND
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task", // Define the accepted type
    drop: item => addItemToSection(item.id),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addItemToSection = id => {
    if (id) {
      setTasks(prev => {
        const mTasks = prev.map(task => {
          if (task.id === id) {
            return { ...task, status: status };
          }
          return task;
        });
        localStorage.setItem("tasks", JSON.stringify(mTasks));
        toast("Task status changed", { icon: "🫡" });
        return mTasks;
      });
    }
  };

  let text = "Todo";
  let bg = `#007acc`;
  let tasksToMap = [];
  switch (status) {
    case "queue":
      text = "queue";
      bg = "#f5a623";
      tasksToMap = queue;
      break;
    case "done":
      text = "done";
      bg = "#5cb85c";
      tasksToMap = done;
      break;
    case "development":
      text = "development";
      bg = "#007acc";
      tasksToMap = development;
      break;
    default:
      break;
  }
  return (
    <WrapperTask ref={drop}>
      <HeaderBox>
        <Header
          text={text}
          count={tasksToMap.length}
          bg={bg}
          setTasks={setTasks}
          creationDate={creationDate}
        />
      </HeaderBox>
      {tasksToMap.length > 0 &&
        tasksToMap.map((task, index) => {
          return (
            <TaskModalContainer
              key={task.id}
              tasks={tasks}
              task={task}
              setTasks={setTasks}
              index={index}
            />
          );
        })}
    </WrapperTask>
  );
};

export default Task;

const Header = ({ text, count, bg, setTasks }) => {
  const handleClearAll = () => {
    // Check if there's anything in localStorage
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks && Array.isArray(storedTasks) && storedTasks.length > 0) {
      // Use a browser-native confirmation dialog
      const userConfirmed = window.confirm(
        "Are you sure you want to clear all tasks?",
      );
      if (userConfirmed) {
        localStorage.clear();
        setTasks([]);
        // Perform any additional actions after clearing, if needed
        toast("All tasks cleared", { icon: "👍" });
      } else {
        // User cancelled the clear operation
        toast("Clear operation cancelled", { icon: "🚫" });
      }
    } else {
      // No items in localStorage
      toast("No tasks to clear.", { icon: "🙄" });
    }
  };

  return (
    <>
      <TasksHeader>
        {text === "queue" ? (
          <Span
            style={{
              background: bg,
              display: "flex",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {text}
            <Stack direction="row" spacing={1}>
              <ButtonTask
                icon={<DeleteIcon />}
                label="Delete"
                onClick={handleClearAll}
              />
            </Stack>
          </Span>
        ) : (
          <>
            <Span style={{ background: bg }}></Span>
            {text}
          </>
        )}
        <Count>
          <SpanCount>{count}</SpanCount>
        </Count>
      </TasksHeader>
    </>
  );
};
