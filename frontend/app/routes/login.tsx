import type { Route } from "./+types/login";
import "../styles/login.css";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import LoginHeader from "../components/header/loginHeader";
import Link from "@mui/material/Link";

export function meta({}: Route.MetaArgs) {
  return [{ title: "login" }, { name: "description", content: "Login page" }];
}

export default function Login() {
  return (
    <>
      <LoginHeader />
      <main style={{ backgroundColor: "var{--bg-color}", paddingTop: "60px" }}>
        <div className="loginBox">
          <Card className="card" sx={{ maxWidth: 785 }}>
            <h1>Log-in</h1>
            <CardContent className="inputs">
              <p>Username</p>
              <TextField
                className="input"
                variant="standard"
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
                slotProps={{
                  input: {
                    disableUnderline: true,
                    style: { color: "#675844" },
                  },
                }}
              />
            </CardContent>
            <CardActions className="buttons">
              <Button size="medium" variant="contained" className="enterButton">
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
