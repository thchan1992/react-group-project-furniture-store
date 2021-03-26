import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { signUpAdminAPI } from "../Constants";
import { pk } from "../setPrimary";

const AdminSignUp = () => {
  const [userEmail, setUserEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userPass, setUserPass] = useState("");
  const [verPass, setVerPass] = useState("");
  const [isFin, setIsFin] = useState(false);

  const handleSubmit = () => {
    if (userEmail && firstName && lastName) {
      if (userPass == userPass) {
        const userID = pk;
        const userType = "A";
        const userAddress = "N/A";
        const newUser = {
          userID,
          userType,
          firstName,
          lastName,
          userEmail,
          userAddress,
          userType,
          userPass,
        };
        axios
          .post(signUpAdminAPI, newUser, {
            //with the JWT - ignore
            headers: { "x-access-token": localStorage.getItem("token") },
          })
          .then((response) => {
            if (!response.data.error) {
              setIsFin(true);
              window.alert(response.data.message);
            } else {
              window.alert(response.data.error);
            }
          });
      } else {
        window.alert("Password verification failed");
      }
    } else {
      window.alert("Make sure all field to be filled.");
    }
  };

  return (
    <div>
      {isFin == true && (
        <h1>
          Admin account registration Finished, the new admin account is ready to
          use
        </h1>
      )}
      {isFin == false && (
        <div>
          <br />
          <h1>Admin Registration</h1>
          <Form.Group as={Form.Row}>
            <Form.Label column sm={1}>
              First Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                style={{ height: "40px", width: "200px" }}
                type="text"
                name="firstName"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Form.Row}>
            <Form.Label column sm={1}>
              Last Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                style={{ height: "40px", width: "200px" }}
                type="text"
                name="lastName"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Form.Row}>
            <Form.Label column sm={1}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                style={{ height: "40px", width: "200px" }}
                type="email"
                name="userEmail"
                id="userEmail"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />{" "}
            </Col>
          </Form.Group>

          <Form.Group as={Form.Row}>
            <Form.Label column sm={1}>
              Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                style={{ height: "40px", width: "200px" }}
                type="password"
                name="userPass"
                id="userPass"
                value={userPass}
                onChange={(e) => setUserPass(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Form.Row}>
            <Form.Label column sm={1}>
              Verify your password
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                style={{ height: "40px", width: "200px" }}
                type="password"
                name="userPass"
                id="userPass"
                value={verPass}
                onChange={(e) => setVerPass(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Button onClick={handleSubmit}>Sign Up</Button>
        </div>
      )}
    </div>
  );
};

export default AdminSignUp;
