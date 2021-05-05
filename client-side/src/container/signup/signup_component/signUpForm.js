import React from "react";
import Textbox from "../../../Utility/Textbox";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
const SignUpForm = ({
  user,
  setUser,
  userType,
  addr1,
  setAddr1,
  addr2,
  setAddr2,
  city,
  setCity,
  postcode,
  setPostcode,
  userPass,
  setUserPass,
  verPass,
  setVerPass,
  handleSubmit,
}) => {
  return (
    <Card>
      <Card.Header>
        <span className="registration-title-style">User Registration</span>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <Textbox
              name={"First Name"}
              attriName={"firstName"}
              attribute={user.firstName}
              inputType={"text"}
              placeholder={"First Name"}
              setter={(e) => {
                setUser({ ...user, firstName: e });
              }}
            />
            <Textbox
              name={"Last Name"}
              attriName={"lastName"}
              attribute={user.lastName}
              inputType={"text"}
              placeholder={"Last Name"}
              setter={(e) => {
                setUser({ ...user, lastName: e });
              }}
            />
            <Textbox
              name={"Email"}
              attriName={"userEmail"}
              attribute={user.userEmail}
              inputType={"email"}
              placeholder={"Email Must contain @"}
              setter={(e) => {
                setUser({ ...user, userEmail: e });
              }}
            />{" "}
          </Col>
          <Col>
            {userType == null && (
              <div>
                <Textbox
                  name={"Address Line 1"}
                  attriName={"addr1"}
                  attribute={addr1}
                  inputType={"text"}
                  placeholder={"Address Line 1"}
                  setter={setAddr1}
                />
                <Textbox
                  name={"Address Line 2 (Optional)"}
                  attriName={"addr2"}
                  attribute={addr2}
                  inputType={"text"}
                  placeholder={"Address Line 2"}
                  setter={setAddr2}
                />
                <Textbox
                  name={"City"}
                  attriName={"city"}
                  attribute={city}
                  inputType={"text"}
                  placeholder={"City"}
                  setter={setCity}
                />{" "}
                <Textbox
                  name={"Post Code"}
                  attriName={"postcode"}
                  attribute={postcode}
                  inputType={"text"}
                  placeholder={"Post Code"}
                  setter={setPostcode}
                />
              </div>
            )}
          </Col>

          <Col>
            <Textbox
              name={"Password"}
              attriName={"userPass"}
              attribute={userPass}
              inputType={"password"}
              placeholder={"At least 6 digit"}
              setter={setUserPass}
            />
            <Textbox
              name={"Verify your password"}
              attriName={"verPass"}
              attribute={verPass}
              inputType={"password"}
              placeholder={"Verify password"}
              setter={setVerPass}
            />{" "}
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        {" "}
        <Button
          className="signup-button-style"
          variant="info"
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default SignUpForm;
