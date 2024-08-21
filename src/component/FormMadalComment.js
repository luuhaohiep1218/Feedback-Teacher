import React, { useState, useEffect, useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";

import { FeedbackContext } from "../context/FeedbackContext";

import axios from "axios";
function FormMadalComment(props) {
  const { editCommentTeacher, getTeacherCommentById, addCommentTeacher } =
    useContext(FeedbackContext);
  const [err, setErr] = useState("");

  const handleChange = (e) => {
    props.commentvalue.comment = e.target.value;
  };
  const handleEdit = (e) => {
    e.preventDefault();
    if (props.commentvalue.comment === "") {
      setErr("Vui long nhap comment!");
      return;
    }
    editCommentTeacher(props.commentvalue);
    props.onHide();
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (props.commentvalue.comment === "") {
      setErr("Vui long nhap comment!");
      return;
    }
    addCommentTeacher(props.commentvalue);
    props.onHide();
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <p className="text-danger text-center">{err}</p>

            <Form.Label>Comment:</Form.Label>
            <Form.Control
              as="textarea"
              defaultValue={props.commentvalue.comment}
              onChange={handleChange}
              rows={3}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          {props.title === "Edit Comment of Teacher" ? (
            <Button onClick={handleEdit} variant="outline-success">
              Edit
            </Button>
          ) : (
            <Button onClick={handleAddComment} variant="outline-success">
              Add
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FormMadalComment;
