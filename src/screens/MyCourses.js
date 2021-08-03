import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import CourseCard from "../components/CourseCard";
export default function MyCourses() {
  const [myCourses, setMyCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const { userId } = useSelector((state) => state.auth);
  const [error, setError] = useState("");
  useEffect(() => {
    getMyCourses(userId);
  }, []);

  useEffect(() => {
    getCourses();
  }, []);
  useEffect(() => {
    if (myCourses.length > 0 && courses.length > 0) {
      const arr = myCourses.map((element) =>
        courses.filter((element2) => element.courseId === element2.id)
      );
      console.log(arr);
      setFilteredCourses(arr);
    }
  }, [myCourses, courses]);
  const getMyCourses = async (userId) => {
    try {
      const response = await axios.get(
        `https://simplibackend.herokuapp.com/api/account/courses/getAllCourse?userId=${userId}`
      );
      const data = await response.data;
      setMyCourses(data);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };
  const getCourses = async () => {
    try {
      const response = await axios.get(
        "https://s3-ap-southeast-1.amazonaws.com/he-public-data/courses26269ff.json"
      );
      const data = await response.data;
      setCourses(data);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };
  return (
    <div className="container">
      <Header />
      <div className="dashboard-container">
        {courses.length > 0 &&
          (myCourses.length > 0 ? (
            <div className="courses-container">
              {filteredCourses.map((element) =>
                element.map((el) => <CourseCard course={el} />)
              )}
            </div>
          ) : (
            <>
              <p
                style={{ color: "white", margin: "10px 0", textAlign: "left" }}
              >
                Oops! You haven't purchased any course yet
              </p>
              <h2
                style={{ color: "white", margin: "10px 0", textAlign: "left" }}
              >
                Browse All courses
              </h2>
              {courses.length > 0 && (
                <div className="courses-container">
                  {courses.map((element) => (
                    <CourseCard course={element} />
                  ))}
                </div>
              )}
            </>
          ))}
      </div>
    </div>
  );
}
