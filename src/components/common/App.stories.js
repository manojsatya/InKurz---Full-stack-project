import React from "react";
import App from "./App";

export default {
  title: "App",
  decorators: [Wrapper]
};

function Wrapper(storyFn) {
  return <div style={{ background: "#F9F6F2", width: "50%" }}>{storyFn()}</div>;
}

export const app = () => <App></App>;
