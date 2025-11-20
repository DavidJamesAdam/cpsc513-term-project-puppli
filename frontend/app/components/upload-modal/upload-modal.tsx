import React, { useRef, useState } from "react";
import "./styles.css";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

type UploadModalProps = {
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  hideTrigger?: boolean;
};

export default function UploadModal({
  open: propOpen,
  onOpen,
  onClose,
  hideTrigger,
}: UploadModalProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [image, setImage] = useState(null);
  const isControlled = propOpen !== undefined;
  const open = isControlled ? propOpen! : internalOpen;
  const fileInputRef = useRef(null);
  const handleOpen = () => {
    if (onOpen) onOpen();
    if (!isControlled) setInternalOpen(true);
  };

  const handleClose = () => {
    if (onClose) onClose();
    if (!isControlled) setInternalOpen(false);
  };

  const handleFileBrowser = () => {
    fileInputRef.current.click();
  };

  const handlePicturePreview = (event) => {
    const selectedFile = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      console.log("Selected file:", selectedFile.name);
      // You can now process the selected file, e.g., upload it
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handlePictureUpload = () => {
    setImage(null);
    handleClose();
  }

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
    transform: "translate(50%, 30%)",
  };

  const openButtonStyle = {
    fontFamily: "inherit",
    fontSize: "inherit",
    height: "inherit",
    textTransform: "capitalize",
    color: "inherit",
    gap: "0.75rem",
    padding: 0,
  };

  const closeButtonStyle = {
    display: "flex",
    padding: 0,
    borderRadius: "100px",
    height: "100%",
  };

  const uploadButtonStyle = {
    borderRadius: "100px",
    border: "1px solid rgba(147, 191, 191, 1)",
    backgroundColor: "rgba(179, 232, 232, 1)",
    color: "inherit",
    font: "inherit",
    display: "flex",
    justifyContent: "flex-end",
    margin: "10px",
  };

  const pictureSmall = {
    borderRadius: "40px",
    border: "1px solid rgba(255, 132, 164, 1)",
  };

  return (
    <div>
      {!hideTrigger && (
        <Button onClick={handleOpen} sx={openButtonStyle}>
          <div className="menu-icon">
            <img src="assets\icons\Upload icon.svg" />
          </div>
          Upload
        </Button>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Upload modal"
        aria-describedby="Modal that allows user to upload photo"
        keepMounted
      >
        <Box sx={modalStyle}>
          <div
            style={{
              width: "100%",
              height: "10%",
              display: "flex",
              justifyContent: "space-between",
              marginTop: "2%",
              marginRight: "5%",
              marginLeft: "5%",
            }}
          >
            <Button
              id="uploadButton"
              sx={uploadButtonStyle}
              onClick={handlePictureUpload}
            >
              Upload
            </Button>
            <Button sx={closeButtonStyle} onClick={handleClose}>
              <img
                style={{ height: "100%" }}
                src="assets\icons\Close icon.svg"
              />
            </Button>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handlePicturePreview}
          />
          <img
            src={image}
            style={{
              width: "50%",
              borderRadius: "40px",
              border: "1px solid rgba(255, 132, 164, 1)",
            }}
            alt="Placeholder image"
          />
          <Button sx={uploadButtonStyle} onClick={handleFileBrowser}>
            Select Picture
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
