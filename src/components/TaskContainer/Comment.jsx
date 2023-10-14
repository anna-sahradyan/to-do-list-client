import React, { useEffect, useState } from "react";
import { Button, FormControl, TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const Comment = () => {
  const [comment, setComment] = useState([]);
  useEffect(() => {}, []);
  console.log(comment);
  const handleComment = () => {};
  return (
    <>
      <FormControl onSubmit={e => e.preventDefault()}>
        <TextField
          id="outlined-multiline-flexible"
          label="Add Comment"
          multiline
          maxRows={4}
          sx={{ margin: 1 }}
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <Button onClick={handleComment}>Add Comments </Button>
      </FormControl>
    </>
  );
};

export default Comment;