import React, { useState, useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";

import { FeedbackContext } from "../context/FeedbackContext";

function FormMadal(props) {
  const { getAccount } = useContext(FeedbackContext);
  const [acc, setAcc] = useState({ user: "", pass: "" });
  const [err, setErr] = useState("");
  const handleLogin = () => {
    const account = getAccount(acc.user, acc.pass);
    if (account) {
      localStorage.setItem("account", JSON.stringify(account));
      setErr("");
      setAcc({ user: "", pass: "" });
      if(account.role === "student"){
        window.location.href = "/homeforstudent";
      }else{
        window.location.href = "/homeforteacher";
      }
    }else{
      setErr("Tai khoan hoac mat khau khong chinh xac")
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Đăng Nhập</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {err && <p className="text-danger text-center">{err}</p>}
        <Form.Label className="fw-medium" htmlFor="tk">
          Tài Khoản
        </Form.Label>
        <Form.Control
          id="tk"
          type="text"
          placeholder="Vui lòng nhập tài khoản của bạn"
          onChange={(e) => setAcc({ ...acc, user: e.target.value })}
        />
        <br />
        <Form.Label className="fw-medium" htmlFor="mk">
          Mật Khẩu
        </Form.Label>
        <Form.Control
          id="mk"
          type="password"
          placeholder="Vui lòng nhập mật khẩu của bạn"
          onChange={(e) => setAcc({ ...acc, pass: e.target.value })}
        />
      </Modal.Body>
      <Modal.Footer>
      <Button onClick={props.onHide}>Đóng</Button>
        <Button onClick={handleLogin}>Đăng nhập</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FormMadal;
