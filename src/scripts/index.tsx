import * as React from "react";
import { render } from "react-dom";
import { initializeApp } from "firebase";

import { App } from "./components/App";

const app = initializeApp({
  apiKey: "AIzaSyBySiXZAx6Ueu4VDwkfbBh759etyrxIsz4",
  authDomain: "chat-app-c8e3a.firebaseapp.com",
  databaseURL: "https://chat-app-c8e3a.firebaseio.com",
  projectId: "chat-app-c8e3a",
  storageBucket: "chat-app-c8e3a.appspot.com",
  messagingSenderId: "776417475499"
});

const container = document.createElement("div");
document.body.appendChild(container);

render(
  <App app={app} />,
  container,
);
