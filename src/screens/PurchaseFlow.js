import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import axios from "axios";
export default function PurchaseFlow() {
  const [isCardDetailsEntered, setIsCardDetailsEntered] = useState(false);

  // const handle = () => {
  //   setIsCardDetailsEntered(true);
  // };
  return (
    <div className="container">
      <Header />
      <div className="purchase-form">
        {!isCardDetailsEntered ? (
          <CardDetails setIsCardDetailsEntered={setIsCardDetailsEntered} />
        ) : (
          <OTP />
        )}
      </div>
    </div>
  );
}

function CardDetails({ setIsCardDetailsEntered }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [cvv, setCVV] = useState("");
  const [error, setError] = useState("");
  const handleChange = (e) => {
    if (e.target.name === "number") {
      setNumber(e.target.value);
      setError("");
    } else if (e.target.name === "name") {
      setName(e.target.value);
      setError("");
    } else if (e.target.name === "cvv") {
      setCVV(e.target.value);
      setError("");
    }
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (name === "" || number === "" || cvv === "")
      setError("All fields are mandatory");
    else {
      setIsCardDetailsEntered(true);
    }
  };
  return (
    <div className="card-form">
      <div className="input-div">
        <input
          type="number"
          placeholder="Card Number"
          value={number}
          name="number"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Card Holder's Name"
          value={name}
          name="name"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="CVV"
          value={cvv}
          name="cvv"
          onChange={handleChange}
        />
      </div>
      <button className="payment-btn" onClick={handleClick}>
        Submit
      </button>
      {error.length > 0 && (
        <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>
      )}
    </div>
  );
}

function OTP() {
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { userId, courseId } = useSelector((state) => state.auth);
  const handleChange = (e) => {
    setNumber(e.target.value);
    setError("");
  };
  const handleClick = async (e) => {
    e.preventDefault();
    if (number === "") setError("All fields are mandatory");
    else if (number === "123456") {
      const data = await addCourse();
      console.log(data);
      if (data.status === "success") {
        setMessage(
          "Course purchased successfully. Visit 'My Courses' to view your courses"
        );
      } else {
        setError(data.message);
      }
    } else {
      setError("Invalid OTP");
    }
  };

  const addCourse = async () => {
    const response = await axios.post(
      "https://simplibackend.herokuapp.com/api/account/courses/add",
      {
        userId,
        courseId
      }
    );
    const data = await response.data;
    return data;
  };
  return (
    <div className="card-form">
      <div className="input-div">
        <input
          type="number"
          placeholder="OTP"
          value={number}
          name="number"
          onChange={handleChange}
        />
      </div>
      <button className="payment-btn" onClick={handleClick}>
        Complete Purchase
      </button>
      {error.length > 0 && (
        <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>
      )}
      {message.length > 0 && (
        <p style={{ color: "green", fontSize: "0.9rem" }}>{message}</p>
      )}
    </div>
  );
}
