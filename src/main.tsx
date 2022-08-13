import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Global, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

function MyGlobalStyles() {
  return (
    <Global
      styles={(theme) => ({
        "*, *::before, *::after": { boxSizing: "border-box" },
        "*": {
          fontFamily: "MADE TOMMY !important",
        },
      })}
    />
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider theme={{ colorScheme: "dark" }}>
      <MyGlobalStyles />
      <NotificationsProvider position="top-center" autoClose={false}>
        <App />
      </NotificationsProvider>
    </MantineProvider>
  </React.StrictMode>
);
