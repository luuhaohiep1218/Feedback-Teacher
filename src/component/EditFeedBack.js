import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table, Container, Form, Button } from "react-bootstrap";
import Header from "./Header";
import axios from "axios";
import { FeedbackContext } from "../context/FeedbackContext";

function EditFeedBack() {
  const { editFeedback, feedbacks } = useContext(FeedbackContext);
  const { id } = useParams();


  const [feedback, setFeedback] = useState({
    classId: 0,
    studentId: 0,
    punctuality: "",
    comment: "",
    skills: "",
  });

  const [err, setErr] = useState("");


  useEffect(() => {
    const fetchFeedback = async () => {
      const response = await axios.get(`http://localhost:9999/feedbacks/${id}`);
      setFeedback(response.data);
    };
    fetchFeedback();
  }, [id]);

  const handleChange = (e) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      feedback.punctuality === "" ||
      feedback.comment === "" ||
      feedback.skills === ""
    ) {
      setErr("Vui long nhap comment!");
      return;
    }
    editFeedback(feedback);
    window.location.href = "/homeforstudent";
  };
  return (
    <>
      <Header />
      <Container>
        <h2>Edit Feedback</h2>
        <p className="text-danger">{err}</p>
        <div className="border">
          <div className="row">
            <div className="col-md-6">
              <Form.Label style={{ fontWeight: "bold", fontSize: "13px" }}>
                Regarding the teacher's punctuality
              </Form.Label>
              <br />
              <Form.Label className="fst-italic " style={{ fontSize: "13px" }}>
                (Sự đúng giờ của giảng viên trong giờ học)
              </Form.Label>
              <Form.Check
                type="radio"
                label="Always punctual (Luôn đúng giờ)"
                value="Always punctual"
                name="punctuality"
                checked={feedback.punctuality === "Always punctual"? true : false}
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                label="Mostly punctual (Phần lớn đúng giờ)"
                value="Mostly punctual"
                name="punctuality"
                checked={feedback.punctuality === "Mostly punctual"? true : false}
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                label="Rarely punctual (Ít khi đúng giờ)"
                value="Rarely punctual"
                name="punctuality"
                checked={feedback.punctuality === "Rarely punctual"? true : false}
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                label="Not at all punctual (Không bao giờ đúng giờ)"
                value="Not at all punctual"
                checked={feedback.punctuality === "Not at all punctual"? true : false}
                name="punctuality"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <Form.Label style={{ fontWeight: "bold", fontSize: "13px" }}>
                Teaching skills of teacher
              </Form.Label>
              <br />
              <Form.Label className="fst-italic " style={{ fontSize: "13px" }}>
                (Kỹ năng sư phạm của giảng viên)
              </Form.Label>
              <Form.Check
                type="radio"
                label="Very Good (Tốt)"
                value="Very Good"
                name="skills"
                checked={feedback.skills === "Very Good"? true : false}
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                label="Good (Khá)"
                value="Good"
                name="skills"
                checked={feedback.skills === "Good"? true : false}
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                label="Average (Trung bình)"
                value="Average"
                name="skills"
                checked={feedback.skills === "Average"? true : false}
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                label="Poor (Kém)"
                value="Poor"
                name="skills"
                checked={feedback.skills === "Poor"? true : false}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label className="fw-bold">Comment:</Form.Label>
            <Form.Control
              as="textarea"
              onChange={(e) =>
                setFeedback({ ...feedback, comment: e.target.value })
              }
              rows={3}
              value={feedback.comment}
              required
            />
          </Form.Group>
        </div>
        <Button onClick={handleSubmit} variant="outline-primary">
          Send Feedback
        </Button>
      </Container>
    </>
  );
}

export default EditFeedBack;
