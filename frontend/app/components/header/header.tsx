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
        <h1 style={{fontSize: '54px', color: 'var(--font-color)'}}>Puppli</h1>
      </div>

      { /* Notification Bell */ }
      <div
        data-property-1="Default"
        style={{
          width: 73,
          height: 55,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        {/* Bell wrapper is relative so the arrow can be positioned relative to the bell */}
        <div style={{ position: "relative", display: "inline-block" }}>
          <img src="app\icons\Notification Bell.svg" />
          {/* Arrow positioned bottom-left relative to the bell image */}
          <img
            src="app\icons\mdi_arrow-down-drop.svg"
            style={{ position: "absolute", left: -12, bottom: -12 }}
          />
        </div>
      </div>
    </div>
  );
}
