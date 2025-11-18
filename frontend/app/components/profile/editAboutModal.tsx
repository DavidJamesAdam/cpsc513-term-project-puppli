import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import editIcon from "../settings/icons/username.svg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";

interface EditAboutModalProps {
  petInfo: {
    name: string;
    breed: string;
    bday: string;
    treat: string;
    toy: string;
  };
  userInfo: {
    first: string;
    last: string;
    username: string;
    pet1?: {
      name: string;
      breed: string;
      bday: string;
      treat: string;
      toy: string;
    };
    pet2?: {
      name: string;
      breed: string;
      bday: string;
      treat: string;
      toy: string;
    };
  };
}

export default function EditAboutModal({
  petInfo,
  userInfo,
}: EditAboutModalProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = () => {
    // This function would send off the user's request to update the pets information
    setOpen(false);
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

  const inputFieldStyle = {
    backgroundColor: "var(--bg-color)",
    borderRadius: "100px",
    padding: "10px",
    maxHeight: "59px",
    borderBottom: "none",
    border: pinkBorder,
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

  const [breed, setBreed] = React.useState(petInfo.breed);
  const [bday, setBday] = React.useState(petInfo.bday);
  const [treat, setTreat] = React.useState(petInfo.treat);
  const [toy, setToy] = React.useState(petInfo.toy);

  const [breedErrorMsg, setBreedErrorMsg] = React.useState("");
  const [hasBreedError, setHasBreedError] = React.useState(false);
  const [bdayErrorMsg, setBdayErrorMsg] = React.useState("");
  const [hasBdayError, setHasBdayError] = React.useState(false);
  const [treatErrorMsg, setTreatErrorMsg] = React.useState("");
  const [hasTreatError, setHasTreatError] = React.useState(false);
  const [toyErrorMsg, setToyErrorMsg] = React.useState("");
  const [hasToyError, setHasToyError] = React.useState(false);

  const [hasFormErrors, setHasFormErrors] = React.useState(false);

  React.useEffect(() => {
    if (breed === "") {
      setBreedErrorMsg("Pet breed field cannot be empty.");
      setHasBreedError(true);
    } else {
      setBreedErrorMsg("");
      setHasBreedError(false);
    }

    if (bday === "") {
      setBdayErrorMsg("Pet birthday field cannot be empty.");
      setHasBdayError(true);
    } else {
      setBdayErrorMsg("");
      setHasBdayError(false);
    }

    if (treat === "") {
      setTreatErrorMsg("Pet favourite treat field cannot be empty.");
      setHasTreatError(true);
    } else {
      setTreatErrorMsg("");
      setHasTreatError(false);
    }

    if (toy === "") {
      setToyErrorMsg("Pet favourite toy field cannot be empty.");
      setHasToyError(true);
    } else {
      setToyErrorMsg("");
      setHasToyError(false);
    }
  }, [breed, bday, treat, toy]);

  React.useEffect(() => {
    if (hasBreedError || hasBdayError || hasTreatError || hasToyError) {
      setHasFormErrors(true);
    } else {
      setHasFormErrors(false);
    }
  }, [hasBreedError, hasBdayError, hasTreatError, hasToyError]);

  function onBreedChange(event: React.ChangeEvent<HTMLInputElement>) {
    setBreed(event.currentTarget.value);
  }

  function onBdayChange(event: React.ChangeEvent<HTMLInputElement>) {
    setBday(event.currentTarget.value);
  }

  function onTreatChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTreat(event.currentTarget.value);
  }

  function onToyChange(event: React.ChangeEvent<HTMLInputElement>) {
    setToy(event.currentTarget.value);
  }

  return (
    <div style={{ display: "flex" }}>
      <span id="aboutTitle">About</span>
      <Button onClick={handleOpen} sx={openButtonStyle}>
        <img src={editIcon} alt="" id="editIcon" />
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
            Edit your pet's information!
          </h1>
          <CardContent sx={inputSectionStyle}>
            <p>Breed:</p>
            <TextField
              sx={inputFieldStyle}
              variant="standard"
              defaultValue={petInfo.breed}
              onChange={onBreedChange}
              slotProps={{
                input: {
                  disableUnderline: true,
                  style: { color: "#675844" },
                },
              }}
            />
            <p style={{ fontSize: "14px", color: "red", paddingLeft: "5px" }}>
              {breedErrorMsg}
            </p>
            <br></br>
            <p>Birthday:</p>
            <TextField
              sx={inputFieldStyle}
              variant="standard"
              defaultValue={petInfo.bday}
              onChange={onBdayChange}
              slotProps={{
                input: {
                  disableUnderline: true,
                  style: { color: "#675844" },
                },
              }}
            />
            <p style={{ fontSize: "14px", color: "red", paddingLeft: "5px" }}>
              {bdayErrorMsg}
            </p>
            <br></br>
            <p>Favourite Treat:</p>
            <TextField
              sx={inputFieldStyle}
              variant="standard"
              defaultValue={petInfo.treat}
              onChange={onTreatChange}
              slotProps={{
                input: {
                  disableUnderline: true,
                  style: { color: "#675844" },
                },
              }}
            />
            <p style={{ fontSize: "14px", color: "red", paddingLeft: "5px" }}>
              {treatErrorMsg}
            </p>
            <br></br>
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              <p>
                Owner: {userInfo.first} {userInfo.last} - {userInfo.username}
              </p>
            </div>
            <br></br>
            <p>Favourite Toy:</p>
            <TextField
              sx={inputFieldStyle}
              variant="standard"
              defaultValue={petInfo.toy}
              onChange={onToyChange}
              slotProps={{
                input: {
                  disableUnderline: true,
                  style: { color: "#675844" },
                },
              }}
            />
            <p style={{ fontSize: "14px", color: "red", paddingLeft: "5px" }}>
              {toyErrorMsg}
            </p>
            <br></br>
          </CardContent>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              id="submit"
              sx={submitButtonStyle}
              onClick={handleSubmit}
              disabled={hasFormErrors}
            >
              Submit
            </Button>
          </div>
        </Card>
      </Modal>
    </div>
  );
}
