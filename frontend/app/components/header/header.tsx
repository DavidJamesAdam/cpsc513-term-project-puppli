import {
  MainNavMenu,
  NotificationMenu,
} from "../dropdown menus/dropdown-menus";

export default function Header() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: "#FFC2CF",
        outline: "1px #FF84A4 solid",
        justifyContent: "space-between",
        alignItems: "center",
        display: "inline-flex",
      }}
    >
      {/* Logo */}
      <div>
        <MainNavMenu />
      </div>

      {/* App name */}
      <div>
        <h1 style={{ fontSize: "54px", color: "var(--font-color)" }}>Puppli</h1>
      </div>

      {/* Notification Bell */}
      <div>
        <NotificationMenu />
      </div>
    </div>
  );
}
