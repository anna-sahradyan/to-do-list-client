import React, { useEffect, useState } from "react";
import CreateTask from "./CreateTask";
import TasksLists from "./TasksLists";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const TaskContainer = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);
  return (
    <DndProvider backend={HTML5Backend}>
      <CreateTask tasks={tasks} setTasks={setTasks} />
      <TasksLists tasks={tasks} setTasks={setTasks} />
    </DndProvider>
  );
};

export default TaskContainer;

