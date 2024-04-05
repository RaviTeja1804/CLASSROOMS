import React from "react";
import "./CSS/Feedback.css";
import { useState } from "react";

function Feedback() {
  const [formDataForFeedback, setFormDataForFeedback] = useState({
    rating: "",
    message: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFormDataForFeedback({
      ...formDataForFeedback,
      [e.target.name]: e.target.value,
    });
  };

  const [selectedRating, setSelectedRating] = useState(null);
  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
  };

  const closetohome = () => {
    window.location.replace('/')
  }

  const submitFeedback = () => {
    if (selectedRating === null) {
      window.alert("Please select a rating before submitting.");
      return;
    }
    formDataForFeedback.rating = selectedRating;
    let empty = 0
    for(const key in formDataForFeedback) {
        if (!formDataForFeedback[key]) {
            empty++;
        }
    }
    if(empty > 0)
    {
        alert("Input fields must not be empty")
        return
    }

    fetch("http://localhost:4000/addFeedback", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-type": "application/json",
      },
      body: JSON.stringify(formDataForFeedback),
    })
      .then((response) => response.json())
      .then((data) => {
        setFormDataForFeedback({
          rating: "",
          message: "",
          email: "",
        });
        setSelectedRating(null);
        console.log(data);
        window.alert(data.message);
        window.location.reload();
      });
  };

  return (
    <div className="feedbackpage">
      <h1 className="heading">FEEDBACK FORM</h1>
      <div className="feedback-container">
        <form className="form">
          <div className="feedback-head">We'd love to hear your feedback!</div>
          <div className="rating-list">
            {[0, 1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                className={selectedRating === rating ? "selected" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  handleRatingClick(rating);
                }}
              >
                {rating}
              </button>
            ))}
          </div>
          <div className="rating-list">
            {[6, 7, 8, 9, 10].map((rating) => (
              <button
                key={rating}
                className={selectedRating === rating ? "selected" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  handleRatingClick(rating);
                }}
              >
                {rating}
              </button>
            ))}
          </div>
          <div className="extreme">
            <div>0 - Extremely Bad</div>
            <div>10 - Extremely Good</div>
          </div>
          <div className="improve">What feature can we add to improve?</div>
          <textarea
            className="feedback-input"
            placeholder="We'd love to hear your suggestions"
            onChange={changeHandler}
            value={formDataForFeedback.message}
            name="message"
          />
          <div className="improve">Email Id</div>
          <input
            type="email"
            name="email"
            className="email-input"
            onChange={changeHandler}
            value={formDataForFeedback.email}
            placeholder="abc@xyz.com"
            required
          />
          <div className="horizon">
            <button type="button" className="close-button" onClick={() => closetohome()}>CLOSE</button>
            <button type="button" className="submit-button" onClick={() => submitFeedback()}>SEND FEEDBACK</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Feedback;
