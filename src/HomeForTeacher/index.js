import React, { useContext, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Container,
  Table,
  Col,
  Row,
  InputGroup,
} from "react-bootstrap";
import { FeedbackContext } from "../context/FeedbackContext";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Header from "../component/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function HomeForTeacher() {
  const {
    getClassByTeacher,
    getGradesByClass,
    setSelectedClass,
    selectedClass,
    grades,
    getGradeByTeacher,
    getNameStudent,
    getStudentById,
  } = useContext(FeedbackContext);

  const [search, setSearch] = useState("");

  const accountSession = localStorage.getItem("account");
  const accountObject = JSON.parse(accountSession);

  const filterByClass = getGradeByTeacher(accountObject.teacherId).filter(
    (item) => {
      const matchesClass = selectedClass ? item.classId == selectedClass : true;
      const matchesName = getNameStudent(item.studentId).toLowerCase().includes(search);
      return matchesClass && matchesName;
    }
  );

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col md={6}>
            <h2> List Student Score</h2>
          </Col>
          <Col md={6}>
            <InputGroup className="mb-3" size="lg">
              <Form.Control
                placeholder="Vui long nhap ten sinh vien..."
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <InputGroup.Text id="basic-addon2">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td onClick={() => setSelectedClass(null)}>All</td>
                </tr>
                {getClassByTeacher(accountObject.teacherId).map((item) => (
                  <tr>
                    <td onClick={() => setSelectedClass(item.classId)}>
                      {item.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col md={8}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Email</th>
                  <th>Class Name</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {filterByClass.map((item) => (
                  <tr>
                    <td>{getNameStudent(item.studentId)}</td>
                    <td>{getStudentById(item.studentId).email}</td>
                    <td>{item.className}</td>
                    <td>{item.grade}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomeForTeacher;
