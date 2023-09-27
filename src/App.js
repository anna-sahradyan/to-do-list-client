import React from "react";
import { Route, Routes } from "react-router";
import Home from "./components/home/Home";
import TaskContainer from "./components/TaskContainer/TaskContainer";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster />
      <div className={"container"}>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/task"} element={<TaskContainer />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
