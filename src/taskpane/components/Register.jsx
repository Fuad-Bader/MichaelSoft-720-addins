import React, { useState, useEffect, useRef } from "react";
import axios from "../../api/axios";
// import type { FieldProps } from "@fluentui/react-components";
import {
  Field,
  Input,
  Button,
  Card,
  CardHeader,
  InfoLabel,
  makeStyles,
  CardPreview,
} from "@fluentui/react-components";
import { faL } from "@fortawesome/free-solid-svg-icons";

const USER_REGEX = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/api/Account/Authentication";

const useStyles = makeStyles({
  card: {
    // ...shorthands.margin("auto"),
    maxWidth: "100%",
    padding: "20px",
    position: "absolute",
    top: "2vh",
    left: "2vh",
    right: "2vh",
    bottom: "2vh",
  },
});

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(true);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(true);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(true);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [response, setResponse] = useState("");
  const [responseData, setResponseData] = useState("");
  const [responseAccessToken, setResponseAccessToken] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(REGISTER_URL, JSON.stringify({ user, pwd }), {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          APISecretKey: "W4/qqmueEWZVp+LRLYr4PncPXHLuGE3iKsF6eYbxFlY=",
        },
        body: '{ \\ \n   "userName": ' + user + ', \\ \n   "password": ' + pwd + ', \\ \n   "LanguageID": 9 \\ \n }',
        withCredentials: true,
      });
      setResponseData(response?.data);
      setResponseAccessToken(response?.accessToken);
      setResponse(JSON.stringify(response));
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };
  const styles = useStyles();

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <Card size="large" className={styles.card}>
          <CardHeader
            image={
              <img
                src="assets\kayanicon.ico"
                alt="KayanHR"
                style={{ objectFit: "contain", height: "64px", width: "64px" }}
              />
            }
            header={
              <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                {errMsg}
                <h1>Register</h1>
              </p>
            }
          />
          {/* <CardPreview
            logo={
              <img src="https://images.unsplash.com/photo-1706707075372-29a7d1ba306f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            }
          ></CardPreview> */}
          <form onSubmit={handleSubmit}>
            <Field
              label={{
                children: () => (
                  <InfoLabel info="Enter a valid email address. For example: johndoe@example.com.">Email</InfoLabel>
                ),
              }}
              validationState={validName ? "success" : "none"}
              required
            >
              <Input
                type="email"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                placeholder="Enter your email address"
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                required
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
            </Field>
            <br />

            <Field
              label={{
                children: () => (
                  <InfoLabel
                    info="The Password must be 8 to 24 characters and Must include uppercase and lowercase letters, a number and
                    a special character. Allowed special characters: ! @ # $ %"
                  >
                    Password
                  </InfoLabel>
                ),
              }}
              validationState={validPwd ? "success" : "error"}
              required
            >
              <Input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                placeholder="Enter your password"
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
            </Field>
            <br />

            <Field
              label={{
                children: () => (
                  <InfoLabel info="Must match the first password input field."> Confirm Password </InfoLabel>
                ),
              }}
              validationState={validMatch ? "success" : "error"}
              required
            >
              <Input
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                placeholder="Confirm your password"
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
            </Field>
            <br />
            <Button appearance="primary" disabled={!validName || !validPwd || !validMatch ? true : false} >Sign Up</Button>
            {/* <Button appearance="primary">Sign Up</Button> */}
          </form>
          <p>
            Already registered?
            <br />
            <span className="line">
              {/*put router link here*/}
              <Button appearance="transparent">Sign in</Button>
            </span>
          </p>
        </Card>
      )}
    </>
  );
};

export default Register;
