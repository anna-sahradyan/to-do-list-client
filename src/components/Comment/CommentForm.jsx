import React, { useEffect, useRef, useState } from "react";
import { Button, TextField, FormControl } from "@mui/material";
import { ButtonComment, Title } from "./commentStyle";
import { v4 as uuidv4 } from "uuid";

const CommentForm = props => {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current && props.edit) {
      inputRef.current.focus();
    }
  }, [props.edit]);
  useEffect(() => {
    if (props.edit && props.edit.value) {
      setInput(props.edit.value);
    }
  }, [props.edit]);
  const handleChange = e => {
    setInput(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (props.edit && props.edit.id) {
      props.submitUpdate(input);
    } else {
      props.onSubmit({
        id: uuidv4(),
        text: input,
      });
    }
    setInput("");
  };

  return (
    <div>
      <Title>{props.edit.id ? "Edit Comment" : "Add Comment"}</Title>
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-multiline-flexible"
          variant="filled"
          label="add a todo"
          multiline
          maxRows={4}
          value={input}
          name={"text"}
          onChange={handleChange}
          ref={inputRef}
          sx={{
            width: "100%",
            border: 0,
          }}
        />
        <ButtonComment>
          <Button type={"submit"}>
            {props.edit.id ? "Update Comment" : "Add Comment"}
          </Button>
        </ButtonComment>
      </form>
    </div>
  );
};

export default CommentForm;