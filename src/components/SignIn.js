import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { changeIsLoggedIn } from "../slices/authSlice";
import jwt_decode from "jwt-decode";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.type === "email") {
      setEmail(e.target.value);
    } else if (e.target.type === "password") {
      setPassword(e.target.value);
    }
    setErrorMessage("");
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setErrorMessage("All fields are mandatory");
    } else {
      try {
        const response = await axios.post(
          "https://simplibackend.herokuapp.com/api/account/user/login/",
          {
            email: email,
            password: password
          }
        );

        const data = await response.data;
        if (data.status === "success") {
          localStorage.setItem("token", data.message);
          const { _id } = jwt_decode(data.message);
          dispatch(changeIsLoggedIn({ isLoggedIn: true, userId: _id }));
          // console.log();
        } else {
          setErrorMessage(data.message);
        }
      } catch (err) {
        console.log(err);
        setErrorMessage("Something went wrong");
      }
    }
  };
  return (
    <div className="form">
      <form>
        <label className="label">
          Email Id{" "}
          <input
            type="email"
            placeholder="johndoe@doe.com"
            value={email}
            onChange={handleChange}
          />{" "}
        </label>{" "}
        <br />
        <label className="label">
          Password{" "}
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={handleChange}
          />{" "}
        </label>{" "}
        <br />
        <button onClick={handleClick} className="btn1">
          Sign In{" "}
        </button>{" "}
      </form>{" "}
      {/* {isMandatory && (
        <p
          style={{
            color: "red",
            fontSize: "0.65rem",
            marginTop: "5px"
          }}
        >
          All fields are mandatory{" "}
        </p>
      )}{" "} */}
      {errorMessage.length > 0 && (
        <p style={{ color: "red", fontSize: "0.65rem", marginTop: "5px" }}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
