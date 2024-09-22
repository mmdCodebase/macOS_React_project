import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./theme";
import AuthGuard from "./guard/AuthGuard";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
      </ThemeProvider>
  </React.StrictMode>
);
