import type { Route } from "./+types/profile";
import Header from "../components/header/header";
import "../styles/profile.css";
import { useState } from "react";
import settingsIcon from "../components/settings/icons/settings.svg";
import defaultProfilePicture from "../components/profile/defaultPFP.svg";
import postIcon from "../components/profile/postIcon.svg";
import Container from "@mui/material/Container";
import defaultPetProfilePicture from "../components/profile/defaultPetPFP.svg";
import defaultPetPFPMain from "../components/profile/defaultPetPFPMain.svg";
import banner from "../components/profile/banner.svg";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import EditAboutModal from "~/components/profile/editAboutModal";
import CreateSubProfileModal from "~/components/profile/createSubProfileModal";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "profile" },
    { name: "description", content: "profile page" },
  ];
}

export default function Profile() {
  const navigate = useNavigate();

  const [onMainProfile, setOnMainProfile] = useState(true);

  const [onPetOneSubPage, setOnPetOneSubPage] = useState(false);

  // test data
  const petInfo1 = {
    name: "Pet 1",
    breed: "Golden Retriver",
    bday: "March 5",
    treat: "Bone",
    toy: "Ball",
  };

  const petInfo2 = {
    name: "",
    breed: "",
    bday: "",
    treat: "",
    toy: "",
  };

  const userInfo = {
    first: "First",
    last: "Last",
    username: "username",
    pet1: petInfo1,
    pet2: petInfo2,
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

  return (
    <>
      <Header />
      <main style={{ backgroundColor: "var{--bg-color}" }}>
        <div id="profileBanner">
          <img
            src={
              onMainProfile ? defaultProfilePicture : defaultPetProfilePicture
            }
            alt=""
          />
          <div id="profileBannerContents">
            <p className="profileName">
              {onMainProfile
                ? userInfo.first + " " + userInfo.last
                : currentPet.name}
            </p>
            {onMainProfile ? <p>{userInfo.username}</p> : <br></br>}
            <Button id="settingsButton" onClick={() => navigate("/settings")}>
              <img src={settingsIcon} alt="" />
            </Button>
          </div>
        </div>
        {onMainProfile ? (
          <div className="grid-container">
            <Container id="aboutContainer">
              <p>About</p>
              <img src={banner} alt="" />
              <br></br>
              <p>more stuff here</p>
              <ul>
                <li>...</li>
                <li>...</li>
                <li>...</li>
              </ul>
            </Container>
            <Container id="petsContainer">
              <p>Pets</p>
              <div className="oddItem">
                <div className="petItem">
                  {userInfo.pet1 ? (
                    <Button className="petName" onClick={goToSubProfileOne}>
                      {userInfo.pet1.name}
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
                      {userInfo.pet2.name}
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
              <p>Upload</p>
              <img src={postIcon} alt="" id="postIcon" />
            </div>
          </div>
        ) : (
          <>
            <div className="banner">
              <img src={banner} alt="" />
            </div>
            <div id="petInfoContainer">
              <EditAboutModal petInfo={currentPet} userInfo={userInfo} />
              <div className="oddItem">Breed: {currentPet.breed}</div>
              <div className="evenItem">Birthday: {currentPet.bday}</div>
              <div className="oddItem">Favourite Treat: {currentPet.treat}</div>
              <div className="evenItem">
                Owner: {userInfo.first} {userInfo.last} - {userInfo.username}
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
                Upload <img src={postIcon} alt="" id="postIcon" />
              </p>
              <Button id="backButton" onClick={changeProfilePage}>
                Back
              </Button>
            </div>
          </>
        )}
      </main>
    </>
  );
}
