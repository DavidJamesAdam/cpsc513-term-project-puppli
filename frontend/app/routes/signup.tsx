import LoginHeader from "~/components/header/loginHeader";
import type { Route } from "./+types/signup";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import "../styles/login.css";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import showIcon from "../components/login/show.svg";
import hideIcon from "../components/login/hide.svg";
import { useEffect, useState } from "react";
import TemporaryNotification from "~/components/temporaryNotification";
import { LocationMenu } from "~/components/dropdown menus/dropdown-menus";

export function meta({}: Route.MetaArgs) {
  return [{ title: "login" }, { name: "description", content: "Sign-up page" }];
}

export default function SignUp() {
  // controls state of the password input field
  const [show, setShow] = useState(true);
  const maxCharacters = 50;

  // keep track of temporary notification state and message
  const [showTempNotif, setShowTempNotif] = useState(false);
  const [tempNotifMsg, setTempNotifMsg] = useState("");
  const [requestSuccessful, setRequestSuccessful] = useState(false);

  // email structure must be of the format: myname@example.com
  const [email, setEmail] = useState("");
  // max 50 characters, no special characters
  const [username, setUsername] = useState("");
  // needs at least one letter, any characters allowed
  const [password, setPassword] = useState("");

  // keeps track of error and error messages
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [hasEmailError, setHasEmailError] = useState(false);
  const [usernameErrorMsg, setUsernameErrorMsg] = useState("");
  const [hasUsernameError, setHasUsernameError] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [hasPasswordError, setHasPasswordError] = useState(false);

  // keep track of any errors on the entire page
  const [hasFormErrors, setHasFormErrors] = useState(false);

  // track selected province / city names from LocationMenu
  const [provinceName, setProvinceName] = useState<string | null>(null);
  const [cityName, setCityName] = useState<string | null>(null);

  // used to validate input
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const space = " ";

  // set error messages for each field
  useEffect(() => {
    if (email === "") {
      setEmailErrorMsg("Email cannot be empty.");
      setHasEmailError(true);
    } else if (!validateEmailStructure(email)) {
      setEmailErrorMsg("Email structure incorrect (ex. yourname@example.com).");
      setHasEmailError(true);
    } else {
      setEmailErrorMsg("");
      setHasEmailError(false);
    }

    if (username === "") {
      setUsernameErrorMsg("Username cannot be empty.");
      setHasUsernameError(true);
    } else {
      setUsernameErrorMsg("");
      setHasUsernameError(false);
    }

    if (password === "") {
      setPasswordErrorMsg("Password cannot be empty.");
      setHasPasswordError(true);
    } else if (numbers.every((num) => !password.includes(num))) {
      // for every number from 0-9, it does not exist in the password
      setPasswordErrorMsg("Password must include at least one number.");
      setHasPasswordError(true);
    } else if (password.includes(space)) {
      setPasswordErrorMsg("Password cannot have a space.");
      setHasPasswordError(true);
    } else if (password.length < 8) {
      setPasswordErrorMsg("Password must have at least 8 characters.");
      setHasPasswordError(true);
    } else {
      setPasswordErrorMsg("");
      setHasPasswordError(false);
    }
  }, [email, username, password]);

  // disable signup button if any error exists
  useEffect(() => {
    if (hasEmailError || hasUsernameError || hasPasswordError) {
      setHasFormErrors(true);
    } else {
      setHasFormErrors(false);
    }
  }, [hasEmailError, hasUsernameError, hasPasswordError]);

  // functions to update inputs being saved
  function onEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.currentTarget.value);
  }

  function onUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.currentTarget.value);
  }

  function onPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.currentTarget.value);
  }

  // used to validate structure of the email input
  function validateEmailStructure(email: string) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  async function handleSignUp(): Promise<void> {
    // create new account with the validated info
    const newAccount = {
      userName: username,
      email: email,
      password: password,
      provinceName: provinceName,
      cityName: cityName,
    };

    console.log(`Account info:\n${JSON.stringify(newAccount)}`);

    try {
      const response = await fetch("http://127.0.0.1:8000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: newAccount.userName,
          email: newAccount.email,
          password: newAccount.password,
          provinceName: newAccount.provinceName,
          cityName: newAccount.cityName,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // show success temp notification
        setShowTempNotif(true);
        setTempNotifMsg("Sign-up successful!");
        setRequestSuccessful(true);
        // redirect to log-in page, use time-out to show tmep notif for success
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      } else {
        // show request failed temp notification
        setShowTempNotif(true);
        setTempNotifMsg("Sign-up unsuccessful.");
        setRequestSuccessful(false);
        // print to console
        throw new Error("Failed to send request");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // remove temp notif after 5 seconds
    setTimeout(() => {
      setShowTempNotif(false);
    }, 5000);
  }

  function handleLocationChange(loc: any) {
    setProvinceName(loc.stateName ?? null);
    setCityName(loc.cityName ?? null);
  }

  return (
    <>
      <LoginHeader />
      <main style={{ backgroundColor: "var{--bg-color}", paddingTop: "60px" }}>
        <div className="loginBox">
          <Card className="card" sx={{ maxWidth: 785 }}>
            <h1>Sign-up</h1>
            <CardContent className="inputs">
              <p className="signupInput">Enter an email address</p>
              <TextField
                className="input"
                variant="standard"
                type="email"
                onChange={onEmailChange}
                slotProps={{
                  input: {
                    disableUnderline: true,
                    style: { color: "#675844" },
                  },
                }}
              />
              <p
                className="signupInput"
                style={{ fontSize: "14px", color: "red", paddingLeft: "5px" }}
              >
                {emailErrorMsg}
              </p>
              <br></br>
              <p className="signupInput">Pick a Username </p>
              <TextField
                className="input"
                variant="standard"
                onChange={onUsernameChange}
                slotProps={{
                  input: {
                    disableUnderline: true,
                    style: { color: "#675844" },
                  },
                  htmlInput: { maxLength: maxCharacters },
                }}
              />
              <p
                className="signupInput"
                style={{ fontSize: "14px", color: "red", paddingLeft: "5px" }}
              >
                {usernameErrorMsg}
              </p>
              <br></br>
              <p className="signupInput">
                Pick password{" "}
                <span className="helpText">(Include at least 1 number)</span>
              </p>
              <TextField
                className="input"
                variant="standard"
                onChange={onPasswordChange}
                type={show ? "text" : "password"}
                slotProps={{
                  input: {
                    disableUnderline: true,
                    style: { color: "#675844" },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShow(!show)}>
                          {show ? (
                            <img src={showIcon} alt="Show" />
                          ) : (
                            <img src={hideIcon} alt="Hide" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <p
                className="signupInput"
                style={{ fontSize: "14px", color: "red", paddingLeft: "5px" }}
              >
                {passwordErrorMsg}
              </p>
              <br></br>
              <LocationMenu onLocationChange={handleLocationChange} />
            </CardContent>
            <CardActions className="buttons">
              <Button
                size="medium"
                variant="contained"
                className="enterButton"
                disabled={hasFormErrors}
                onClick={handleSignUp}
              >
                Sign-up!
              </Button>
            </CardActions>
          </Card>
        </div>
        <p className="redirectLink">
          Already have an account?{" "}
          <Link className="link" href="login">
            Log-in here
          </Link>
        </p>
        <TemporaryNotification
          visible={showTempNotif}
          onAction={setShowTempNotif}
          message={tempNotifMsg}
          successful={requestSuccessful}
        />
      </main>
    </>
  );
}
