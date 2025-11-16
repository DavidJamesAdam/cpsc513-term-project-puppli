import * as React from "react";

export default function ChangePasswordModal() {
  return (
    <div className="change-password-modal">
      <form>
        <label htmlFor="fname">First name:</label>
        <input type="text" id="fname" name="fname" />
        <label htmlFor="lname">Last name:</label>
        <input type="text" id="lname" name="lname" />
        <input type="button"></input>
      </form>
    </div>
  );
}
