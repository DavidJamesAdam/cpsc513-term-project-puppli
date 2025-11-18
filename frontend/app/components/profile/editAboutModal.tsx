import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import editIcon from "../settings/icons/username.svg";


interface EditAboutModalProps {
    petInfo: {
        name: string;
        breed: string;
        bday: string;
        treat: string;
        toy: string;
    }
    userInfo: {
        first: string;
        last: string;
        username: string;
        pet1: string;
        pet2: undefined;
    }
}

export default function EditAboutModal( {petInfo, userInfo} : EditAboutModalProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = () => {
    // This function would send off the user's request to update the pets information
    setOpen(false);
  };

  const modalStyle = {
    borderRadius: "40px",
    border: "1px solid rgba(255, 132, 164, 1)",
    boxShadow: "5px 10px 10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "rgba(224, 205, 178, 1)",
    width: "60%",
    maxWidth: "620px",
    height: "100%",
    maxHeight: "600px",
    minHeight: "700px",
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
    <div style={{ display: "flex" }}>
        <span id="aboutTitle">About</span>
        <Button onClick={handleOpen} sx={openButtonStyle}>
            <img src={editIcon} alt="" id="editIcon"/>
        </Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="Edit about modal"
            aria-describedby="Modal that allows user to edit pet information"
        >
            <Box sx={modalStyle}>
                <div style={{ width: "80%" }}>
                    <div style={{ display: "flex", justifyContent: "flex-end", scale: "80%" }}>
                        {/* <div style={{ display: "flex", justifyContent: "flex-end" }}> */}
                        <Button sx={closeButtonStyle} onClick={handleClose}>
                            <img src="assets\icons\Close icon.svg" />
                        </Button>
                    </div>
                    <p>Edit your pet's information!</p>
                    <br></br>
                    <form>
                        <div
                            style={{
                            display: "flex",
                            flexDirection: "row",
                            margin: 0,
                            gap: "8px",
                            }}
                        >
                            <label htmlFor="breed" style={{ paddingLeft: "15px", fontSize: "24px" }}>
                            Breed:
                            </label>
                            <input
                            type="text"
                            name="breed"
                            placeholder={petInfo.breed}
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
                        <br></br>
                        <div
                            style={{
                            display: "flex",
                            flexDirection: "row",
                            margin: 0,
                            gap: "8px",
                            }}
                        >
                            <label htmlFor="bday" style={{ paddingLeft: "15px", fontSize: "24px" }}>
                            Birthday:
                            </label>
                            <input
                            type="text"
                            name="bday"
                            placeholder={petInfo.bday}
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
                        <br></br>
                        <div
                            style={{
                            display: "flex",
                            flexDirection: "row",
                            margin: 0,
                            gap: "8px",
                            }}
                        >
                            <label htmlFor="treat" style={{ paddingLeft: "15px", fontSize: "24px" }}>
                            Favourite Treat:
                            </label>
                            <input
                            type="text"
                            name="treat"
                            placeholder={petInfo.treat}
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
                        <br></br>
                        <div
                            style={{
                            display: "flex",
                            flexDirection: "row",
                            margin: 0,
                            gap: "8px",
                            }}
                        >
                            <p style={{ paddingLeft: "15px", fontSize: "24px" }}>
                            Owner: {userInfo.first} {userInfo.last} - {userInfo.username}
                            </p>
                        </div>
                        <br></br>
                        <div
                            style={{
                            display: "flex",
                            flexDirection: "row",
                            margin: 0,
                            gap: "8px",
                            }}
                        >
                            <label htmlFor="toy" style={{ paddingLeft: "15px", fontSize: "24px" }}>
                            Favourite Toy:
                            </label>
                            <input
                            type="text"
                            name="toy"
                            placeholder={petInfo.toy}
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
