import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import React from "react";
import EditUserTextbox from "./editTextbox";
import { DragSwitch } from "react-dragswitch";
import "react-dragswitch/dist/index.css";
import ListGroup from "react-bootstrap/ListGroup";

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
      {" "}
      <ListGroup.Item className="user-detail-text-style">
        <div>
          Your Account Detail - EDIT
          <DragSwitch
            offColor="rgb(0, 0, 0)"
            onColor="rgb(54, 199, 127)"
            checked={showEd}
            onChange={() => {
              if (showEd == true) {
                setShowEd(false);
              } else {
                setShowEd(true);
              }
            }}
          />{" "}
        </div>
      </ListGroup.Item>{" "}
      <EditUserTextbox
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
      <EditUserTextbox
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
      <EditUserTextbox
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
      <EditUserTextbox
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
        <>
          <ListGroup.Item>
            <span className="user-attribute-text-style">
              Type a new password
            </span>
          </ListGroup.Item>
          <ListGroup.Item>
            {showEd == true && (
              <div className="flex-container">
                <Form.Control
                  style={{ height: "40px", width: "200px" }}
                  type="password"
                  name="verPass"
                  id="verPass"
                  value={verPass}
                  onChange={(e) => {
                    setVerPass(e.target.value);
                  }}
                />{" "}
              </div>
            )}
          </ListGroup.Item>

          <Form.Group as={Form.Row}>
            <Col sm={10}>
              <EditUserTextbox
                name={"Verify your new password"}
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
        </>
      )}
    </div>
  );
};

export default EditUserForm;
