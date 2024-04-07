import * as React from "react";
import PropTypes from "prop-types";
// import { makeStyles } from "@fluentui/react-components";
import Register from "./Register";

// const useStyles = makeStyles({
//   root: {
//     minHeight: "100vh",
//   },
// });

const App = () => {
  // const styles = useStyles();

  return (
    <div>
      <Register />
    </div>
  );
};

App.propTypes = {
  title: PropTypes.string,
};

export default App;
