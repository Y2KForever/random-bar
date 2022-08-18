import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Global, MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

export const MyGlobalStyles = () => {
  return (
    <Global
      styles={(theme) => ({
        "*, *::before, *::after": { boxSizing: "border-box" },
        "*": {
          fontFamily: "MADE TOMMY !important",
        },
        "body": {
          overflow: "hidden"
        }
      })}
    />
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <NotificationsProvider position="top-center" autoClose={false}>
      <App />
    </NotificationsProvider>
  </React.StrictMode >
);
