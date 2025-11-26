import * as React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import UploadModal from "../upload-modal/upload-modal";

export function MainNavMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [uploadOpen, setUploadOpen] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  async function handleLogOut(
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ): Promise<void> {
    // close the menu
    handleClose();
    try {
      // log out logic
      const resp = await fetch("http://localhost:8000/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // VERY IMPORTANT: accept cookie
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.detail || "Log out failed");
      } else {
        console.log("logged out");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    // redirect to login page
    window.location.href = "/login";
  }

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
        <MenuItem
          onClick={() => {
            // Close the menu, then open the modal rendered outside the Menu
            handleClose();
            setUploadOpen(true);
          }}
        >
          <div className="menu-icon">
            <img src="assets\icons\Upload icon.svg" />
          </div>
          <div className="menu-text">Upload</div>
        </MenuItem>
        <MenuItem onClick={handleLogOut}>
          <div className="menu-icon">
            <img src="assets\icons\Logout icon.svg" />
          </div>
          <div className="menu-text" style={{ color: "#c10058" }}>
            Log out
          </div>
        </MenuItem>
      </Menu>
      {/* Render modal outside the Menu so it isn't unmounted when the Menu closes */}
      <UploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        hideTrigger
      />
    </div>
  );
}

// (UploadModal is rendered from inside MainNavMenu so closing the Menu doesn't unmount it)

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

export function PetSelectionMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const buttonStyle = {
    borderRadius: "100px",
    border: "1px #FF84A4 solid",
    backgroundColor: "#FFC2CF",
    color: "inherit",
    font: "inherit",
    display: "flex",
    width: "100%",
    // margin: "10px",
  };

  return (
    <div>
      <Button
        className="buttonStyle"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={buttonStyle}
      >
        Pick a pet
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
        <MenuItem>Pet</MenuItem>
      </Menu>
    </div>
  );
}
