import React from "react";
import { CommentBody, CommentSpan, PartOfComment } from "./commentStyle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const CommentItems = ({ comment, setEdit, removeComment }) => {
  return (
    <>
      <PartOfComment>
        <CommentBody>{comment.text}</CommentBody>
        <CommentSpan>
          <EditIcon
            onClick={() => {
              setEdit({ id: comment.id, value: comment.text });
            }}
          />
          <DeleteOutlineIcon onClick={() => removeComment(comment.id)} />
        </CommentSpan>
      </PartOfComment>
    </>
  );
};

export default CommentItems;