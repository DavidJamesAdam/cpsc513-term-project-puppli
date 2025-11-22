import React, { useRef, useState } from "react";
import "./styles.css";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { PetSelectionMenu } from "../dropdown menus/dropdown-menus";

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
  const [internalOpen, setInternalOpen] = useState(false);
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
    setImage(null);
  };

  const handleFileBrowser = () => {
    fileInputRef.current.click();
  };

  const handlePicturePreview = (event) => {
    const selectedFile = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      console.log("Selected file:", selectedFile.name);
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handlePictureUpload = () => {
    // Upload picture to database
    setImage(null);
    handleClose();
  };

  const modalStyle = {
    borderRadius: "40px",
    border: "1px solid rgba(255, 132, 164, 1)",
    width: "70%",
    height: "70%",
    boxShadow: "5px 10px 10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(224, 205, 178, 1)",
    position: "absolute",
    transform: "translate(20%, 20%)",
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
    borderRadius: "100px",
    height: "100%",
  };

  const buttonStyle = {
    borderRadius: "100px",
    border: "1px solid rgba(147, 191, 191, 1)",
    backgroundColor: "rgba(179, 232, 232, 1)",
    color: "inherit",
    font: "inherit",
    display: "flex",
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
              justifyContent: "flex-end",
              marginRight: "2%",
              marginLeft: "2%",
            }}
          >
            <Button sx={closeButtonStyle} onClick={handleClose}>
              <img
                style={{ height: "100%" }}
                src="assets\icons\Close icon.svg"
              />
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: "10%",
              height: "80%",
              width: "80%",
            }}
          >
            <input
              type="file"
              accept=".png, .jpg, .jpeg, .pdf"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handlePicturePreview}
            />
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // boxSizing: "border-box",
              }}
            >
              <img
                src={image || "assets/icons/ant-design--picture-outlined.svg"}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  borderRadius: "40px",
                  border: "1px solid rgba(255, 132, 164, 1)",
                  backgroundColor: "rgba(217, 217, 217, 1)",
                }}
                alt="Image Preview"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                width: "20%",
                gap: "8px",
                boxSizing: "border-box",
                paddingLeft: "3%",
              }}
            >
              <PetSelectionMenu />
              <Button sx={buttonStyle} onClick={handleFileBrowser}>
                Select Picture
              </Button>
              <Button
                id="uploadButton"
                sx={buttonStyle}
                onClick={handlePictureUpload}
              >
                Upload
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
