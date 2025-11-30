import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";

type Props = {
  open: boolean;
  uid?: string | undefined;
  onClose: () => void;
  onConfirm: (uid?: string) => void | Promise<void>;
};

export default function ConfirmDeletionModal({ open, uid, onClose, onConfirm }: Props) {
  const matches = useMediaQuery("(min-width: 600px)");

  const modalStyle = {
    borderRadius: "40px",
    border: "1px solid rgba(255, 132, 164, 1)",
    width: "25%",
    height: "20%",
    boxShadow: "5px 10px 10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "rgba(224, 205, 178, 1)",
    position: "absolute",
    transform: "translate(150%, 120%)",
    fontSize: "calc(1vh + 1vw)",
  };

  const modalStyleMobile = {
    borderRadius: "40px",
    border: "1px solid rgba(255, 132, 164, 1)",
    width: "100%",
    height: "25%",
    boxShadow: "5px 10px 10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "rgba(224, 205, 178, 1)",
    position: "absolute",
    transform: "translate(0%, 120%)",
    fontSize: "calc(3vh + 3vw)",
  };

  const buttonStyle = {
    borderRadius: "100px",
    border: "1px solid rgba(147, 191, 191, 1)",
    backgroundColor: "rgba(179, 232, 232, 1)",
    color: "inherit",
    font: "inherit",
    display: "flex",
    minWidth: "50%",
    margin: "10px",
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="Confirm deletion modal"
        aria-describedby="Modal that allows admin to confirm deletion of user"
      >
        <Box sx={matches ? modalStyle : modalStyleMobile}>
          <strong>Are you sure you want to delete this user?</strong>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Button
              sx={buttonStyle}
              onClick={() => {
                void onConfirm(uid);
              }}
              style={{ backgroundColor: "red", color: "white" }}
            >
              Yes
            </Button>
            <Button sx={buttonStyle} onClick={onClose}>
              No
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
