import type { Route } from "./+types/login";
import "../styles/login.css";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import LoginHeader from "../components/header/loginHeader";
import Link from "@mui/material/Link";
import { useEffect, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import showIcon from "../components/login/show.svg";
import hideIcon from "../components/login/hide.svg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import toast from 'react-hot-toast';

export function meta({}: Route.MetaArgs) {
  return [{ title: "login" }, { name: "description", content: "Login page" }];
}

export default function Login() {
  // controls state of the password input field
  const [show, setShow] = useState(false);

  // keeps track of user input in real time
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // keeps track of error and error messages
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [hasEmailError, setHasEmailError] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [hasPasswordError, setHasPasswordError] = useState(false);

  // keep track of any errors on the entire page
  const [hasFormErrors, setHasFormErrors] = useState(false);
  const [formErrorMsg, setFormErrorMsg] = useState("");

  // display error on log-in if password mismatch or email does not exist
  useEffect(() => {
    if (hasEmailError || hasPasswordError) {
      setHasFormErrors(true);
      setFormErrorMsg("email does not exist, or password is incorrect.");
    } else {
      setHasFormErrors(false);
      setFormErrorMsg("");
    }
  }, [hasEmailError, hasPasswordError]);

  // functions to update inputs being saved
  function onEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.currentTarget.value);
  }

  function onPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.currentTarget.value);
  }

  // if log-in is verified, redirect using to home page
  async function handleLogIn() {
    let userCredential;
    // 1) Sign in with Firebase client SDK
    try{
      userCredential = await signInWithEmailAndPassword(
        auth!,
        email,
        password
      );
    }catch(e){
      toast.error('Invalid username or password.');
    }
    // 2) Get fresh ID token
    const idToken = await userCredential!.user.getIdToken(
      /* forceRefresh */ true
    );

    try{
      // 3) Send idToken to backend to exchange for session cookie
      const resp = await fetch("http://localhost:8000/auth/sessionLogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // VERY IMPORTANT: accept cookie
      body: JSON.stringify({ idToken }),
    });

    toast.success('Login successful!');
    } catch (e) {
      console.log(e)
    }


    // redirect to home (voting) page
    window.location.href = "/";
  }
  return (
    <>
      <LoginHeader />
      <main style={{ backgroundColor: "var{--bg-color}", paddingTop: "60px" }}>
        <div className="loginBox">
          <Card className="card" sx={{ maxWidth: 785 }}>
            <h1>Log-in</h1>
            <p style={{ fontSize: "18px", color: "red", paddingLeft: "5px" }}>
              {formErrorMsg}
            </p>
            <CardContent className="inputs">
              <p>Email</p>
              <TextField
                className="input"
                variant="standard"
                onChange={onEmailChange}
                slotProps={{
                  input: {
                    disableUnderline: true,
                    style: { color: "#675844" },
                  },
                }}
              />
              <br></br>
              <p>Password</p>
              <TextField
                className="input"
                variant="standard"
                type={show ? "text" : "password"}
                onChange={onPasswordChange}
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
            </CardContent>
            <CardActions className="buttons">
              <Button
                size="medium"
                variant="contained"
                className="enterButton"
                onClick={handleLogIn}
              >
                Enter
              </Button>
            </CardActions>
          </Card>
        </div>
        <p className="redirectLink">
          Don’t have an account?{" "}
          <Link className="link" href="signup">
            Sign-up here
          </Link>
        </p>
      </main>
    </>
  );
}
