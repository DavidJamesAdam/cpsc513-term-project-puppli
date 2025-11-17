import * as React from "react";
import Button from "@mui/material/Button";

export default function ChangePasswordModal() {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {};
  return (
    <div className="change-password-modal">
      <button className="close-btn">
        <img src="assets\icons\Close icon.svg" />
      </button>
      <form>
        <div className="inputGroup">
          <label htmlFor="currentPass">Please enter current password:</label>
          <input type="text" className="input" name="currentPass" />
        </div>
        <div className="inputGroup">
          <label htmlFor="newPass">Please enter new password:</label>
          <input type="text" className="input" name="newPass" />
        </div>
        <div className="inputGroup">
          <label htmlFor="reenterPass">Please re-enter new password:</label>
          <input type="text" className="input" name="reenterPass" />
        </div>
        <div className="inputGroup buttonRow">
          <Button variant="contained" id="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
