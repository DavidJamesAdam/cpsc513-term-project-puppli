import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import SettingOption from "../settings/settingOption";
import Box from "@mui/material/Box";

export default function ChangeUsernameModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = () => {
    // This function would send off the user's request to change username
    setOpen(false);
  };

  const modalStyle = {
    borderRadius: "40px",
    border: "1px solid rgba(255, 132, 164, 1)",
    width: "50%",
    height: "auto",
    boxShadow: "5px 10px 10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(224, 205, 178, 1)",
    position: "absolute",
    transform: "translate(50%, 50%)",
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

  return (
    <div>
      <Button onClick={handleOpen} sx={openButtonStyle}>
        <SettingOption settingName={"Change username"}></SettingOption>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Change Username modal"
        aria-describedby="Modal that allows user to change their username"
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
                style={{ height: "100%" }}
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
                htmlFor="newUsername"
                style={{ paddingLeft: "15px", fontSize: "2vw" }}
              >
                Please enter new Username:
              </label>
              <input
                type="text"
                name="newUsername"
                style={{
                  border: "1px solid rgba(255, 132, 164, 1)",
                  borderRadius: "100px",
                  backgroundColor: "white",
                  width: "100%",
                  padding: "8px 12px",
                  boxSizing: "border-box",
                }}
              />
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
              <input
                type="text"
                name="confirmPass"
                style={{
                  border: "1px solid rgba(255, 132, 164, 1)",
                  borderRadius: "100px",
                  backgroundColor: "white",
                  width: "100%",
                  padding: "8px 12px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                id="submit"
                sx={submitButtonStyle}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
