import React, { useState } from "react";
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
  SubTasksUl,
  SubTaskLi,
  TaskHeader,
  CheckboxInput,
  SubTaskBox,
  FilePart,
} from "./taskStyled";
import moment from "moment";

const TaskModalContainer = ({ tasks, task, setTasks, index }) => {
  const [isChecked, setIsChecked] = useState({});
  const handleCheckboxChange = taskId => {
    setIsChecked(prevState => ({
      ...prevState,
      [taskId]: !prevState[taskId],
    }));
  };

  const handleTextClick = taskId => {
    setIsChecked(prevState => ({
      ...prevState,
      [taskId]: !prevState[taskId],
    }));
  };
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
          <TaskHeader>
            <TaskIndex>{index + 1}</TaskIndex>
            <TaskPriority style={{ color: priorityColor }}>
              {task.priority}
            </TaskPriority>
          </TaskHeader>
          <TaskTitle>{task.title}</TaskTitle>
          {task.subTasks && task.subTasks.trim() !== "" && (
            <SubTasksUl>
              {task.subTasks.split("\n").map((subTask, index) => (
                <SubTaskBox key={index}>
                  <CheckboxInput
                    type="checkbox"
                    id={`todoComplete_${index}`}
                    checked={isChecked[index] || false}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <SubTaskLi
                    id={`todoComplete_${index}`}
                    onClick={() => handleTextClick(index)}
                    style={{
                      textDecoration: isChecked[index]
                        ? "line-through"
                        : "none",
                    }}
                    data-iscomplete={isChecked[index]}
                  >
                    {subTask}
                  </SubTaskLi>
                </SubTaskBox>
              ))}
            </SubTasksUl>
          )}
          <TaskBody>
            {task.body}
            <FilePart>
              <Image src={task.image} alt="" style={{ maxWidth: "30%" }} />
              <Files>{task.files}</Files>
            </FilePart>
            <Due>
              Deadline:
              {task.dueDate
                ? moment(task.dueDate).format("YY/DD/HH:mm")
                : "No due date"}
            </Due>
          </TaskBody>
        </TaskInfo>
        <TaskDown>
          <TaskData>
            Initiate:
            {moment().format("YY/DD/HH:mm")}
          </TaskData>
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