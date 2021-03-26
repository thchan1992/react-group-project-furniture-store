import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { signUpAPI } from "../Constants";
import { pk } from "../setPrimary";

const SignUp = () => {
  const [userEmail, setUserEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addr1, setAddr1] = useState("");
  const [addr2, setAddr2] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [userPass, setUserPass] = useState("");
  const [verPass, setVerPass] = useState("");
  const [isFin, setIsFin] = useState(false);

  const handleSubmit = () => {
    if (
      userEmail &&
      firstName &&
      lastName &&
      addr1 &&
      addr2 &&
      city &&
      postcode
    ) {
      if (userPass == userPass) {
        const userAddress = addr1 + " " + addr2 + " " + city + " " + postcode;
        const userID = pk;
        const userType = "C";
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
        axios.post(signUpAPI, newUser).then((response) => {
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
      window.alert("Make sure all field to be filled");
    }
  };

  return (
    <div>
      {isFin == true && <h1>Registration Finished, please log in</h1>}
      {isFin == false && (
        <div>
          <br />
          <h1>User Registration</h1>
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
              Address Line 1
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                style={{ height: "40px", width: "200px" }}
                type="text"
                name="addr1"
                id="addr1"
                value={addr1}
                onChange={(e) => setAddr1(e.target.value)}
              />{" "}
            </Col>
          </Form.Group>

          <Form.Group as={Form.Row}>
            <Form.Label column sm={1}>
              Address Line 2 (Optional)
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                style={{ height: "40px", width: "200px" }}
                type="text"
                name="addr2"
                id="addr2"
                value={addr2}
                onChange={(e) => setAddr2(e.target.value)}
              />{" "}
            </Col>
          </Form.Group>
          <Form.Group as={Form.Row}>
            <Form.Label column sm={1}>
              City
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                style={{ height: "40px", width: "200px" }}
                type="text"
                name="city"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />{" "}
            </Col>
          </Form.Group>
          <Form.Group as={Form.Row}>
            <Form.Label column sm={1}>
              Post Code
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                style={{ height: "40px", width: "200px" }}
                type="text"
                name="postcode"
                id="postcode"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
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

export default SignUp;
