import * as React from "react";
import { Link } from "react-router-dom";
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
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <img src="assets\icons\Logo.svg" />
        <div
          className="dropdown"
          style={{ position: "absolute", right: -4, bottom: -6 }}
        >
          <img src="assets\icons\mdi_arrow-down-drop.svg" />
        </div>
      </Button>
      <Menu
        className="menu"
        id="nav-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <div className="menu-icon">
            <img src="assets\icons\vote icon.svg" />
          </div>
          <Link className="menu-text" to="/">
            Vote
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <div className="menu-icon">
            <img src="assets\icons\Profile icon.svg" />
          </div>
          <Link className="menu-text" to="/profile">
            Profile
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <div className="menu-icon">
            <img src="assets\icons\Rankings icon.svg" />
          </div>
          <Link className="menu-text" to="/ranking">
            Rankings
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <div className="menu-icon">
            <img src="assets\icons\Upload icon.svg" />
          </div>
          <Link className="menu-text" to="/upload">
            Upload
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <div className="menu-icon">
            <img src="assets\icons\Message icon.svg" />
          </div>
          <Link className="menu-text" to="/message">
            Messages
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <div className="menu-icon">
            <img src="assets\icons\Settings icon.svg" />
          </div>
          <Link className="menu-text" to="/settings">
            Settings
          </Link>
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
          <img src="assets\icons\Notification Bell.svg" />
          <img
            src="assets\icons\mdi_arrow-down-drop.svg"
            style={{ position: "absolute", left: -12, bottom: -12 }}
          />
        </div>
      </Button>
      <Menu
        className="menu"
        id="notification-menu"
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
