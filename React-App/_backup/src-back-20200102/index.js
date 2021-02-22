import React from "react";
import ReactDOM from "react-dom";
import { Container } from "semantic-ui-react";
import Session from "./Session";
import "./index.css";
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from "./Routes";
const App = ({ children }) => (
  <Container fluid >
    {children}
  </Container>
);

// TODO: Switch to https://github.com/palmerhq/the-platform#stylesheet when it will be stable
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

ReactDOM.render(
  <Router>
  <App>
    <Session />
  </App>
  </Router>,
 
  document.getElementById("root")
);
