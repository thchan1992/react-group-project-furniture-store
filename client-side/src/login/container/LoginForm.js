import React from "react";
import Form from "react-bootstrap/Form";

const LoginForm = ({ userEmail, setEmail, userPass, setUserPass }) => {
  return (
    <div>
      <Form.Group className="flex-container">
        <Form.Control
          style={{ width: "150px" }}
          type="text"
          placeholder="Email"
          id="userEmail"
          name="userEmail"
          value={userEmail}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Control
          style={{ width: "150px" }}
          type="text"
          placeholder="Password"
          id="userPass"
          name="userPass"
          value={userPass}
          onChange={(e) => setUserPass(e.target.value)}
        />{" "}
      </Form.Group>
    </div>
  );
};

export default LoginForm;
