import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { DataProvider } from "./components/DataProvider/DataProvider";
import {StrictMode} from "react";
import { initialState, reducer } from "./Utility/reducer";
import {CreateRoot} from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <DataProvider reducer={reducer} initialState={initialState}>
      <App />
    </DataProvider>
  </React.StrictMode>
);
