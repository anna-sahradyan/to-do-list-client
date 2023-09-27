import React from "react";
import {
  Header,
  Logo,
  Title,
  Img,
  StyledLink,
  InnerHeader,
} from "./naverStyled";

const Nav = () => {
  return (
    <>
      <Header>
        <InnerHeader>
          <Title>
            Organize, Prioritize, Achieve: <b>ToDoGenius</b>
          </Title>
          <Logo>
            <StyledLink to={"/task"}>
              <Img src="/img/logo.png" alt="logo" />
            </StyledLink>
          </Logo>
        </InnerHeader>
      </Header>
    </>
  );
};

export default Nav;