import React, { useContext,useState } from "react";
import { Button, Modal, Form, Container, ListGroup } from "react-bootstrap";

import Header from "../component/Header";
import ListFeedbackForStudent from "../component/ListFeedbackForStudent";
import AddFeedback from "../component/AddFeedback";

import { FeedbackContext } from "../context/FeedbackContext";


function HomeForStudent() {
    const { getNameStudent,getStudentClasses } = useContext(FeedbackContext);
    const accountSession = localStorage.getItem("account");
    const accountObject = JSON.parse(accountSession);

    console.log(getStudentClasses(accountObject.studentId));

  return (
    <>
      <Header />
      <ListFeedbackForStudent name={getNameStudent(accountObject.studentId)} listClass={getStudentClasses(accountObject.studentId)} accSession={accountObject} />
    </>
  );
}

export default HomeForStudent;
