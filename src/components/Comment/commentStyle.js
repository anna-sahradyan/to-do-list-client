import styled from "styled-components";
import { Button } from "@mui/material";

export const Title = styled.h1`
  font-size: 18px;
  color: #272728;
  text-align: center;
  margin-bottom: 20px;
`;
export const CommentBox = styled.div`
  margin-top: 10px;
  width: 100%;
`;
export const ButtonComment = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const CommentBody = styled.div`
  font-size: 16px;
  font-weight: 600;
  max-height: 180px;
  overflow: hidden;
  word-wrap: break-word;
`;
export const PartOfComment = styled.div`
  width: 100%;
  background-color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 0 0;
  border-radius: 10px;
`;
export const CommentSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  left: 10px;

  &:hover {
    cursor: pointer;
  }
`;

