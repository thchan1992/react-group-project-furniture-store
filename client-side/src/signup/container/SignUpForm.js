import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Textbox from "../../Utility/Textbox";

const SignUpForm = ({
  userType,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  userEmail,
  setUserEmail,
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
    <div>
      {" "}
      <Textbox
        name={"First Name"}
        attriName={"firstName"}
        attribute={firstName}
        inputType={"text"}
        setter={setFirstName}
      />
      <Textbox
        name={"Last Name"}
        attriName={"lastName"}
        attribute={lastName}
        inputType={"text"}
        setter={setLastName}
      />
      <Textbox
        name={"Email"}
        attriName={"userEmail"}
        attribute={userEmail}
        inputType={"email"}
        setter={setUserEmail}
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
      />
    </div>
  );
};

export default SignUpForm;
