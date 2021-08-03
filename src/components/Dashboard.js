import React, { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "../components/CourseCard";
import Header from "../components/Header";

export default function Dashbaord() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const response = await axios.get(
        "https://s3-ap-southeast-1.amazonaws.com/he-public-data/courses26269ff.json"
      );
      const data = await response.data;
      setCourses(data);
    } catch (err) {
      setError("Something went wrong");
    }
  };
  return (
    <>
      <div className="container">
        <Header />
        <div className="dashboard-container">
          <h1> Welcome to dashbaord</h1>
          {courses.length > 0 && (
            <div className="courses-container">
              {courses.map((element) => (
                <CourseCard course={element} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
