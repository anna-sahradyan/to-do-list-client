import React, { useState } from "react";
import { Nav, Wrapper } from "./taskStyled";
import SearchTasks from "./SearchTasks";
import Form from "./Form";
import { v4 as uuidv4 } from "uuid";
import moment from "moment/moment";
import Comment from "./Comment";

const CreateTask = ({ tasks, setTasks }) => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [task, setTask] = useState({
    id: uuidv4(),
    title: "",
    body: "",
    subTitle: "",
    image: "",
    status: "queue",
    dueDate: moment().format("YY/DD/HH:mm"),
    priority: "",
    subTasks: "",
    creationDate: moment().format("YY/DD/HH:mm"),
    files: selectedFiles,
  });
  return (
    <>
      <Wrapper>
        <Nav>
          <Form
            setTasks={setTasks}
            tasks={tasks}
            task={task}
            setTask={setTask}
          />
          <SearchTasks tasks={tasks} task={task} setTasks={setTasks} />
        </Nav>

        {task.commit && <Comment task={task} setTask={setTask} />}
      </Wrapper>
    </>
  );
};

export default CreateTask;
