import type { Route } from "./+types/profile";
import Header from "../components/header/header";
import "../styles/profile.css";
import { useEffect, useState, type ChangeEvent } from "react";
import settingsIcon from "../components/settings/icons/settings.svg";
import defaultProfilePicture from "../components/profile/defaultPFP.svg";
import postIcon from "../components/profile/postIcon.svg";
import Container from "@mui/material/Container";
import defaultPetProfilePicture from "../components/profile/defaultPetPFP.svg";
import defaultPetPFPMain from "../components/profile/defaultPetPFPMain.svg";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import EditAboutModal from "~/components/profile/editAboutModal";
import CreateSubProfileModal from "~/components/profile/createSubProfileModal";
import TextField from "@mui/material/TextField";
import editIcon from "../components/settings/icons/username.svg";
import SaveAndCancelButtons from "~/components/saveAndCancelButtons";
import UploadModal from "~/components/upload-modal/upload-modal";
import ProfileBanner from "~/components/profile/profileBanner";
import DeleteSubProfileModal from "~/components/profile/deleteSubProfileModal";
import { authCheck } from "../utils/authCheck";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "profile" },
    { name: "description", content: "profile page" },
  ];
}

export default function Profile() {
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  // Pet info from database
  const [petInfo1, setPetInfo1] = useState({
    name: "",
    breed: "",
    bday: "",
    treat: "",
    toy: "",
  });

  const [petInfo2, setPetInfo2] = useState({
    name: "",
    breed: "",
    bday: "",
    treat: "",
    toy: "",
  });

  const [userInfo, setUserInfo] = useState({
    name: "",
    username: "",
    bio: "",
    gold: 0,
    silver: 0,
    bronze: 0,
    pet1: petInfo1,
    pet2: petInfo2,
  });

  // handles the upload modal
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // keeps track of whether we are on a sub profile or not
  const [onMainProfile, setOnMainProfile] = useState(true);
  const [onPetOneSubPage, setOnPetOneSubPage] = useState(false);

  // keep track of what is in the text field when editing the user bio
  const [editingBio, setEditingBio] = useState(false);
  const [editedBio, setEditedBio] = useState<string>(userInfo.bio ?? "");

  // keep track of what is in the text field when editing the user name
  const [editingName, setEditingName] = useState(false);
  const [editedName, setEditedName] = useState<string>(userInfo.name ?? "");

  // keep track of what is in the text field when editing the pet's name
  const [editingPetName, setEditingPetName] = useState(false);
  const [editedPetName, setEditedPetName] = useState<string>(
    onPetOneSubPage ? petInfo1.name : petInfo2.name
  );

  const [currentPet, setCurrentPet] = useState(petInfo1);

  useEffect(() => {
    (async () => {
      try {
        await authCheck();
        setAuthorized(true);

        // Fetch user profile data for the logged-in user
        const userResponse = await fetch("http://localhost:8000/user/me", {
          credentials: "include",
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();

          // Update user info with fetched data
          setUserInfo((prev) => ({
            ...prev,
            name: userData.displayName || "",
            username: userData.userName || "",
            bio: userData.bio || "",
            gold: userData.totalGold || 0,
            silver: userData.totalSilver || 0,
            bronze: userData.totalBronze || 0,
          }));
        }

        // Fetch pets for the logged-in user
        const petsResponse = await fetch("http://localhost:8000/pets", {
          credentials: "include",
        });

        if (petsResponse.ok) {
          const petsData = await petsResponse.json();

          // Map fetched pets to petInfo1 and petInfo2
          if (petsData.length > 0) {
            setPetInfo1({
              name: petsData[0].name || "",
              breed: petsData[0].breed || "",
              bday: petsData[0].birthday || "",
              treat: petsData[0].favouriteTreat || "",
              toy: petsData[0].favouriteToy || "",
            });
          }

          if (petsData.length > 1) {
            setPetInfo2({
              name: petsData[1].name || "",
              breed: petsData[1].breed || "",
              bday: petsData[1].birthday || "",
              treat: petsData[1].favouriteTreat || "",
              toy: petsData[1].favouriteToy || "",
            });
          }
        } else {
          const errorData = await petsResponse.json();
          console.error("Error fetching pets:", petsResponse.status, errorData);
        }
      } catch (e) {
        // Not authenticated — redirect to login.
        window.location.href = "/login";
      }
    })();
  }, []);

  if (authorized === null) {
    // Still checking; render nothing (avoids showing protected content).
    return null;
  }

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteModalClose = () => {
    setAnchorEl(null);
  };

  const maxCharacters = 50;

  // saves edited bio to DB
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

  // saves edited name to DB
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

  // saves edited pet name to DB
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

  // updates the state to know whether we are on main or sub profiles
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

  // updates states to know which sub profile we are on
  function goToSubProfileOne(): void {
    setOnMainProfile(!onMainProfile);
    setOnPetOneSubPage(true);
    setCurrentPet(petInfo1);
  }

  // updates states to know which sub profile we are on
  function goToSubProfileTwo(): void {
    setOnMainProfile(!onMainProfile);
    setOnPetOneSubPage(false);
    setCurrentPet(petInfo2);
  }

  // allows user to toggle between editing and viewing modes
  function setEditBioMode(): void {
    setEditingBio(!editingBio);
  }

  // save the local updates from the input
  function saveBioEditingContent(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setEditedBio(event.currentTarget.value);
  }

  // allows user to toggle between editing and viewing modes
  function setEditNameMode(): void {
    setEditingName(!editingName);
  }

  // save the local updates from the input
  function saveNameEditingContent(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setEditedName(event.currentTarget.value);
  }

  // allows user to toggle between editing and viewing modes
  function setEditPetNameMode(): void {
    setEditingPetName(!editingPetName);
  }

  // save the local updates from the input
  function savePetNameEditingContent(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setEditedPetName(event.currentTarget.value);
  }

  // redirects to settings page
  function navigateToSettings(): void {
    window.location.href = "/settings";
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
            <div className="nameEditor">
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
                        htmlInput: { maxLength: maxCharacters, minLength: 1 },
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
            </div>
            {onMainProfile && (
              <>
                <p>{userInfo.username}</p>
                <Button id="settingsButton" onClick={navigateToSettings}>
                  <img src={settingsIcon} alt="" />
                </Button>
              </>
            )}
          </div>
        </div>
        {onMainProfile ? (
          <div className="grid-container">
            <Container id="aboutContainer">
              <p>Awards</p>
              <ProfileBanner
                first={userInfo.gold}
                second={userInfo.silver}
                third={userInfo.bronze}
              />
              <br></br>
              <p>
                <span>More about {userInfo.username}</span>
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
                  {petInfo1.name ? (
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
                  {petInfo2.name ? (
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
              <div className="evenItem">Favourite Toy: {currentPet.toy}</div>
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
              <Button
                id="deleteProfileButton"
                onClick={() => {
                  // Close the menu, then open the modal rendered outside the Menu
                  handleDeleteModalClose();
                  setDeleteModalOpen(true);
                }}
              >
                Delete Pet Profile
              </Button>
            </div>
          </>
        )}
        <UploadModal
          open={uploadOpen}
          onClose={() => setUploadOpen(false)}
          hideTrigger
        />
        <DeleteSubProfileModal
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          petName={currentPet.name}
        />
      </main>
    </>
  );
}
