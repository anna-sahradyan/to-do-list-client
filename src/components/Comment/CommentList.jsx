import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import CommentItems from "./CommentItems";
import { v4 as uuidv4 } from "uuid";
import { Title } from "./commentStyle";

const CommentList = ({ task }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });
  const [comments, setComments] = useState([]);

  // Create Comments
  const createComment = comment => {
    if (!comment.text || /^\s*$/.test(comment.text)) {
      return;
    }
    const newComment = { ...comment, id: uuidv4(), comments: task.id }; // Add task ID to the comment
    const newComments = [newComment, ...comments];
    try {
      localStorage.setItem("comments", JSON.stringify(newComments));
    } catch (error) {
      console.error("Error storing comments in localStorage:", error);
    }

    setComments(newComments);
  };

  useEffect(() => {
    console.log(comments);
  }, [comments]);
  useEffect(() => {
    const storedComments = localStorage.getItem("comments");
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);
  //! Remove Comments
  const removeComment = id => {
    const deleteComment = comments.filter(comment => comment.id !== id);
    setComments(deleteComment);
    localStorage.setItem("comments", JSON.stringify(deleteComment));
  };

  //! Update Comments
  const updateComment = (commentId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    const updatedComments = comments.map(comment =>
      comment.id === commentId ? { ...comment, text: newValue.text } : comment,
    );
    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  //! Submit Update
  const submitUpdate = (commentId, newValue) => {
    updateComment(commentId, newValue);
    setEdit({ id: null, value: "" });
  };
  const taskComments = comments.filter(comment => comment.comments === task.id);

  console.log(taskComments);
  return (
    <>
      <CommentForm
        onSubmit={createComment}
        submitUpdate={value => submitUpdate(edit.id, { text: value })}
        edit={edit}
        setEdit={setEdit}
      />
      {taskComments.map((item, index) => (
        <CommentItems
          key={index}
          comment={item}
          removeComment={removeComment}
          updateComment={updateComment}
          edit={edit}
          setEdit={setEdit}
        />
      ))}
    </>
  );
};

export default CommentList;

