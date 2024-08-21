import React, { useContext, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Container,
  Table,
  Col,
  Row,
} from "react-bootstrap";
import Header from "../component/Header";
import FormMadalComment from "../component/FormMadalComment";

import { FeedbackContext } from "../context/FeedbackContext";

function ListFeedback() {
  const { getFeedbackByTeacher, hasCommentTeacher, getTeacherComments,getFeedback } =
    useContext(FeedbackContext);

  const [modalShow, setModalShow] = useState(false);
  const [title, setTitle] = useState("");
  const [commentTeacher, setCommentTeacher] = useState({
    id: 0,
    comment: "",
    feedbackId: 0,
    teacherId: 0,
  })

  const accountSession = localStorage.getItem("account");
  const accountObject = JSON.parse(accountSession);

  return (
    <>
      <Header />
      <Container>
        <h2>List Feedback Of Student</h2>
        <Col md={12}>
          <Table striped bordered hover>
            <thead class="table-info">
              <tr>
                <th>#</th>
                <th>Punctuality</th>
                <th>Skills</th>
                <th>Comment</th>
                <th>Class Name</th>
                <th>Comment of Teacher</th>
                <th>Acions</th>
              </tr>
            </thead>
            <tbody>
              {getFeedbackByTeacher(accountObject.teacherId).map(
                (item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.punctuality}</td>
                    <td>{item.skills}</td>
                    <td>{item.comment}</td>
                    <td>{item.className}</td>
                    <td>
                      {
                        getTeacherComments(accountObject.teacherId, item.id)
                          .comment
                      }
                    </td>

                    <td>
                      {hasCommentTeacher(accountObject.teacherId, item.id) ? (
                        <Button
                          variant="outline-primary"
                          onClick={() => {
                            setModalShow(true);
                            setTitle("Edit Comment of Teacher");
                            setCommentTeacher({
                              id: item.id,
                              comment: getTeacherComments(
                                accountObject.teacherId,
                                item.id
                              ).comment,
                              feedbackId: getFeedback(item.classId, item.studentId).id,
                              teacherId: accountObject.teacherId,
                            })
                          }}
                        >
                          Edit Comment
                        </Button>
                      ) : (
                        <Button
                          variant="outline-success"
                          onClick={() => {
                            setModalShow(true);
                            setTitle("Add Comment of Teacher");
                            setCommentTeacher({
                              id: item.id,
                              comment: "",
                              feedbackId: getFeedback(item.classId, item.studentId).id,
                              teacherId: accountObject.teacherId,
                            })
                          }}
                        >
                          Add Comment
                        </Button>
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </Col>
        <FormMadalComment
          show={modalShow}
          onHide={() => setModalShow(false)}
          title={title}
          commentvalue={commentTeacher}

        />
      </Container>
    </>
  );
}

export default ListFeedback;
