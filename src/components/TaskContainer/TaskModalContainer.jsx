import React from "react";
import TaskDrawerComponent from "./TaskDrawerComponent";
import { useDrag } from "react-dnd";
import {
  Due,
  Files,
  Image,
  TaskBody,
  TaskComponentContainer,
  TaskData,
  TaskDown,
  TaskHidden,
  TaskIndex,
  TaskInfo,
  TaskTitle,
  TaskPriority,
} from "./taskStyled";
import moment from "moment";

const TaskModalContainer = ({ tasks, task, setTasks, index }) => {
  //?part of drag  DND
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const draggingStyles = {
    opacity: isDragging ? 0.3 : 1,
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
      <TaskComponentContainer ref={drag} style={draggingStyles}>
        <TaskInfo>
          <TaskTitle>
            {task.title}
            <TaskPriority style={{ color: priorityColor }}>
              {task.priority}
            </TaskPriority>
            <TaskIndex>{index + 1}</TaskIndex>
          </TaskTitle>
          <TaskBody>
            {task.body}
            <Image src={task.image} alt="" style={{ maxWidth: "30%" }} />
            <Files>{task.files}</Files>

            <Due>
              Deadline::{moment(task.dueDate).format("MMMM D, YYYY h:mm A")}
            </Due>
          </TaskBody>
        </TaskInfo>
        <TaskDown>
          <TaskData>Initiate::{task.creationDate}</TaskData>
          <TaskHidden>
            <TaskDrawerComponent
              task={task}
              tasks={tasks}
              setTasks={setTasks}
            />
          </TaskHidden>
        </TaskDown>
      </TaskComponentContainer>
    </>
  );
};
export default TaskModalContainer;