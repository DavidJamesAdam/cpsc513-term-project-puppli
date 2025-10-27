import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export function MainNavMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    // <div
    //   style={{
    // width: 421,
    // height: 436,
    // backgroundColor: "#FFC2CF",
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: 'space-around'
    //   }}
    // >
    // </div>
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
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
      </Button>
      <Menu
        className="menu"
        id='nav-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <MenuItem>
          <div className="navLink">
            <img src="app\icons\Profile icon.svg" />
            <p>Profile</p>
          </div>
        </MenuItem>
        <MenuItem>
          <div className="navLink">
            <img src="app\icons\Rankings icon.svg" />
            <p>Rankings</p>
          </div>
        </MenuItem>
        <MenuItem>
          <div className="navLink">
            <img src="app\icons\Upload icon.svg" />
            <p>Upload</p>
          </div>
        </MenuItem>
        <MenuItem>
          <div className="navLink">
            <img src="app\icons\Message icon.svg" />
            <p>Messages</p>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}

export function NotificationMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <div style={{ position: "relative", display: "inline-block" }}>
          <img src="app\icons\Notification Bell.svg" />
          <img
            src="app\icons\mdi_arrow-down-drop.svg"
            style={{ position: "absolute", left: -12, bottom: -12 }}
          />
        </div>
      </Button>
      <Menu
        className="menu"
        id='notification-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <MenuItem>Notification</MenuItem>
      </Menu>
    </div>
  );
}
