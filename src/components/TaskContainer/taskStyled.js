import { styled } from "styled-components";
import { Chip, DialogTitle } from "@mui/material";

/*CreateTask*/
export const Wrapper = styled.div`
  width: 100%;
  //border: 1px solid red;
`;
export const Nav = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;
export const Title = styled(DialogTitle)`
  color: #267cb5;
  font-weight: 600;
`;
/*TaskList*/
export const WrapperToDoList = styled.div`
  padding: 5px;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;
/*Task*/
export const WrapperTask = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  height: 400px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
  }
`;
export const ButtonTask = styled(Chip)`
  position: absolute;
  width: 100px;
  left: 30px;
`;

export const HeaderBox = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
`;
/*TaskHeader*/
export const TasksHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  height: 50px;
  border-radius: 5px;
  width: 250px;
  background: #cccccc;
  text-transform: uppercase;
  margin-bottom: 10px;
`;
export const Count = styled.div`
  margin: 10px;
`;
export const Span = styled.span`
  margin: 0 5px 0 5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
`;

export const SpanCount = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: white;
  color: black;
  font-size: 14px;
  font-weight: 600;
`;
/*TaskModalContainer component*/

export const TaskComponentContainer = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  background: #cccccc;
  padding: 10px;
  margin: 0 0 3px 0;
  border-radius: 5px;
  box-shadow: 5px 2px 10px rgba(0, 0, 0, 0.3);

  & :hover,
  :focus,
  :active {
    cursor: pointer;
  }
`;

export const TaskHidden = styled.div`
  width: 20%;
  height: 30px;
  display: flex;
  opacity: 0;
  transition: opacity 0.3s ease;
  margin-left: auto;

  &:hover,
  :focus,
  :active {
    opacity: 1;
  }
`;
export const TaskHeader = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
`;
export const TaskIndex = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  background: white;
  border-radius: 50%;
  font-size: 14px;
  color: black;
`;
export const TaskPriority = styled.span`
  margin-left: 50px;
  font-size: 16px;
`;
export const TaskInfo = styled.div`
  width: 100%;
  padding: 10px;
  flex-grow: 1;
  overflow: hidden;
`;

export const TaskTitle = styled.h1`
  font-size: 18px;
  border-bottom: 2px dashed #ab907f;
  color: #ab907f;
  margin-bottom: 5px;
  max-height: 70px;
  overflow: hidden;
  word-wrap: break-word;
`;
export const TaskData = styled.div`
  margin-top: auto;
  color: #267cb5;
  font-size: 15px;
  font-weight: 600;
  margin-left: 10px;
`;
export const TaskBody = styled.div`
  max-height: 180px;
  overflow: hidden;
  word-wrap: break-word;
  color: #54371b;
  font-size: 16px;
`;
export const SubTasksUl = styled.ul``;
export const FilePart = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0 2px 0;
`;

export const CheckboxInput = styled.input``;
export const SubTaskBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const SubTaskLi = styled.li`
  color: ${props => (props["data-iscomplete"] ? "red" : "")};
`;
export const TaskDown = styled.div`
  display: flex;
`;
export const Image = styled.img`
  margin-bottom: 20px;
`;
export const Due = styled.div`
  color: #267cb5;
  font-size: 14px;
  font-weight: 600;
`;
export const Files = styled.div`
  color: #ab907f;
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 0 5px;
`;
/* todo =======TaskDrawerComponent component===========*/
export const PartOwner = styled.div`
  display: flex;
  flex-direction: column;

  & span {
    margin: 0 0 10px 0;
  }
`;
export const TaskTitleDrawer = styled.div`
  display: flex;

  & span {
    font-size: 16px;
  }
`;
export const TitleModal = styled.div`
  max-width: 80%;
  display: flex;
  justify-content: space-between;
`;

export const ListPart = styled.div`
  width: 30%;
`;
export const PartDrawer = styled.div`
  position: relative;
  width: 100%;
  color: #54371b;
`;
export const Status = styled.div`
  width: 30%;
`;

export const TaskSubTaskUl = styled.ul``;
export const FormPart = styled.div`
  width: 250px;
  margin-bottom: 20px;
`;

export const TitleDrawer = styled.div`
  max-height: 180px;
  max-width: 85%;
  overflow: hidden;
  word-wrap: break-word;
  font-size: 18px;
  text-align: center;
  margin: auto auto 10px auto;
`;

export const SpanTask = styled.span`
  display: inline-block;
  font-size: 16px;
  font-weight: 600;
  color: darkgray;
`;
export const TaskItems = styled.span`
  display: inline-block;
  flex: 1;
`;
export const Img = styled.img`
  width: 20px;
  transition: transform 0.3s;

  &:hover {
    transform: ${props => (props.open ? "rotate(0deg)" : "rotate(180deg)")};
    cursor: pointer;
  }
`;


export const TaskSubTaskLi = styled.li`

`;

/*SearchTask Component*/

export const SearchBox = styled.div`
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

