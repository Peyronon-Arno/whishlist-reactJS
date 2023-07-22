import { createRoot } from "react-dom/client";
import { Fragment } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { useEffect, useReducer } from "react";
import Component from "./index.js";
import Informations from "./informations/Informations.js";

const reducer = (state, action) => {
  switch (action.type) {
    case "JWT": {
      if (action.value === null) {
        document.location.href = "/";
      }
      if (
        JSON.parse(atob(action.value.split(".")[1])).exp <
        Date.now() / 1000
      ) {
        localStorage.removeItem("jwt");
        document.location.href = "/";
      }
    }
  }
};

const Default = () => {
  const [state, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    dispatch({ type: "JWT", value: localStorage.getItem("jwt") });
  });
  return (
    <Fragment>
      <h1>Index</h1>
      <div>
        <Link to={`/${SUBJECT}/`}>{SUBJECT}</Link>
      </div>
    </Fragment>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/home" element={<Default />} />
      <Route path={`/${SUBJECT}`} element={<Component />} />
      <Route path={`/${SUBJECT}/informations`} element={<Informations />} />
    </Routes>
  </BrowserRouter>
);
