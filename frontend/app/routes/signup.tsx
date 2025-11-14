import LoginHeader from "~/components/header/loginHeader";
import type { Route } from "./+types/signup";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import "../styles/login.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "login" },
    { name: "description", content: "Sign-up page" },
  ];
}

export default function SignUp() {
  return (
    <>
      <LoginHeader />
      <main style={{ backgroundColor: "var{--bg-color}", paddingTop: "60px"}}>
        <div className="loginBox">
          <Card className="card" sx={{ maxWidth: 785}}>
            <h1>Sign-up</h1>
            <CardContent className="inputs">
              <p className="signupInput">Enter an email address</p>
              <TextField className="input" variant="standard" slotProps={{input: {disableUnderline: true, style: {color: "#675844"}}}}/>
              <br></br>
              <p className="signupInput">Pick a Username</p>
              <TextField className="input" variant="standard" slotProps={{input: {disableUnderline: true, style: {color: "#675844"}}}}/>
              <br></br>
              <p className="signupInput">Pick password <span id="helpText">(Include at least 1 number)</span></p>
              <TextField className="input" variant="standard" slotProps={{input: {disableUnderline: true, style: {color: "#675844"}}}}/>
            </CardContent>
            <CardActions className="buttons">
              <Button size="medium" variant="contained" className="enterButton">
                Sign-up!
              </Button>
            </CardActions>
          </Card>
        </div>
        <p className="redirectLink">Already have an account? <Link className="link" href="login">Log-in here</Link></p>
      </main>
    </>
  );
}