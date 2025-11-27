import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";

interface DeleteSubProfileModalProps {
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  petName: string;
}

export default function DeleteSubProfileModal({
  open: propOpen,
  onOpen,
  onClose,
  petName,
}: DeleteSubProfileModalProps) {
  // handles whether the modal is open or not
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = propOpen !== undefined;
  const open = isControlled ? propOpen! : internalOpen;
  // handles what happens when user closes the modal
  const handleClose = () => {
    if (onClose) onClose();
    if (!isControlled) setInternalOpen(false);
  };
  // handles what happens when user clicks DELETE in the modal
  const handleDelete = () => {
    // TODO: Send delete request to DB for the current pet
    // redirect user to main profile page
    window.location.href = "/profile";
  };

  // bunch of styling in constants used for sx attributes
  const modalStyle = {
    textAlign: "left",
    backgroundColor: "#E0CDB2",
    borderRadius: "40px",
    justifyContent: "center",
    maxWidth: "500px",
    minWidth: "300px",
    maxHeight: "520px",
    padding: "5px",
    border: "1px solid rgba(255, 132, 164, 1)",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "auto",
  };

  const pinkBorder = "1px solid rgba(255, 132, 164, 1)";

  const closeButtonStyle = {
    display: "flex",
    border: "none",
    padding: 0,
    borderRadius: "100px",
    justifySelf: "flex-end",
    scale: "50%",
  };

  const deleteButtonStyle = {
    borderRadius: "100px",
    border: pinkBorder,
    backgroundColor: "#ffc2cf",
    color: "#c10058",
    font: "inherit",
    display: "flex",
    justifyContent: "flex-end",
    margin: "10px",
  };

  return (
    <div style={{ display: "flex" }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Delete sub-profile modal"
        aria-describedby="Modal that allows user to delete a sub-profile"
      >
        <Card sx={modalStyle}>
          <Button sx={closeButtonStyle} onClick={handleClose}>
            <img src="assets\icons\Close icon.svg" />
          </Button>
          <h1
            style={{
              paddingLeft: "15px",
              paddingRight: "15px",
              fontSize: "32px",
            }}
          >
            Are you sure you want to delete <b>{petName}'s</b> profile?
          </h1>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              sx={deleteButtonStyle}
              onClick={handleDelete}
            >
              DELETE
            </Button>
          </div>
        </Card>
      </Modal>
    </div>
  );
}
