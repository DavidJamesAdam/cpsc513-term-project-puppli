import React, { useRef, useState } from "react";
import "./styles.css";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import disabledCommentIcon from "../voting-card/icons/disabled_comment.svg";

interface CommentModalProps {
  authorized: boolean;
}

export default function CommentModal({ authorized }: CommentModalProps) {
  const [open, setOpen] = React.useState(false);
  const matches = useMediaQuery("(min-width: 600px)");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submitComment = () => {
    setOpen(false);
  };

  const modalStyle = {
    borderRadius: "40px",
    border: "1px solid rgba(255, 132, 164, 1)",
    width: "50%",
    height: "70%",
    boxShadow: "5px 10px 10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(224, 205, 178, 1)",
    position: "absolute",
    transform: "translate(50%, 20%)",
  };

  const modalStyleMobile = {
    borderRadius: "40px",
    border: "1px solid rgba(255, 132, 164, 1)",
    width: "100%",
    height: "60%",
    boxShadow: "5px 10px 10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(224, 205, 178, 1)",
    position: "absolute",
    transform: "translate(0%, 30%)",
  };

  const openButtonStyle = {
    fontFamily: "inherit",
    fontSize: "inherit",
    height: "inherit",
    textTransform: "capitalize",
    color: "inherit",
    gap: "0.75rem",
    padding: "8px",
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
    // width: '40%',
    minWidth: "30%",
    margin: "10px",
  };

  return (
    <>
      {matches ? (
        <div>
          {authorized ? (
            <Button onClick={handleOpen} sx={openButtonStyle}>
              <div>
                <img src="assets\icons\Message icon.svg" />
              </div>
            </Button>
          ) : (
            <Button sx={openButtonStyle}>
              <img src={disabledCommentIcon} />
            </Button>
          )}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="Comment modal"
            aria-describedby="Modal that allows user comment on a picture"
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
                  width: "auto",
                  height: "auto",
                  maxWidth: "80%",
                  maxHeight: "70%",
                  borderRadius: "40px",
                  border: "1px solid rgba(255, 132, 164, 1)",
                  backgroundColor: "rgba(217, 217, 217, 1)",
                }}
              >
                <img
                  src={"assets/icons/ant-design--picture-outlined.svg"}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "inherit",
                  }}
                />
              </div>
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  // alignItems: 'center',
                  margin: "10px",
                  width: "40%",
                }}
              >
                <div>
                  <input
                    type="text"
                    placeholder="Add your comment..."
                    style={{
                      backgroundColor: "white",
                      borderRadius: "100px",
                      border: "1px solid rgba(255, 132, 164, 1)",
                      width: "100%",
                      padding: "8px 12px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <Button sx={buttonStyle} onClick={submitComment}>
                  Submit comment
                </Button>
              </form>
            </Box>
          </Modal>
        </div>
      ) : (
        <div>
          {authorized ? (
            <Button onClick={handleOpen} sx={openButtonStyle}>
              <div>
                <img src="assets\icons\Message icon.svg" />
              </div>
            </Button>
          ) : (
            <Button sx={openButtonStyle}>
              <img src={disabledCommentIcon} />
            </Button>
          )}

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="Comment modal"
            aria-describedby="Modal that allows user comment on a picture"
          >
            <Box sx={modalStyleMobile}>
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
                  width: "auto",
                  height: "auto",
                  maxWidth: "80%",
                  maxHeight: "70%",
                  borderRadius: "40px",
                  border: "1px solid rgba(255, 132, 164, 1)",
                  backgroundColor: "rgba(217, 217, 217, 1)",
                }}
              >
                <img
                  src={"assets/icons/ant-design--picture-outlined.svg"}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "inherit",
                  }}
                />
              </div>
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  // alignItems: 'center',
                  margin: "10px",
                  width: "70%",
                }}
              >
                <div>
                  <input
                    type="text"
                    placeholder="Add your comment..."
                    style={{
                      backgroundColor: "white",
                      borderRadius: "100px",
                      border: "1px solid rgba(255, 132, 164, 1)",
                      width: "100%",
                      padding: "8px 12px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <Button sx={buttonStyle} onClick={submitComment}>
                  Submit comment
                </Button>
              </form>
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
}
