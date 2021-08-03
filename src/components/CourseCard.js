import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { courseID } from "../slices/authSlice";
export default function CourseCard({ course }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const handlePurchase = (e) => {
    e.preventDefault();
    dispatch(courseID({ courseId: course.id }));
    history.push(`/buy/${course.id}`);
  };
  return (
    <div id={course.id} className="course-card-container">
      <img
        src={course.thumbnailURL}
        alt={course.title}
        className="course-thumbnail"
      />
      <h2 className="course-title">{course.title}</h2>
      <div className="price-div">
        <p className="price">₹ {course.price}</p>
        <button onClick={handlePurchase} className="buy-btn">
          Buy
        </button>
      </div>
    </div>
  );
}
