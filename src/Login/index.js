import React,{useState,useContext} from "react";
import { Button } from "react-bootstrap";

import ListFeedbackForStudent from "../component/ListFeedbackForStudent";
import Header from "../component/Header";
import FormMadal from "../component/FormMadal";
import {FeedbackContext} from "../context/FeedbackContext";

function Login() {
  const [modalShow, setModalShow] = React.useState(false);


  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div
              className="border p-5 m-auto  position-relative"
              style={{ width: "70%" }}
            >
              <span
                className="border rounded-end  p-2 bg-warning position-absolute"
                style={{ fontSize: "10px", top: 0, left: 0 }}
              >
                <b className="text-white text-decoration-underline">
                  Sinh viên, Giảng viên
                </b>
              </span>
              <div className="d-flex justify-content-center">
                <Button variant="primary" onClick={() => setModalShow(true)}>Đăng nhập</Button>
              </div>
            </div>
          </div>
        </div>
        <FormMadal show={modalShow}
        onHide={() => setModalShow(false)} />
      </div>
    </>
  );
}

export default Login;
