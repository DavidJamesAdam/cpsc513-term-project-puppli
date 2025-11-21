import type { Route } from "./+types/settings";
import Header from "../components/header/header";
import SettingOption from "../components/settings/settingOption";
import "../styles/settings.css";
import settingsIcon from "../components/settings/icons/settings.svg";
import aboutIcon from "../components/settings/icons/about.svg";
import userIcon from "../components/settings/icons/user.svg";
import ChangePasswordModal from "~/components/change-password-modal/change-password-modal";
import ChangeUsernameModal from "~/components/change-username-modal/change-username-modal";
import FAQModal from "~/components/faq-modal/faq-modal";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Settings" },
    { name: "description", content: "Settings Page" },
  ];
}

const pathToSettingsIcons = "./icons/";

const version = "1.0.0";

function getIconPath(name : string) {
  return (pathToSettingsIcons + name + ".svg");
}

export default function Settings() {
  return (
    <>
      <Header />
      <main style={{ backgroundColor: "var{--bg-color}", padding: "60px"}}>
        <div className="settings">
            <img src={settingsIcon} alt="" />
            <h1 className="optionTitle">Settings</h1>
        </div>
        <div className="listOptions">
          <SettingOption settingName={"Notifications"} enabled={true}></SettingOption>
          <div className="options">
              <img src={userIcon} alt="" />
              <h1 className="optionTitle">User</h1>
          </div>
          <div className="userOptions">
            <ChangeUsernameModal/>
            <ChangePasswordModal/>
          </div>
          <FAQModal/>
          <div className="options">
              <span id="version">Version: {version}</span>
          </div>
        </div>
      </main>
    </>
  );
}
