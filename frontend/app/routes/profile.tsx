import type { Route } from "./+types/profile";
import Header from "../components/header/header";
import "../styles/profile.css";
import { useState, type ChangeEvent } from "react";
import settingsIcon from "../components/settings/icons/settings.svg";
import defaultProfilePicture from "../components/profile/defaultPFP.svg";
import postIcon from "../components/profile/postIcon.svg";
import Container from "@mui/material/Container";
import defaultPetProfilePicture from "../components/profile/defaultPetPFP.svg";
import defaultPetPFPMain from "../components/profile/defaultPetPFPMain.svg";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import EditAboutModal from "~/components/profile/editAboutModal";
import CreateSubProfileModal from "~/components/profile/createSubProfileModal";
import TextField from "@mui/material/TextField";
import editIcon from "../components/settings/icons/username.svg";
import SaveAndCancelButtons from "~/components/saveAndCancelButtons";
import UploadModal from "~/components/upload-modal/upload-modal";
import ProfileBanner from "~/components/profile/profileBanner";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "profile" },
    { name: "description", content: "profile page" },
  ];
}

export default function Profile() {
  // test data
  const [petInfo1, setPetInfo1] = useState({
    name: "Pet 1",
    breed: "Golden Retriver",
    bday: "March 5",
    treat: "Bone",
    toy: "Ball",
  });

  const [petInfo2, setPetInfo2] = useState({
    name: "",
    breed: "",
    bday: "",
    treat: "",
    toy: "",
  });

  const [userInfo, setUserInfo] = useState({
    name: "Name",
    username: "username",
    bio: "About me!!!!",
    first: 4,
    second: 7,
    third: 0,
    pet1: petInfo1,
    pet2: petInfo2,
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const maxCharacters = 50;

  const navigate = useNavigate();

  const [onMainProfile, setOnMainProfile] = useState(true);
  const [onPetOneSubPage, setOnPetOneSubPage] = useState(false);

  const [editingBio, setEditingBio] = useState(false);
  const [editedBio, setEditedBio] = useState<string>(userInfo.bio ?? "");

  const handleSaveBio = (saved: boolean) => {
    if (saved) {
      setEditedBio(editedBio);
      // update local object (since data from DB is not available yet)
      setUserInfo((prev) => ({ ...prev, bio: editedBio }));
      // TODO: save the bio in the text field to the user DB object.
    }
    // either button clicked should disable editing mode on user bio
    setEditingBio(false);
    setEditedBio(userInfo.bio);
  };

  const [editingName, setEditingName] = useState(false);
  const [editedName, setEditedName] = useState<string>(userInfo.name ?? "");

  const handleSaveName = (saved: boolean) => {
    if (saved) {
      setEditedName(editedName);
      // update local object (since data from DB is not available yet)
      setUserInfo((prev) => ({ ...prev, name: editedName }));
      // TODO: save to DB
    }
    // either button clicked should disable editing mode on user name
    setEditingName(false);
    setEditedName(userInfo.name);
  };

  const [editingPetName, setEditingPetName] = useState(false);
  const [editedPetName, setEditedPetName] = useState<string>(
    onPetOneSubPage ? petInfo1.name : petInfo2.name
  );

  const handleSavePetName = (saved: boolean) => {
    if (saved) {
      setEditedPetName(editedPetName);
      // update local object (since data from DB is not available yet)
      if (onPetOneSubPage) {
        setPetInfo1((prev) => ({ ...prev, name: editedPetName }));
        setUserInfo((prev) => ({ ...prev, pet1: petInfo1 }));
      } else {
        setPetInfo2((prev) => ({ ...prev, name: editedPetName }));
        setUserInfo((prev) => ({ ...prev, pet2: petInfo2 }));
      }
      // TODO: save to DB
    }
    // either button clicked should disable editing mode on user name
    setEditingPetName(false);
    setEditedPetName(onPetOneSubPage ? petInfo1.name : petInfo2.name);
  };

  const [currentPet, setCurrentPet] = useState(petInfo1);

  function changeProfilePage(): void {
    setOnMainProfile(!onMainProfile);
    if (onPetOneSubPage) {
      setCurrentPet(petInfo1);
    } else {
      setCurrentPet(petInfo2);
    }
  }

  function createSubProfile(): void {
    throw new Error("Function not implemented.");
  }

  function goToSubProfileOne(): void {
    setOnMainProfile(!onMainProfile);
    setOnPetOneSubPage(true);
    setCurrentPet(petInfo1);
  }

  function goToSubProfileTwo(): void {
    setOnMainProfile(!onMainProfile);
    setOnPetOneSubPage(false);
    setCurrentPet(petInfo2);
  }

  function setEditBioMode(): void {
    setEditingBio(!editingBio);
  }

  function saveBioEditingContent(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setEditedBio(event.currentTarget.value);
  }

  function setEditNameMode(): void {
    setEditingName(!editingName);
  }

  function saveNameEditingContent(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setEditedName(event.currentTarget.value);
  }

  function setEditPetNameMode(): void {
    setEditingPetName(!editingPetName);
  }

  function savePetNameEditingContent(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setEditedPetName(event.currentTarget.value);
  }

  return (
    <>
      <Header />
      <main style={{ backgroundColor: "var{--bg-color}" }}>
        {!onMainProfile && (
          <div style={{ backgroundColor: "#e0cdb2" }}>
            <Button id="backButton" onClick={changeProfilePage}>
              ← Back
            </Button>
          </div>
        )}
        <div id="profileBanner">
          <img
            src={
              onMainProfile ? defaultProfilePicture : defaultPetProfilePicture
            }
            alt=""
          />
          <div id="profileBannerContents">
            <p className="nameEditor">
              {onMainProfile && !editingName ? (
                <>
                  <p className="profileName">
                    {userInfo.name}
                    <Button onClick={setEditNameMode}>
                      <img
                        src={editIcon}
                        alt=""
                        id="editIcon"
                        style={{ scale: "85%" }}
                      />
                    </Button>
                  </p>
                </>
              ) : (
                onMainProfile && (
                  <>
                    <TextField
                      className="input"
                      variant="standard"
                      onChange={saveNameEditingContent}
                      value={editedName}
                      placeholder={userInfo.name ?? "Enter your name..."}
                      slotProps={{
                        input: {
                          disableUnderline: true,
                          style: { color: "#675844" },
                        },
                        htmlInput: { maxLength: maxCharacters },
                      }}
                    />
                    <SaveAndCancelButtons onAction={handleSaveName} />
                  </>
                )
              )}
              {!onMainProfile && !editingPetName ? (
                <>
                  <p className="profileName">
                    {onPetOneSubPage ? petInfo1.name : petInfo2.name}
                    <Button onClick={setEditPetNameMode}>
                      <img
                        src={editIcon}
                        alt=""
                        id="editIcon"
                        style={{ scale: "85%" }}
                      />
                    </Button>
                  </p>
                </>
              ) : (
                !onMainProfile && (
                  <>
                    <TextField
                      className="input"
                      variant="standard"
                      onChange={savePetNameEditingContent}
                      value={editedPetName}
                      placeholder={
                        (onPetOneSubPage ? petInfo1.name : petInfo2.name) ??
                        "Enter your pet's name..."
                      }
                      slotProps={{
                        input: {
                          disableUnderline: true,
                          style: { color: "#675844" },
                        },
                        htmlInput: { maxLength: maxCharacters },
                      }}
                    />
                    <SaveAndCancelButtons onAction={handleSavePetName} />
                  </>
                )
              )}
            </p>
            {onMainProfile && (
              <>
                <p>{userInfo.username}</p>
                <Button
                  id="settingsButton"
                  onClick={() => navigate("/settings")}
                >
                  <img src={settingsIcon} alt="" />
                </Button>
              </>
            )}
          </div>
        </div>
        {onMainProfile ? (
          <div className="grid-container">
            <Container id="aboutContainer">
              <p>About</p>
              <ProfileBanner
                first={userInfo.first}
                second={userInfo.second}
                third={userInfo.third}
              />
              <br></br>
              <p>
                <span>More about {userInfo.name}</span>
                {!editingBio ? (
                  <Button onClick={setEditBioMode}>
                    <img src={editIcon} alt="" id="editIcon" />
                  </Button>
                ) : (
                  <SaveAndCancelButtons onAction={handleSaveBio} />
                )}
              </p>
              {userInfo.bio && !editingBio ? (
                <p style={{ fontSize: "24px" }}>{userInfo.bio}</p>
              ) : (
                <TextField
                  className="input"
                  variant="filled"
                  multiline={true}
                  maxRows={4}
                  onChange={saveBioEditingContent}
                  value={editedBio}
                  placeholder={
                    userInfo.bio ?? "Enter more information about yourself..."
                  }
                  slotProps={{
                    input: {
                      disableUnderline: true,
                      style: { color: "#675844" },
                    },
                    htmlInput: { maxLength: 200 },
                  }}
                  helperText="Max 200 characters"
                />
              )}
            </Container>
            <Container id="petsContainer">
              <p>Pets</p>
              <div className="oddItem">
                <div className="petItem">
                  {userInfo.pet1 ? (
                    <Button className="petName" onClick={goToSubProfileOne}>
                      {petInfo1.name}
                    </Button>
                  ) : (
                    <></>
                  )}
                  <img src={defaultPetPFPMain} alt="" />
                </div>
              </div>
              <div className="evenItem">
                <div className="petItem">
                  {userInfo.pet2.name ? (
                    <Button className="petName" onClick={goToSubProfileTwo}>
                      {petInfo2.name}
                    </Button>
                  ) : (
                    <CreateSubProfileModal />
                  )}
                  <img src={defaultPetPFPMain} alt="" />
                </div>
              </div>
            </Container>
            <Divider
              id="horizontalDivider"
              className="divider"
              variant="middle"
              sx={{
                opacity: 1,
                borderColor: "#675844",
                borderWidth: "3px",
                borderRadius: "10px",
              }}
            />
            <div id="postsContainerUser">
              <p style={{ display: "flex" }}>
                <Button
                  id="petUploadButton"
                  onClick={() => {
                    // Close the menu, then open the modal rendered outside the Menu
                    handleClose();
                    setUploadOpen(true);
                  }}
                >
                  Upload <img src={postIcon} alt="" id="postIcon" />
                </Button>
              </p>
            </div>
          </div>
        ) : (
          <>
            <div id="petInfoContainer">
              <EditAboutModal petInfo={currentPet} userInfo={userInfo} />
              <div className="oddItem">Breed: {currentPet.breed}</div>
              <div className="evenItem">Birthday: {currentPet.bday}</div>
              <div className="oddItem">Favourite Treat: {currentPet.treat}</div>
              <div className="evenItem">
                Owner: {userInfo.name} - {userInfo.username}
              </div>
              <div className="oddItem">Favourite Toy: {currentPet.toy}</div>
            </div>
            <Divider
              className="divider"
              variant="middle"
              sx={{
                opacity: 1,
                borderColor: "#675844",
                borderWidth: "3px",
                borderRadius: "10px",
              }}
            />
            <div id="postsContainer">
              <p style={{ display: "flex" }}>
                <Button
                  id="petUploadButton"
                  onClick={() => {
                    // Close the menu, then open the modal rendered outside the Menu
                    handleClose();
                    setUploadOpen(true);
                  }}
                >
                  Upload <img src={postIcon} alt="" id="postIcon" />
                </Button>
              </p>
            </div>
          </>
        )}
        <UploadModal
          open={uploadOpen}
          onClose={() => setUploadOpen(false)}
          hideTrigger
        />
      </main>
    </>
  );
}
