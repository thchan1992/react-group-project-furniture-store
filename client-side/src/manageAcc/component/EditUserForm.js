import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import React, { useEffect, useState } from "react";
import EdUserTextbox from "./EdUserTextbox";

const EditUserForm = ({
  user,
  showEd,
  firstName,
  setFirstName,
  setCol,
  setChange,
  updateUser,
  lastName,
  setLastName,
  userEmail,
  setUserEmail,
  userAddress,
  setUserAddress,
  userPass,
  setUserPass,
  verPass,
  setVerPass,
  setShowEd,
}) => {
  return (
    <div>
      <EdUserTextbox
        name={"First Name"}
        attriName={"firstName"}
        attribute={firstName}
        inputType={"text"}
        setter={(e) => {
          setFirstName(e.target.value);
          setCol(e.target.name);
          setChange(e.target.value);
        }}
        data={user.firstName}
        showEd={showEd}
        updateUser={updateUser}
      />
      <EdUserTextbox
        name={"Last Name"}
        attriName={"lastName"}
        attribute={lastName}
        inputType={"text"}
        setter={(e) => {
          setLastName(e.target.value);
          setCol(e.target.name);
          setChange(e.target.value);
        }}
        data={user.lastName}
        showEd={showEd}
        updateUser={updateUser}
      />
      <EdUserTextbox
        name={"Email"}
        attriName={"userEmail"}
        attribute={userEmail}
        inputType={"email"}
        setter={(e) => {
          setUserEmail(e.target.value);
          setCol(e.target.name);
          setChange(e.target.value);
        }}
        data={user.userEmail}
        showEd={showEd}
        updateUser={updateUser}
      />
      <EdUserTextbox
        name={"Address"}
        attriName={"userAddress"}
        attribute={userAddress}
        inputType={"text"}
        setter={(e) => {
          setUserAddress(e.target.value);
          setCol(e.target.name);
          setChange(e.target.value);
        }}
        data={user.userAddress}
        showEd={showEd}
        updateUser={updateUser}
      />{" "}
      {showEd == true && (
        <Form.Group as={Form.Row}>
          <Form.Label column sm={1}>
            Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              style={{ height: "40px", width: "200px" }}
              type="verify password"
              name="verPass"
              id="verPass"
              value={verPass}
              onChange={(e) => {
                setVerPass(e.target.value);
              }}
            />{" "}
          </Col>
          <Col sm={10}>
            <EdUserTextbox
              name={"password"}
              attriName={"userPass"}
              attribute={userPass}
              inputType={"password"}
              setter={(e) => {
                setUserPass(e.target.value);
                setCol(e.target.name);
                setChange(e.target.value);
              }}
              data={""}
              showEd={showEd}
              updateUser={updateUser}
            />
          </Col>
        </Form.Group>
      )}
      <Button
        onClick={() => {
          if (showEd == true) {
            setShowEd(false);
          } else {
            setShowEd(true);
          }
        }}
      >
        Edit
      </Button>
    </div>
  );
};

export default EditUserForm;
