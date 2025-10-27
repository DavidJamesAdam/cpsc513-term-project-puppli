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
      <div
        data-property-1="Default"
        style={{ width: 73, height: 55, position: "relative" }}
      >
        <div style={{}}>
          <img src="app\icons\Logo.svg" />
        </div>
        <div
          className="dropdown"
          style={{ position: "absolute", right: -4, bottom: -6 }}
        >
          <img src="app\icons\mdi_arrow-down-drop.svg" />
        </div>
      </div>

      {/* App name */}
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          display: "flex",
        }}
      >
        <p>Puppli</p>
      </div>

      <div
        data-property-1="Default"
        style={{
          width: 73,
          height: 55,
          position: "relative",
        }}
      >
        <div className="dropdown"
          style={{ position: 'absolute'}}
        >
          <img src="app\icons\mdi_arrow-down-drop.svg" />
        </div>
        <div style={{}}>
          <img src="app\icons\Notification Bell.svg" />
        </div>
      </div>
    </div>
  );
}
