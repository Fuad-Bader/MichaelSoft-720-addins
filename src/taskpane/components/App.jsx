import * as React from "react";
import PropTypes from "prop-types";
// import Register from "./Register";
import OTP from "./OTP";
// import { useCookies } from "react-cookie";
// import { makeStyles } from "@fluentui/react-components";

// const useStyles = makeStyles({
//   root: {
//     minHeight: "100vh",
//   },
// });

const App = () => {
  // const styles = useStyles();
  // const cookies = useCookies(["user"]);

  return (
    <div>
      <OTP />
    </div>
  );

  // if (cookies.user != null) {
  //   return (
  //     <div>
  //       <Register />
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div>
  //       <Register />
  //     </div>
  //   );
  // }
};

App.propTypes = {
  title: PropTypes.string,
};

export default App;
