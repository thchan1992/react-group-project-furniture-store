import React, { useEffect, useState } from "react";
import Textbox from "../../../frame/Textbox";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

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
}) => {
  return (
    <Col>
      <Card>
        <Card.Header>
          <span className="sales-report-title">User Registration</span>
        </Card.Header>
        <Card.Body>
          <Textbox
            name={"First Name"}
            attriName={"firstName"}
            attribute={user.firstName}
            inputType={"text"}
            setter={(e) => {
              setUser({ ...user, firstName: e });
            }}
          />
          <Textbox
            name={"Last Name"}
            attriName={"lastName"}
            attribute={user.lastName}
            inputType={"text"}
            setter={(e) => {
              setUser({ ...user, lastName: e });
            }}
          />
          <Textbox
            name={"Email"}
            attriName={"userEmail"}
            attribute={user.userEmail}
            inputType={"email"}
            setter={(e) => {
              setUser({ ...user, userEmail: e });
            }}
          />
          {userType == "" && (
            <div>
              <Textbox
                name={"Address Line 1"}
                attriName={"addr1"}
                attribute={addr1}
                inputType={"text"}
                setter={setAddr1}
              />
              <Textbox
                name={"Address Line 2(Optional)"}
                attriName={"addr2"}
                attribute={addr2}
                inputType={"text"}
                setter={setAddr2}
              />
              <Textbox
                name={"City"}
                attriName={"city"}
                attribute={city}
                inputType={"text"}
                setter={setCity}
              />{" "}
              <Textbox
                name={"Post Code"}
                attriName={"postcode"}
                attribute={postcode}
                inputType={"text"}
                setter={setPostcode}
              />
            </div>
          )}
          <Textbox
            name={"password"}
            attriName={"userPass"}
            attribute={userPass}
            inputType={"password"}
            setter={setUserPass}
          />
          <Textbox
            name={"Verify your password"}
            attriName={"verPass"}
            attribute={verPass}
            inputType={"password"}
            setter={setVerPass}
          />{" "}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SignUpForm;
