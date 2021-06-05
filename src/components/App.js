import React from "react";
import About from "./About";
import "./styles.css";
import css from "./App.module.css";

const App = () => {
  return (
    <div className={css.container}>
      <div className={css.nameHeading}>
        <h1 className="title">Yicheng Shen</h1>
      </div>
      <About />
    </div>
  );
};

export default App;
