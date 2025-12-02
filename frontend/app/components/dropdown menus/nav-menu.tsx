import * as React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import UploadModal from "../modals/upload-modal/upload-modal";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import "./styles.css";
import {
  menuStyle,
  menuItemStyle,
  mobileMenuStyle,
  mobileMenuItemStyle,
} from "./mui-styles";
import { toastStyle } from "~/styles/component-styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export function MainNavMenu() {
  const matches = useMediaQuery("(min-width: 600px)");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  // Fetch current user role once on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("http://localhost:8000/user/me", {
          credentials: "include",
        });
        if (!mounted) return;
        if (!res.ok) {
          // Not authenticated or other error — hide admin link
          setIsAdmin(false);
          return;
        }
        const user = await res.json();
        setIsAdmin(user.role === "admin");
      } catch (e) {
        console.error("Failed to fetch current user", e);
        if (mounted) setIsAdmin(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);
  const navigate = useNavigate();

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
      toast.promise(
        Promise.resolve(resp),
        {
          loading: "Logging out...",
          success: "Logout successful!",
          error: (err: Error) => `Logout failed: ${err.message}`,
        },
        {
          style: toastStyle,
          duration: 3000,
        }
      );

      console.log("logged out");
    } catch (error) {
      console.error("Error:", error);
    }
    // redirect to login page
    navigate("/login");
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
          paper: matches ? { sx: menuStyle } : { sx: mobileMenuStyle },
          list: {
            "aria-labelledby": "basic-button",
            sx: {
              margin: "10px",
            },
          },
        }}
      >
        <MenuItem onClick={handleClose} sx={matches ? menuItemStyle : mobileMenuItemStyle}>
          <div className="menu-icon">
            <img src="assets\icons\vote icon.svg" />
          </div>
          <Link className="menu-text" to="/">
            Vote
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose} sx={matches ? menuItemStyle : mobileMenuItemStyle}>
          <div className="menu-icon">
            <img src="assets\icons\Profile icon.svg" />
          </div>
          <Link className="menu-text" to="/profile">
            Profile
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose} sx={matches ? menuItemStyle : mobileMenuItemStyle}>
          <div className="menu-icon">
            <img src="assets\icons\Rankings icon.svg" />
          </div>
          <Link className="menu-text" to="/ranking">
            Rankings
          </Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setUploadOpen(true);
          }}
          sx={matches ? menuItemStyle : mobileMenuItemStyle}
        >
          <div className="menu-icon">
            <img src="assets\icons\Upload icon.svg" />
          </div>
          <div className="menu-text">Upload</div>
        </MenuItem>
        {isAdmin ? (
          <MenuItem onClick={handleClose} sx={matches ? menuItemStyle : mobileMenuItemStyle}>
            <div className="menu-icon">
              <img src="assets\icons\fontisto--list-2.svg" />
            </div>
            <Link className="menu-text" to="/all-users">
              All users
            </Link>
          </MenuItem>
        ) : null}
        <MenuItem onClick={handleLogOut} sx={matches ? menuItemStyle : mobileMenuItemStyle}>
          <div className="menu-icon">
            <img src="assets\icons\Logout icon.svg" />
          </div>
          <div
            className="menu-text"
            style={{ color: "#c10058", margin: 0, lineHeight: 1 }}
          >
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
