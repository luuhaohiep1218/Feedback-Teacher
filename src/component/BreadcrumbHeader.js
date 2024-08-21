import React, { useState } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";

function BreadcrumbHeader(props) {
  return (
    <>
      {window.location.pathname !== "/homeforstudent" &&
        props.role === "student" && (
          <Breadcrumb>
            <Breadcrumb.Item href="/homeforstudent">
              Student Feedback
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Do Feedback</Breadcrumb.Item>
          </Breadcrumb>
        )}
      {props.role === "teacher" && (
        <Breadcrumb>
          <Breadcrumb.Item href="/homeforteacher">
            Student Feedback
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/listfeedbackofteacher">
            List Feedback
          </Breadcrumb.Item>
        </Breadcrumb>
      )}
    </>
  );
}

export default BreadcrumbHeader;
