import React, { useEffect, useState } from "react";
import { WrapperToDoList } from "./taskStyled";
import Task from "./Task";

const TasksLists = ({ tasks, setTasks, task, setTask }) => {
  const [queue, setQueue] = useState([]);
  const [development, setDevelopment] = useState([]);
  const [done, setDone] = useState([]);
  const statuses = ["queue", "development", "done"];
  useEffect(() => {
    if (tasks) {
      //! Check if tasks is an array
      const filterQueue = tasks.filter(task => task.status === "queue");
      const filterDev = tasks.filter(task => task.status === "development");
      const filterDone = tasks.filter(task => task.status === "done");
      setDone(filterDone);
      setDevelopment(filterDev);
      setQueue(filterQueue);
    }
  }, [tasks]);

  return (
    <WrapperToDoList>
      {statuses.map((status, index) => (
        <Task
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          queue={queue}
          setQueue={setQueue}
          done={done}
          setDone={setDone}
          development={development}
          setDevelopment={setDevelopment}
          task={task}
          setTask={setTask}
        />
      ))}
    </WrapperToDoList>
  );
};

export default TasksLists;
