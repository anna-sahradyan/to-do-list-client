import React, { useEffect, useState } from "react";
import CreateTask from "./CreateTask";
import TasksLists from "./TasksLists";

const TaskContainer = () => {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState([]);
  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")));
  }, []);

  return (
    <>
      <CreateTask tasks={tasks} setTasks={setTasks} />
      <TasksLists tasks={tasks} setTasks={setTasks} />
    </>
  );
};

export default TaskContainer;