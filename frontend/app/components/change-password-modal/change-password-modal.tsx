import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import SettingOption from "../settings/settingOption";
import Box from "@mui/material/Box";

export default function ChangePasswordModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = () => {
    // This function would send off the user's request to change password
    setOpen(false);
  };

  const modalStyle = {
    borderRadius: "40px",
    border: "1px solid rgba(255, 132, 164, 1)",
    width: "50%",
    height: "50%",
    boxShadow: "5px 10px 10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "rgba(224, 205, 178, 1)",
    position: 'absolute',
    transform: 'translate(50%, 50%)'
  };

  const openButtonStyle = {
    fontFamily: "inherit",
    fontSize: "24px",
    textTransform: "capitalize",
  };

  const closeButtonStyle = {
    display: "flex",
    border: "none",
    padding: 0,
    borderRadius: "100px",
  };

  const submitButtonStyle = {
    borderRadius: "100px",
    border: "1px solid rgba(147, 191, 191, 1)",
    backgroundColor: "rgba(179, 232, 232, 1)",
    color: "inherit",
    font: "inherit",
    display: "flex",
    justifyContent: "flex-end",
    margin: "10px"
  };

  return (
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
          <div style={{ width: "80%" }}>
            <div style={{ transform: 'translate(75%, -40%) scale(50%)'}}>
            {/* <div style={{ display: "flex", justifyContent: "flex-end" }}> */}
              <Button sx={closeButtonStyle} onClick={handleClose}>
                <img src="assets\icons\Close icon.svg" />
              </Button>
            </div>
            <form>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: 0,
                  gap: "8px",
                }}
              >
                <label htmlFor="currentPass" style={{ paddingLeft: "15px" }}>
                  Please enter current password:
                </label>
                <input
                  type="text"
                  name="currentPass"
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
                <label htmlFor="newPass" style={{ paddingLeft: "15px" }}>
                  Please enter new password:
                </label>
                <input
                  type="text"
                  name="newPass"
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
                <label htmlFor="reenterPass" style={{ paddingLeft: "15px" }}>
                  Please re-enter new password:
                </label>
                <input
                  type="text"
                  name="reenterPass"
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
                <Button variant="contained" id="submit" sx={submitButtonStyle} onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
