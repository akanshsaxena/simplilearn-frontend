import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
export default function Auth() {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div id="sign__section">
      <div>
        <h3> {isChecked ? "Sign In" : "Sign Up"} </h3>
      </div>
      <div className="form__container">
        {isChecked ? <SignIn /> : <SignUp />}
      </div>
      <div>
        <p> {isChecked ? "Are you a new user?" : "Already a user?"} </p>
        <label id="checkbox__label">
          {!isChecked ? "Sign In" : "Sign Up"}
          <input
            id="checkbox"
            type="checkbox"
            value={isChecked}
            onClick={(e) => setIsChecked((prev) => !prev)}
          />
        </label>
      </div>
    </div>
  );
}
