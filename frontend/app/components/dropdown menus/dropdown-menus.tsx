import * as React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import UploadModal from "../upload-modal/upload-modal";
import { useEffect, useState } from "react";
import { GetCountries, GetState, GetCity } from "react-country-state-city";

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

  function handleLogOut(
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ): void {
    handleClose();
    // log out logic
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

export function LocationMenu({
  onLocationChange,
}: {
  onLocationChange?: (loc: {
    stateName?: string | null;
    cityName?: string | null;
  }) => void;
}) {
  // Use separate anchors so opening one menu doesn't open the others
  const [anchorState, setAnchorState] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorCity, setAnchorCity] = React.useState<null | HTMLElement>(
    null
  );
  const openState = Boolean(anchorState);
  const openCity = Boolean(anchorCity);
  const handleStateClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // ensure city menu is closed when opening state menu
    setAnchorCity(null);
    setAnchorState(event.currentTarget);
  };
  const handleStateClose = () => setAnchorState(null);
  const handleCityClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // ensure state menu is closed when opening city menu
    setAnchorState(null);
    setAnchorCity(event.currentTarget);
  };
  const handleCityClose = () => setAnchorCity(null);
  const [currentState, setcurrentState] = useState<string | number | null>(
    null
  );
  const [state, setState] = useState<string | number | null>(null);
  const [city, setCity] = useState<string | number | null>(null);
  const [stateList, setStateList] = useState<any[]>([]);
  const [citiesList, setCitiesList] = useState<any[]>([]);
  useEffect(() => {
      GetState(parseInt("39")).then((result) => {
        setStateList(result || []);
      });
  }, ["39"]);
  useEffect(() => {
    if (currentState)
      GetCity(parseInt("39"), parseInt(currentState as any)).then(
        (result) => {
          setCitiesList(result || []);
        }
      );
  }, [currentState]);

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
    <>
      <div>
        <Button
          className="buttonStyle"
          aria-controls={openState ? "state-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openState ? "true" : undefined}
          onClick={handleStateClick}
          sx={buttonStyle}
        >
          {/* Select a Province */}
          {stateList.find((c: any) => c.id == state)?.name || "Select a province"}
        </Button>
        <Menu
          className="menu"
          id="state-menu"
          anchorEl={anchorState}
          open={openState}
          onClose={handleStateClose}
          slotProps={{
            list: {
              "aria-labelledby": "basic-button",
            },
          }}
          style={{width: "40%"}}
        >
          {stateList.map((_state: any) => (
          <MenuItem style={{fontSize: 'inherit', color: "inherit", width: '100%'}}
            key={_state.id}
            onClick={() => {
              setState(_state.id);
              setcurrentState(_state.id);
              handleStateClose();
              // notify parent about selected province (clear city)
              onLocationChange?.({
                stateName: _state.name,
                cityName: null,
              });
            }}
          >
            {_state.name}
          </MenuItem>
        ))}
        </Menu>
        <br/>
        <Button
          className="buttonStyle"
          aria-controls={openCity ? "city-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openCity ? "true" : undefined}
          onClick={handleCityClick}
          sx={buttonStyle}
        >
          {/* Select a City */}
          {citiesList.find((c: any) => c.id == city)?.name || "Select a city"}
        </Button>

        <Menu
          className="menu"
          id="city-menu"
          anchorEl={anchorCity}
          open={openCity}
          onClose={handleCityClose}
          slotProps={{
            list: {
              "aria-labelledby": "basic-button",
            },
          }}
          style={{width: "40%"}}
        >
          {citiesList.map((_city: any) => (
          <MenuItem style={{fontSize: 'inherit', color: "inherit", width: '100%'}}
            key={_city.id}
            onClick={() => {
              setCity(_city.id);
              handleCityClose();
              // notify parent about selected city
              onLocationChange?.({
                stateName: stateList.find((s) => s.id == state)?.name ?? null,
                cityName: _city.name,
              });
            }}
          >
            {_city.name}
          </MenuItem>
        ))}
        </Menu>

      </div>
    </>
  );
}
