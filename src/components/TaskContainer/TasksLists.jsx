// import React, { useEffect, useState } from "react";
// import { WrapperToDoList } from "./taskStyled";
// import Task from "./Task";
//
// const TasksLists = ({ tasks, setTasks }) => {
//   const [todos, setTodos] = useState([]);
//   const [queue, setQueue] = useState([]);
//   const [development, setDevelopment] = useState([]);
//   const [done, setDone] = useState([]);
//   useEffect(() => {
//     const filterTodos = tasks.filter(task => task.status === "todo");
//     const filterQueue = tasks.filter(task => task.status === "queue");
//     const filterDev = tasks.filter(task => task.status === "dev");
//     const filterDone = tasks.filter(task => task.status === "done");
//     setTodos(filterTodos);
//     setDone(filterDone);
//     setDevelopment(filterDev);
//     setQueue(filterQueue);
//   }, [tasks]);
//   const statuses = ["todo", "queue", "dev", "done"];
//   return (
//     <WrapperToDoList>
//       {statuses.map((status, index) => (
//         <Task key={index} status={status} />
//       ))}
//     </WrapperToDoList>
//   );
// };
//
// export default TasksLists;
//
import React, { useEffect, useState } from "react";
import { WrapperToDoList } from "./taskStyled";
import Task from "./Task"; // Assuming Task component exists

const TasksLists = ({ tasks, setTasks }) => {
  const [todos, setTodos] = useState([]);
  const [queue, setQueue] = useState([]);
  const [development, setDevelopment] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    const filterTodos = tasks.filter((task) => task.status === "todo");
    const filterQueue = tasks.filter((task) => task.status === "queue");
    const filterDev = tasks.filter((task) => task.status === "dev");
    const filterDone = tasks.filter((task) => task.status === "done");
    setTodos(filterTodos);
    setDone(filterDone);
    setDevelopment(filterDev);
    setQueue(filterQueue);
  }, [tasks]);

  const statuses = ["todo", "queue", "dev", "done"];

  return (
    <WrapperToDoList>
      {statuses.map((status, index) => (
        <Task key={index} status={status} />
      ))}
    </WrapperToDoList>
  );
};

export default TasksLists;
