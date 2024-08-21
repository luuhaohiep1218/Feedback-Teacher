import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  Container,
  Form,
  Button,
  Row,
  Col,
  Toast,
} from "react-bootstrap";
import Header from "./Header";

import { FeedbackContext } from "../context/FeedbackContext";

function AddFeedback() {
  const { addFeedback } = useContext(FeedbackContext);
  const accountSession = localStorage.getItem("account");
  const accountObject = JSON.parse(accountSession);
  const { classid } = useParams();
  const [feedback, setFeedback] = useState({
    classId: parseInt(classid),
    studentId: accountObject.studentId,
    punctuality: "",
    comment: "",
    skills: "",
  });
  const [err, setErr] = useState("");

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
    addFeedback(feedback);
    window.location.href = "/homeforstudent";
  };

  return (
    <>
      <Header />
      <Container>
        <Row>
          <h2>Add Feedback</h2>
        </Row>
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
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                label="Mostly punctual (Phần lớn đúng giờ)"
                value="Mostly punctual"
                name="punctuality"
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                label="Rarely punctual (Ít khi đúng giờ)"
                value="Rarely punctual"
                name="punctuality"
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                label="Not at all punctual (Không bao giờ đúng giờ)"
                value="Not at all punctual"
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
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                label="Good (Khá)"
                value="Good"
                name="skills"
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                label="Average (Trung bình)"
                value="Average"
                name="skills"
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                label="Poor (Kém)"
                value="Poor"
                name="skills"
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

export default AddFeedback;
