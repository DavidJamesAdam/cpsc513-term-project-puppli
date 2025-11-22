import "../../styles/settings.css";
import faqsIcon from "./icons/faqs.svg";
import notificationsDisabledIcon from "./icons/notificationsDisabled.svg";
import notificationsEnabledIcon from "./icons/notificationsEnabled.svg";
import passwordIcon from "./icons/password.svg";
import usernameIcon from "./icons/username.svg";

interface SettingOptionProps {
  settingName: string;
  enabled?: boolean;
}

// gets the icon based on the setting name
function getIcon(name: string, enabled?: boolean) {
  if (name === "Notifications" && enabled === false) {
    return notificationsDisabledIcon;
  } else if (name === "Notifications" && enabled === true) {
    return notificationsEnabledIcon;
  } else if (name === "Change username") {
    return usernameIcon;
  } else if (name === "Change password") {
    return passwordIcon;
  } else if (name === "FAQs") {
    return faqsIcon;
  }
}

export default function SettingOption({
  settingName,
  enabled,
}: SettingOptionProps) {
  return (
    <>
      <div className="options">
        <img src={getIcon(settingName, enabled)} alt="" />
        <h1 className="optionTitle">{settingName}</h1>
        {enabled}
      </div>
    </>
  );
}
