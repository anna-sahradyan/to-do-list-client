import { styled } from "styled-components";
import { DialogTitle } from "@mui/material";
/*CreateTask*/
export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  border: 1px solid red;
`;
export const Nav = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  border: 1px solid red;
`;
export const Title = styled(DialogTitle)`
  color: #267cb5;
  font-weight: 600;
`;
/*TaskList*/
export const WrapperToDoList = styled.div`
  width: 100%;
  display: flex;
`;