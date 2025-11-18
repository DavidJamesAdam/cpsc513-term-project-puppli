import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";

export default function CreateSubProfileModal() {
  const [open, setOpen] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [hasError, setHasError] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = () => {
    if (petName !== "") {
      // pass created object back to parent page
      const newPetInfo = {
        name: "Pet 2",
        breed: "",
        bday: "",
        treat: "",
        toy: "",
      };
      console.log("done");
    }
    // This function would send off the user's request to update the pets information
    setOpen(true);
  };

  const modalStyle = {
    textAlign: "left",
    backgroundColor: "#E0CDB2",
    borderRadius: "40px",
    justifyContent: "center",
    maxWidth: "785px",
    minWidth: "420px",
    maxHeight: "520px",
    padding: "5px",
    border: "1px solid rgba(255, 132, 164, 1)",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "auto",
  };

  const openButtonStyle = {
    fontFamily: "inherit",
    fontSize: "24px",
    textTransform: "capitalize",
    color: "#675844",
    borderColor: "#675844",
  };

  const inputSectionStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    maxWidth: "522px",
    justifySelf: "left",
  };

  const pinkBorder = "1px solid rgba(255, 132, 164, 1)";
  const [inputFieldBorderColor, setInputFieldBorderColor] =
    React.useState(pinkBorder);

  const inputFieldStyle = {
    backgroundColor: "var(--bg-color)",
    borderRadius: "100px",
    padding: "10px",
    maxHeight: "59px",
    borderBottom: "none",
    border: inputFieldBorderColor,
  };

  const closeButtonStyle = {
    display: "flex",
    border: "none",
    padding: 0,
    borderRadius: "100px",
    justifySelf: "flex-end",
    scale: "50%",
  };

  const submitButtonStyle = {
    borderRadius: "100px",
    border: "1px solid rgba(147, 191, 191, 1)",
    backgroundColor: "rgba(179, 232, 232, 1)",
    color: "#675844",
    font: "inherit",
    display: "flex",
    justifyContent: "flex-end",
    margin: "10px",
  };

  const [petName, setPetName] = React.useState("");

  React.useEffect(() => {
    if (petName === "") {
      setErrorMsg("Pet name field cannot be empty.");
      setHasError(true);
      setInputFieldBorderColor("1px solid rgba(255, 0, 0, 1)");
    } else {
      setErrorMsg("");
      setHasError(false);
      console.log(petName);
      setInputFieldBorderColor(pinkBorder);
    }
  }, [petName]);

  function onNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPetName(event.currentTarget.value);
  }

  return (
    <div style={{ display: "flex" }}>
      <Button onClick={handleOpen} sx={openButtonStyle} variant="outlined">
        + Add Pet
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Edit about modal"
        aria-describedby="Modal that allows user to edit pet information"
      >
        <Card sx={modalStyle}>
          <Button sx={closeButtonStyle} onClick={handleClose}>
            <img src="assets\icons\Close icon.svg" />
          </Button>
          <h1 style={{ paddingLeft: "15px", paddingRight: "15px" }}>
            Create a new sub-profile!
          </h1>
          <CardContent sx={inputSectionStyle}>
            <p>Pet name:</p>
            <TextField
              sx={inputFieldStyle}
              variant="standard"
              placeholder={"Pet name"}
              onChange={onNameChange}
              slotProps={{
                input: {
                  disableUnderline: true,
                  style: { color: "#675844" },
                },
              }}
            />
            <p style={{ fontSize: "14px", color: "red", paddingLeft: "5px" }}>
              {errorMsg}
            </p>
          </CardContent>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              id="submit"
              sx={submitButtonStyle}
              onClick={handleSubmit}
              disabled={hasError}
            >
              Submit
            </Button>
          </div>
        </Card>
      </Modal>
    </div>
  );
}
