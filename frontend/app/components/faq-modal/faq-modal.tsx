import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import SettingOption from "../settings/settingOption";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function FAQModal() {
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

  return (
    <div>
      <Button onClick={handleOpen} sx={openButtonStyle}>
        <SettingOption settingName={"FAQs"}></SettingOption>
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
          <div>

          </div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Q: How can I change my account information (username or password)?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            A: Go to your main Profile page and click the gear icon under your
            username to open Settings. Under the User section, select Change
            username or Change password. A popup will guide you through the
            update.
          </Typography>

          <Typography id="modal-modal-title" variant="h6" component="h2">
            Q: How do I post a picture?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            A: Use the Upload option in the navigation menu. From there, you can
            choose the photos you’d like to upload and post. You may also access
            the Upload function by clicking Posts in the bottom left corner of
            your Main Profile and Sub Profile pages.
          </Typography>

          <Typography id="modal-modal-title" variant="h6" component="h2">
            Q: How do I delete my account?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            A: User-initiated account deletion is not currently supported.
            However, accounts with no login activity for 18 months will be
            permanently removed.
          </Typography>

          <Typography id="modal-modal-title" variant="h6" component="h2">
            Q: Does Puppli have paid services?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            A: No. Puppli is completely free to use, and all features are
            available at no cost.
          </Typography>

          <Typography id="modal-modal-title" variant="h6" component="h2">
            Q: Can I post pictures of more than one pet?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            A: Yes! You can create up to two sub-profiles under your main
            account. Each sub-profile is a dedicated space for an individual
            pet.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
