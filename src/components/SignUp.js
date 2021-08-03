import React, { useState } from "react";
import axios from "axios";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    if (e.target.type === "text") {
      setName(e.target.value);
    } else if (e.target.type === "email") {
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
      const response = await axios.post(
        "https://simplibackend.herokuapp.com/api/account/user/signup",
        {
          name: name,
          email: email,
          password: password
        }
      );
      const message = await response.data.message;
      console.log(response);
      if (!message.includes("Success")) {
        setErrorMessage(message);
      } else {
        setIsSuccess(true);
      }
    }
  };
  return (
    <div className="form">
      <form>
        <label className="label">
          Name
          <input type="text" onChange={handleChange} placeholder="John Doe" />
        </label>
        <br />
        <label className="label">
          Email Id
          <input
            type="email"
            onChange={handleChange}
            placeholder="johndoe@doe.com"
          />
        </label>
        <br />
        <label className="label">
          Password
          <input
            type="password"
            onChange={handleChange}
            placeholder="********"
          />
        </label>
        <br />
        <button onClick={handleClick} className="btn1">
          Sign Up
        </button>
      </form>
      {errorMessage.length > 0 && (
        <p style={{ color: "red", fontSize: "0.65rem", marginTop: "5px" }}>
          {errorMessage}
        </p>
      )}
      {isSuccess && (
        <p style={{ color: "green", fontSize: "0.65rem", marginTop: "5px" }}>
          {`Welcome to Simplilearn! Try Signing In.`}
        </p>
      )}
    </div>
  );
}
