import React from "react";
import Nav from "../nav/Nav";
import { Box, Text } from "./homeStyled";

const Home = () => {
  return (
    <>
      <Nav />
      <Box>
        <Text>A to-do list is a love letter to your future self </Text>
        <Text>
          Make your to-do list a daily habit, and watch your life transform
        </Text>
        <Text>
          A to-do list is the first step to taking control of your life
        </Text>
      </Box>
    </>
  );
};

export default Home;