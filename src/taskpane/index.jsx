import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { FluentProvider, webLightTheme, webDarkTheme } from "@fluentui/react-components";

/**
 * The initialize function must be run each time a new page is loaded.
 */

/* global document, Office, module, require */

const title = "KayanHR Task Pane Add-in";

const rootElement = document.getElementById("container");
const root = createRoot(rootElement);

const detectAndSetTheme = () => {
  // Get the Office theme
  const officeTheme = Office.context.officeTheme;

  // Determine the selected Fluent UI theme based on the Office theme
  const selectedTheme = officeTheme.bodyBackgroundColor == "#262626" ? webDarkTheme : webLightTheme;

  // Set the theme
  root.render(
    <FluentProvider theme={selectedTheme}>
      <App title={title} />
    </FluentProvider>
  );
  setTimeout(detectAndSetTheme, 5000);
};

/* Render application after Office initializes */
Office.onReady(() => {
  // Initial theme detection and rendering
  detectAndSetTheme();

  // Periodically check the theme at regular intervals (every 5 seconds in this example)
  // setInterval(detectAndSetTheme, 5000); // Adjust the interval as needed
});

if (module.hot) {
  module.hot.accept("./components/App", () => {
    const NextApp = require("./components/App").default;
    root.render(NextApp);
  });
}
