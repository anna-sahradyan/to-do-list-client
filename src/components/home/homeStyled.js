import { styled } from "styled-components";

export const Text = styled.h1`
  color: white;
  margin-bottom: 20px;

  &::after {
    content: "❤️";
    display: inline-block;
    margin-left: 10px;
  }
`;
export const Box = styled.div`
  width: 700px;
  margin: 40px auto;
`;