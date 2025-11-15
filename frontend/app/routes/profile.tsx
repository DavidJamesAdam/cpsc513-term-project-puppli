import type { Route } from "./+types/profile";
import Header from "../components/header/header";
import "../styles/profile.css";
import { useState } from "react";
import userIcon from "../components/settings/icons/user.svg";
import defaultProfilePicture from "../components/profile/defaultPFP.svg";
import postIcon from "../components/profile/postIcon.svg";
import Container from "@mui/material/Container";
import defaultPetProfilePicture from "../components/profile/defaultPetPFP.svg";
import defaultPetPFPMain from "../components/profile/defaultPetPFPMain.svg";
import banner from "../components/profile/banner.svg";
import Divider from "@mui/material/Divider";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "profile" },
    { name: "description", content: "profile page" },
  ];
}

export default function Profile() {

  const [onMainProfile, setOnMainProfile] = useState(true);

  // test data
  const userInfo = {first: "First", last: "Last", username: "username", pet: "Pet 1"};
  const petInfo = {name: "Pet name", breed: "Golden Retriver", bday: "March 5", treat: "Bone", toy: "Ball"};


  return (
    <>
      <Header />
      <main style={{ backgroundColor: "var{--bg-color}" }}>
        <div id="profileBanner">
          <img src={onMainProfile ? defaultProfilePicture : defaultPetProfilePicture} alt=""/>
          <div id="profileBannerContents">
            <p className="profileName">{onMainProfile ? (userInfo.first + " " + userInfo.last) : petInfo.name}</p>
            {onMainProfile ? (<p>{userInfo.username}</p>) : (<br></br>)}
            <img src={userIcon} alt=""/>
          </div>
        </div>
        {onMainProfile ? (
          <div className="grid-container">
            <div className="flexBox">
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
              <Divider id="verticalDivider" className="divider" variant="inset" orientation="vertical" 
              sx={{ opacity: 1, borderColor: "#675844", borderWidth: "3px", borderTopRightRadius: "10px", borderTopLeftRadius: "10px"}} />
              <Container id="petsContainer">
                <p>Pets</p>
                <div className="oddItem">
                  <div className="petItem">
                    <p className="petName">{userInfo.pet}</p>
                    <img src={defaultPetPFPMain} alt="" />
                  </div>
                </div>
                <div className="evenItem">
                  <div className="petItem">
                    <p className="petName">{userInfo.pet}</p>
                    <img src={defaultPetPFPMain} alt="" />
                  </div>
                </div>
              </Container>
            </div>
            <Divider id="horizontalDivider" className="divider" variant="middle" sx={{ opacity: 1, borderColor: "#675844", borderWidth: "3px", borderRadius: "10px"}} />
            <Container id="postsContainer">
              <p>Posts</p>
              <img src={postIcon} alt="" id="postIcon"/>
            </Container>
          </div>
        ) :
        (<>
          <div className="banner"><img src={banner} alt=""/></div>
          <div id="petInfoContainer">
            <p id="aboutTitle">About</p>
            <div className="oddItem">
              Breed: {petInfo.breed}
            </div>
            <div className="evenItem">
              Birthday: {petInfo.bday}
            </div>
            <div className="oddItem">
              Favourite Treat: {petInfo.treat}
            </div>
            <div className="evenItem">
              Owner: {userInfo.first} {userInfo.last} - {userInfo.username}
            </div>
            <div className="oddItem">
              Favourite Toy: {petInfo.toy}
            </div>
          </div>
          <Divider className="divider" variant="middle" sx={{ opacity: 1, borderColor: "#675844", borderWidth: "3px", borderRadius: "10px"}} />
          <div id="postsContainer">
            <p>Posts</p>
            <img src={postIcon} alt="" id="postIcon"/>
          </div>
        </>)}
      </main>
    </>
  );
}
