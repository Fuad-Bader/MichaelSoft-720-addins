import React, { useState, useEffect, useRef } from "react";
import fetch from "isomorphic-fetch";
import console from "console";
import axios from "axios";
import { makeStyles, Card, CardHeader, InfoLabel, Field, Input, Button } from "@fluentui/react-components";

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

const OTP_REGEX = /^KB-\d{6}$/;
// const ADMIN_ENDPOINT = "/KayanBot/CheckOTPCode";

const OTP = () => {
  const styles = useStyles();
  const userRef = useRef();
  const errRef = useRef();
  const [OTPCode, setOTPCode] = useState("KB-123456");
  const [errMsg, setErrMsg] = useState("");
  const [response, setResponse] = useState("");
  const [responseData, setResponseData] = useState("");
  const [responseAccessToken, setResponseAccessToken] = useState("");

  const isValidOTP = () => {
    return OTP_REGEX.test(OTPCode);
  };

  const fakeApiGet = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const data = await response.json();
    console.log("Response data:", data);
  };
  const fakeApiPost = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", { method: "POST" });
    const data = await response.json();
    console.log("Response data:", data);
  };

  const checkOTPFetch = async () => {
    const code = OTPCode.substring(3);
    try {
      const response = await fetch("https://admin.kayanhr.com/api/KayanBot/CheckOTPCode", {
        method: "POST",
        mode: "no-cors",
        headers: {
          Accept: "application/json",
          OTPCode: code,
          password: "SPYxWb6vFIqJinShNJT54Ovw4Ovwq",
          platform: "msteams",
        },
      });
      console.debug(response);
      // Check if the request was successful (status 200)
      if (response.ok) {
        // If you need to access the response data, you can do it like this
        const data = await response.json();
        console.log("Response data:", data);
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const checkOTPAxios = async () => {
    const code = OTPCode.substring(3);
    try {
      const response = await axios.post(
        "https://admin.kayanhr.com/api/KayanBot/CheckOTPCode",
        {
          OTPCode: code,
          password: "SPYxWb6vFIqJinShNJT54Ovw4Ovwq",
          platform: "msteams",
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      console.debug(response);
      // Check if the request was successful (status 200)
      if (response.status === 200) {
        // If you need to access the response data, you can do it like this
        console.log("Response data:", response.data);
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = OTP_REGEX.test(OTPCode);
    if (v1 === false) {
      setErrMsg("Enter OTP Code first!");
      return;
    }
    checkOTPFetch(OTPCode);
    checkOTPAxios(OTPCode);
  };

  useEffect(() => {
    setErrMsg("");
  }, [OTPCode]);

  useEffect(() => {
    setResponse(response);
    setResponseData(responseData);
    setResponseAccessToken(responseAccessToken);
  }, [response, responseData, responseAccessToken]);

  return (
    <Card className={styles.card}>
      <CardHeader
        image={
          <img
            src="assets\kayanicon.ico"
            alt="KayanHR"
            style={{ objectFit: "contain", height: "64px", width: "64px" }}
          />
        }
        header={<h1>Enter Your OTP Code</h1>}
      />

      <form onSubmit={handleSubmit}>
        <Field
          label={{
            children: () => <InfoLabel info="Enter a valid OTP Code. For example: KB-123456">OTP Code</InfoLabel>,
          }}
          validationState={OTPCode == "" ? "none" : isValidOTP ? "success" : "error"}
          validationMessage={OTPCode == "" ? "" : isValidOTP ? "" : "The OTP code is invalid"}
          required
        >
          <Input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => {
              setOTPCode(e.target.value);
            }}
            value={OTPCode}
            placeholder="Enter your OTP code"
            required
          />
        </Field>
        <br />
      </form>
      <Button appearance="primary" onClick={handleSubmit} type="submit">
        Sign in
      </Button>
      <Button appearance="secondary" onClick={fakeApiGet}>
        test fake api get
      </Button>
      <Button appearance="secondary" onClick={fakeApiPost}>
        test fake api post
      </Button>
      <p>{response}</p>
      <p>{responseData}</p>
      <p>{responseAccessToken}</p>
      <p ref={errRef}>{errMsg}</p>
    </Card>
  );
};

export default OTP;
