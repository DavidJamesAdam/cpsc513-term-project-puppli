import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import SettingOption from "../settings/settingOption";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import showIcon from "../login/show.svg";
import hideIcon from "../login/hide.svg";

export default function ChangePasswordModal() {
  // TODO: get from DB to prepopulate
  const userPassword = "formDB";

  const matches = useMediaQuery("(min-width: 600px)");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  // reset all error catching on modal close
  const handleClose = () => {
    setHasFormErrors(false);
    setHasNewPasswordError(true);
    setNewPasswordErrorMsg("");
    setHasNewPassReEnterError(true);
    setNewPassReEnterErrorMsg("");
    setHasPasswordError(false);
    setPasswordErrorMsg("");
    // reset show password toggle
    setShow(false);
    setShowNewPass(false);
    setShowReEnterPass(false);
    setOpen(false);
  };
  const handleSubmit = () => {
    // check password here and set error message if needed
    if (password !== userPassword) {
      setHasPasswordError(true);
      setPasswordErrorMsg("Incorrect password.");
    } else {
      // This function would send off the user's request to change password
      setOpen(false);
    }
  };

  // controls state of the password input fields
  const [show, setShow] = React.useState(false);
  const [showNewPass, setShowNewPass] = React.useState(false);
  const [showReEnterPass, setShowReEnterPass] = React.useState(false);

  const modalStyle = {
    borderRadius: "40px",
    border: "1px solid rgba(255, 132, 164, 1)",
    width: "50%",
    height: "60%",
    boxShadow: "5px 10px 10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(224, 205, 178, 1)",
    position: "absolute",
    transform: "translate(50%, 40%)",
  };

  const modalStyleMobile = {
    borderRadius: "40px",
    border: "1px solid rgba(255, 132, 164, 1)",
    width: "100%",
    height: "55%",
    boxShadow: "5px 10px 10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(224, 205, 178, 1)",
    position: "absolute",
    transform: "translate(0%, 40%)",
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
    margin: "10px",
    width: "inherit",
    height: "inherit",
  };

  // needs at least one letter, any characters allowed
  const [newPassword, setNewPassword] = React.useState("");
  const [newPassReEnter, setNewPassReEnter] = React.useState("");
  const [password, setPassword] = React.useState("");

  // keeps track of error and error messages
  const [newPasswordErrorMsg, setNewPasswordErrorMsg] = React.useState("");
  const [hasNewPasswordError, setHasNewPasswordError] = React.useState(true);
  const [newPassReEnterErrorMsg, setNewPassReEnterErrorMsg] =
    React.useState("");
  const [hasNewPassReEnterError, setHasNewPassReEnterError] =
    React.useState(true);
  const [passwordErrorMsg, setPasswordErrorMsg] = React.useState("");
  const [hasPasswordError, setHasPasswordError] = React.useState(false);

  // keep track of any errors on the entire page
  const [hasFormErrors, setHasFormErrors] = React.useState(false);

  // used to validate input
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const space = " ";

  // set error messages for the new password fields
  React.useEffect(() => {
    if (newPassword === "") {
      setNewPasswordErrorMsg("New password cannot be empty.");
      setHasNewPasswordError(true);
    } else if (numbers.every((num) => !newPassword.includes(num))) {
      // for every number from 0-9, it does not exist in the password
      setNewPasswordErrorMsg("New password must include at least one number.");
      setHasNewPasswordError(true);
    } else if (newPassword.includes(space)) {
      setNewPasswordErrorMsg("New password cannot have a space.");
      setHasNewPasswordError(true);
    } else if (newPassword.length < 8) {
      setNewPasswordErrorMsg("New password must have at least 8 characters.");
      setHasNewPasswordError(true);
    } else {
      setNewPasswordErrorMsg("");
      setHasNewPasswordError(false);
    }

    if (newPassReEnter === "") {
      setNewPassReEnterErrorMsg("New password cannot be empty.");
      setHasNewPassReEnterError(true);
    } else if (newPassReEnter !== newPassword) {
      setNewPassReEnterErrorMsg("Re-entered password does not match.");
      setHasNewPassReEnterError(true);
    } else {
      setNewPassReEnterErrorMsg("");
      setHasNewPassReEnterError(false);
    }

    // if current password field is empty, reset errors
    if (password === "") {
      setPasswordErrorMsg("");
      setHasPasswordError(false);
    }
  }, [newPassword, newPassReEnter, password]);

  // disable submit button if any error exists
  React.useEffect(() => {
    if (hasNewPassReEnterError || hasNewPasswordError) {
      setHasFormErrors(true);
    } else {
      setHasFormErrors(false);
    }
  }, [hasNewPassReEnterError, hasNewPasswordError]);

  // functions to update inputs being saved
  function onNewPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewPassword(event.currentTarget.value);
  }

  function onReEnteredPassChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewPassReEnter(event.currentTarget.value);
  }

  function onPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.currentTarget.value);
  }

  return (
    <>
      {matches ? (
        <div>
          <Button onClick={handleOpen} sx={openButtonStyle}>
            <SettingOption settingName={"Change password"}></SettingOption>
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="Password Change modal"
            aria-describedby="Modal that allows user to change password"
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
                    style={{ height: "inherit" }}
                    src="assets\icons\Close icon.svg"
                  />
                </Button>
              </div>
              <form
                style={{
                  height: "inherit",
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
                  }}
                >
                  <label
                    htmlFor="currentPass"
                    style={{ paddingLeft: "15px", fontSize: "calc(1vh + 1vw)" }}
                  >
                    Please enter current password:
                  </label>
                  <TextField
                    name="currentPass"
                    style={{
                      border: "1px solid rgba(255, 132, 164, 1)",
                      borderRadius: "100px",
                      backgroundColor: "white",
                      padding: "8px 12px",
                      fontSize: "1vw",
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
                      lineHeight: "1.05",
                    }}
                  >
                    {passwordErrorMsg}
                  </p>
                  <br></br>
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
                    htmlFor="newPass"
                    style={{ paddingLeft: "15px", fontSize: "calc(1vh + 1vw)" }}
                  >
                    Please enter new password:
                  </label>
                  <TextField
                    name="newPass"
                    style={{
                      border: "1px solid rgba(255, 132, 164, 1)",
                      borderRadius: "100px",
                      backgroundColor: "white",
                      padding: "8px 12px",
                      fontSize: "1vw",
                    }}
                    variant="standard"
                    onChange={onNewPasswordChange}
                    type={showNewPass ? "text" : "password"}
                    slotProps={{
                      input: {
                        disableUnderline: true,
                        style: { color: "#675844" },
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowNewPass(!showNewPass)}
                            >
                              {showNewPass ? (
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
                      lineHeight: "1.05",
                    }}
                  >
                    {newPasswordErrorMsg}
                  </p>
                  <br></br>
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
                    htmlFor="reenterPass"
                    style={{ paddingLeft: "15px", fontSize: "calc(1vh + 1vw)" }}
                  >
                    Please re-enter new password:
                  </label>
                  <TextField
                    type={showReEnterPass ? "text" : "password"}
                    name="reenterPass"
                    style={{
                      border: "1px solid rgba(255, 132, 164, 1)",
                      borderRadius: "100px",
                      backgroundColor: "white",
                      padding: "8px 12px",
                      fontSize: "calc(.5vw + 1vh)",
                    }}
                    variant="standard"
                    onChange={onReEnteredPassChange}
                    slotProps={{
                      input: {
                        disableUnderline: true,
                        style: { color: "#675844" },
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setShowReEnterPass(!showReEnterPass)
                              }
                            >
                              {showReEnterPass ? (
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
                      lineHeight: "1.05",
                    }}
                  >
                    {newPassReEnterErrorMsg}
                  </p>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    id="submit"
                    sx={submitButtonStyle}
                    onClick={handleSubmit}
                    disabled={hasFormErrors}
                  >
                    <p style={{ fontSize: "calc(.5vw + 1vh)" }}>Submit</p>
                  </Button>
                </div>
              </form>
            </Box>
          </Modal>
        </div>
      ) : (
        <div>
          <Button onClick={handleOpen} sx={openButtonStyle}>
            <SettingOption settingName={"Change password"}></SettingOption>
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="Password Change modal"
            aria-describedby="Modal that allows user to change password"
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
                    style={{ height: "inherit" }}
                    src="assets\icons\Close icon.svg"
                  />
                </Button>
              </div>
              <form
                style={{
                  height: "inherit",
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
                  }}
                >
                  <label
                    htmlFor="currentPass"
                    style={{ paddingLeft: "15px", fontSize: "calc(1vh + 1vw)" }}
                  >
                    Please enter current password:
                  </label>
                  <TextField
                    name="currentPass"
                    style={{
                      border: "1px solid rgba(255, 132, 164, 1)",
                      borderRadius: "100px",
                      backgroundColor: "white",
                      padding: "8px 12px",
                      fontSize: "calc(.5vw + 1vh)",
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
                      lineHeight: "1.05",
                    }}
                  >
                    {passwordErrorMsg}
                  </p>
                  <br></br>
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
                    htmlFor="newPass"
                    style={{ paddingLeft: "15px", fontSize: "calc(1vh + 1vw)" }}
                  >
                    Please enter new password:
                  </label>
                  <TextField
                    type={showNewPass ? "text" : "password"}
                    name="newPass"
                    style={{
                      border: "1px solid rgba(255, 132, 164, 1)",
                      borderRadius: "100px",
                      backgroundColor: "white",
                      padding: "8px 12px",
                      fontSize: "calc(.5vw + 1vh)",
                    }}
                    variant="standard"
                    onChange={onNewPasswordChange}
                    slotProps={{
                      input: {
                        disableUnderline: true,
                        style: { color: "#675844" },
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowNewPass(!showNewPass)}
                            >
                              {showNewPass ? (
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
                      lineHeight: "1.05",
                    }}
                  >
                    {newPasswordErrorMsg}
                  </p>
                  <br></br>
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
                    htmlFor="reenterPass"
                    style={{ paddingLeft: "15px", fontSize: "calc(1vh + 1vw)" }}
                  >
                    Please re-enter new password:
                  </label>
                  <TextField
                    type={showReEnterPass ? "text" : "password"}
                    name="reenterPass"
                    style={{
                      border: "1px solid rgba(255, 132, 164, 1)",
                      borderRadius: "100px",
                      backgroundColor: "white",
                      padding: "8px 12px",
                      fontSize: "calc(.5vw + 1vh)",
                    }}
                    variant="standard"
                    onChange={onReEnteredPassChange}
                    slotProps={{
                      input: {
                        disableUnderline: true,
                        style: { color: "#675844" },
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setShowReEnterPass(!showReEnterPass)
                              }
                            >
                              {showReEnterPass ? (
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
                      lineHeight: "1.05",
                    }}
                  >
                    {newPassReEnterErrorMsg}
                  </p>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    id="submit"
                    sx={submitButtonStyle}
                    onClick={handleSubmit}
                    disabled={hasFormErrors}
                  >
                    <p style={{ fontSize: "calc(.5vw + 1vh)" }}>Submit</p>
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
