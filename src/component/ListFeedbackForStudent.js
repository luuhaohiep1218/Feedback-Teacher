import React, { useContext } from "react";
import { Table, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FeedbackContext } from "../context/FeedbackContext";
import {
  faCommentMedical,
  faPencil,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

function ListFeedbackForStudent(props) {
  const { getNameTeacher, hasFeedbackByStudent, getFeedback,setFeedbacks } =
    useContext(FeedbackContext);
  const accountSession = localStorage.getItem("account");
  const accountObject = JSON.parse(accountSession);




  return (
    <>
      <div className="container">
        <h2>List of feedbacks for {props.name}</h2>
        <Table striped bordered hover>
          <thead class="table-info">
            <tr>
              <th>Class Name</th>
              <th>LECTURER</th>
              <th>DO FEEDBACK</th>
            </tr>
          </thead>
          <tbody>
            {props.listClass.map((item) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.teacherId ? getNameTeacher(item.teacherId) : ""}</td>
                <td>
                  {hasFeedbackByStudent(
                    props.accSession.studentId,
                    item.classId
                  ) ? (
                    <div>
                      <Link
                        to={`/editfeedback/${
                          getFeedback(item.classId, accountObject.studentId).id
                        }`}
                      >
                        <Button
                          variant="warning"
                          size="sm"
                          style={{ marginRight: "5px" }}
                        >
                          <FontAwesomeIcon
                            icon={faPencil}
                            style={{ marginRight: "5px" }}
                          />
                          Edit feedback
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <Link to={`/addfeedback/${item.classId}`}>
                      <Button variant="success" size="sm">
                        <FontAwesomeIcon
                          icon={faCommentMedical}
                          style={{ marginRight: "5px" }}
                        />
                        Add feedback
                      </Button>
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default ListFeedbackForStudent;
