import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import SettingOption from "../settings/settingOption";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import showIcon from "../login/show.svg";
import hideIcon from "../login/hide.svg";
import TextField from "@mui/material/TextField";

export default function ChangeEmailModal() {
  // TODO: get from DB to prepopulate
  const userPassword = "formDB";

  const matches = useMediaQuery("(min-width: 600px)");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  // reset all error catching on modal close
  const handleClose = () => {
    setHasEmailError(true);
    setEmailErrorMsg("");
    setHasPasswordError(false);
    setPasswordErrorMsg("");
    // reset show password toggle
    setShow(false);
    setOpen(false);
  };
  const handleSubmit = () => {
    // check password here and set error message if needed
    if (password !== userPassword) {
      setHasPasswordError(true);
      setPasswordErrorMsg("Incorrect password.");
    } else {
      // This function would send off the user's request to change email
      setOpen(false);
    }
  };

  // controls state of the password input field
  const [show, setShow] = React.useState(false);
  const maxCharacters = 50;

  const modalStyle = {
    borderRadius: "40px",
    border: "1px solid rgba(255, 132, 164, 1)",
    width: "50%",
    boxShadow: "5px 10px 10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(224, 205, 178, 1)",
    position: "absolute",
    transform: "translate(50%, 50%)",
  };

  const modalStyleMobile = {
    borderRadius: "40px",
    border: "1px solid rgba(255, 132, 164, 1)",
    width: "100%",
    boxShadow: "5px 10px 10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(224, 205, 178, 1)",
    position: "absolute",
    transform: "translate(0%, 80%)",
  };

  const openButtonStyle = {
    fontFamily: "inherit",
    fontSize: "24px",
    textTransform: "capitalize",
  };

  const closeButtonStyle = {
    display: "flex",
    padding: 0,
    borderRadius: "100px",
    height: "100%",
  };

  const submitButtonStyle = {
    borderRadius: "100px",
    border: "1px solid rgba(147, 191, 191, 1)",
    backgroundColor: "rgba(179, 232, 232, 1)",
    color: "inherit",
    font: "inherit",
    display: "flex",
    justifyContent: "flex-end",
    margin: "10px",
  };

  // max 50 characters, no special characters
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // keeps track of error and error messages
  const [emailErrorMsg, setEmailErrorMsg] = React.useState("");
  const [hasEmailError, setHasEmailError] = React.useState(true);
  const [passwordErrorMsg, setPasswordErrorMsg] = React.useState("");
  const [hasPasswordError, setHasPasswordError] = React.useState(false);

  // used to validate input
  const allowedChars = [
    "-",
    "_",
    ".",
    ..."abcdefghijklmnopqrstuvwxyz",
    ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    ..."0123456789",
  ];

  // set error messages for the new email field and password field
  React.useEffect(() => {
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

    if (password === "") {
      setPasswordErrorMsg("");
      setHasPasswordError(false);
    }
  }, [email, password]);

  // functions to update inputs being saved
  function onEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.currentTarget.value);
  }

  function onPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.currentTarget.value);
  }

  // used to validate structure of the email input
  function validateEmailStructure(email: string) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  return (
    <>
      {matches ? (
        <div>
          <Button onClick={handleOpen} sx={openButtonStyle}>
            <SettingOption settingName={"Change email"}></SettingOption>
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="Change Email modal"
            aria-describedby="Modal that allows user to change their email"
          >
            <Box sx={modalStyle}>
              <div
                style={{
                  width: "100%",
                  height: "10%",
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "2%",
                  marginRight: "2%",
                }}
              >
                <Button sx={closeButtonStyle} onClick={handleClose}>
                  <img
                    style={{ scale: "50%" }}
                    src="assets\icons\Close icon.svg"
                  />
                </Button>
              </div>
              <form
                style={{
                  height: "100%",
                  width: "80%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  margin: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: 0,
                    gap: "8px",
                    width: "100%",
                  }}
                >
                  <label
                    htmlFor="newEmail"
                    style={{ paddingLeft: "15px", fontSize: "2vw" }}
                  >
                    Please enter new email address:{" "}
                  </label>
                  <input
                    type="text"
                    name="newEmail"
                    onChange={onEmailChange}
                    style={{
                      border: "1px solid rgba(255, 132, 164, 1)",
                      borderRadius: "100px",
                      backgroundColor: "white",
                      width: "100%",
                      padding: "8px 12px",
                      boxSizing: "border-box",
                    }}
                    maxLength={maxCharacters}
                  />
                  <p
                    style={{
                      fontSize: "1.3vw",
                      color: "red",
                      paddingLeft: "5px",
                    }}
                  >
                    {emailErrorMsg}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: 0,
                    gap: "8px",
                  }}
                >
                  <label
                    htmlFor="confirmPass"
                    style={{ paddingLeft: "15px", fontSize: "2vw" }}
                  >
                    Please confirm current password:
                  </label>
                  <TextField
                    name="confirmPass"
                    style={{
                      border: "1px solid rgba(255, 132, 164, 1)",
                      borderRadius: "100px",
                      backgroundColor: "white",
                      width: "100%",
                      padding: "8px 12px",
                      boxSizing: "border-box",
                    }}
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
                    style={{
                      fontSize: "1.3vw",
                      color: "red",
                      paddingLeft: "5px",
                    }}
                  >
                    {passwordErrorMsg}
                  </p>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    id="submit"
                    sx={submitButtonStyle}
                    onClick={handleSubmit}
                    disabled={hasEmailError}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </Box>
          </Modal>
        </div>
      ) : (
        <div>
          <Button onClick={handleOpen} sx={openButtonStyle}>
            <SettingOption settingName={"Change email"}></SettingOption>
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="Change Email modal"
            aria-describedby="Modal that allows user to change their email"
          >
            <Box sx={modalStyleMobile}>
              <div
                style={{
                  width: "100%",
                  height: "10%",
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "2%",
                  marginRight: "2%",
                }}
              >
                <Button sx={closeButtonStyle} onClick={handleClose}>
                  <img
                    style={{ scale: "50%" }}
                    src="assets\icons\Close icon.svg"
                  />
                </Button>
              </div>
              <form
                style={{
                  height: "100%",
                  width: "80%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  margin: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: 0,
                    gap: "8px",
                    width: "100%",
                  }}
                >
                  <label
                    htmlFor="newEmail"
                    style={{ paddingLeft: "15px", fontSize: "2vw" }}
                  >
                    Please enter new email address:{" "}
                  </label>
                  <input
                    type="text"
                    name="newEmail"
                    onChange={onEmailChange}
                    style={{
                      border: "1px solid rgba(255, 132, 164, 1)",
                      borderRadius: "100px",
                      backgroundColor: "white",
                      width: "100%",
                      padding: "8px 12px",
                      boxSizing: "border-box",
                    }}
                    maxLength={maxCharacters}
                  />
                  <p
                    style={{
                      fontSize: "2vw",
                      color: "red",
                      paddingLeft: "5px",
                    }}
                  >
                    {emailErrorMsg}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: 0,
                    gap: "8px",
                  }}
                >
                  <label
                    htmlFor="confirmPass"
                    style={{ paddingLeft: "15px", fontSize: "2vw" }}
                  >
                    Please confirm current password:
                  </label>
                  <TextField
                    name="confirmPass"
                    style={{
                      border: "1px solid rgba(255, 132, 164, 1)",
                      borderRadius: "100px",
                      backgroundColor: "white",
                      width: "100%",
                      padding: "8px 12px",
                      boxSizing: "border-box",
                    }}
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
                    style={{
                      fontSize: "2vw",
                      color: "red",
                      paddingLeft: "5px",
                    }}
                  >
                    {passwordErrorMsg}
                  </p>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    id="submit"
                    sx={submitButtonStyle}
                    onClick={handleSubmit}
                    disabled={hasEmailError}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
}
