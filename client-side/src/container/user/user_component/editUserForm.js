import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import React from "react";
import EditUserTextbox from "./editTextbox";
import { DragSwitch } from "react-dragswitch";
import "react-dragswitch/dist/index.css";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
const EditUserForm = ({
  user,
  setUser,
  curUser,
  showEd,
  updateUser,
  verPass,
  setVerPass,
  setShowEd,
}) => {
  return (
    <Card>
      <Card.Header>
        <ListGroup.Item className="user-detail-text-style">
          <div className="user-detail-title-style">
            Your Account Detail
            <br />
            <div className="align-edit-switch">
              {" "}
              <span className="user-edit-switch-style">EDIT</span>
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
          </div>
        </ListGroup.Item>{" "}
      </Card.Header>{" "}
      <Card.Body>
        <EditUserTextbox
          name={"First Name"}
          attriName={"firstName"}
          attribute={user.firstName}
          inputType={"text"}
          placeholder={"New First Name"}
          setter={(e) => {
            setUser({ ...user, firstName: e.target.value });
          }}
          data={curUser.firstName}
          showEd={showEd}
          updateUser={updateUser}
        />
        <EditUserTextbox
          name={"Last Name"}
          attriName={"lastName"}
          attribute={user.lastName}
          placeholder={"New Last Name"}
          inputType={"text"}
          setter={(e) => {
            setUser({ ...user, lastName: e.target.value });
          }}
          data={curUser.lastName}
          showEd={showEd}
          updateUser={updateUser}
        />
        <EditUserTextbox
          name={"Email"}
          attriName={"userEmail"}
          placeholder={"New Email"}
          attribute={user.userEmail}
          inputType={"email"}
          setter={(e) => {
            setUser({ ...user, userEmail: e.target.value });
          }}
          data={curUser.userEmail}
          showEd={showEd}
          updateUser={updateUser}
        />
        <EditUserTextbox
          name={"Address"}
          attriName={"userAddress"}
          attribute={user.userAddress}
          placeholder={"New Address"}
          inputType={"text"}
          setter={(e) => {
            setUser({ ...user, userAddress: e.target.value });
          }}
          data={curUser.userAddress}
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
                    placeholder="New password"
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
                  attribute={user.userPass}
                  inputType={"password"}
                  placeholder={"Verify your password"}
                  setter={(e) => {
                    setUser({ ...user, userPass: e.target.value });
                  }}
                  data={""}
                  showEd={showEd}
                  updateUser={updateUser}
                />
              </Col>
            </Form.Group>
          </>
        )}
      </Card.Body>
      <Card.Footer></Card.Footer>
    </Card>
  );
};

export default EditUserForm;
