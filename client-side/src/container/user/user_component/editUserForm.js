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
  userAddress,
  setUserAddress,
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
        <ListGroup.Item>
          <span className="user-attribute-text-style">Address</span>
          <br />
          <span className="user-detail-text-style">{curUser.userAddress}</span>
        </ListGroup.Item>{" "}
        {showEd == true && (
          <ListGroup.Item>
            <div className="flex-container">
              <Form.Control
                style={{ height: "40px", width: "200px" }}
                className="user-detail-update-text-style"
                type={"text"}
                name={"userAddress.addr1"}
                id={"userAddress.addr1"}
                value={userAddress.addr1}
                placeholder={"Address Line 1"}
                onChange={(e) => {
                  setUserAddress({ ...userAddress, addr1: e.target.value });
                }}
              />{" "}
              <Button
                className="user-detail-update-button-style"
                size="sm"
                variant="info"
                onClick={() => {
                  updateUser("userAddress", userAddress);
                }}
              >
                Update
              </Button>
            </div>{" "}
            <p />
            <Form.Control
              style={{ height: "40px", width: "200px" }}
              className="user-detail-update-text-style"
              type={"text"}
              name={"userAddress.addr2"}
              id={"userAddress.addr2"}
              value={userAddress.addr2}
              placeholder={"Address Line 2 (Optional)"}
              onChange={(e) => {
                setUserAddress({ ...userAddress, addr2: e.target.value });
              }}
            />{" "}
            <p />
            <Form.Control
              style={{ height: "40px", width: "200px" }}
              className="user-detail-update-text-style"
              type={"text"}
              name={"userAddress.city"}
              id={"userAddress.city"}
              value={userAddress.city}
              placeholder={"city"}
              onChange={(e) => {
                setUserAddress({ ...userAddress, city: e.target.value });
              }}
            />{" "}
            <p />
            <Form.Control
              style={{ height: "40px", width: "200px" }}
              className="user-detail-update-text-style"
              type={"text"}
              name={"userAddress.postcode"}
              id={"userAddress.postcode"}
              value={userAddress.postcode}
              placeholder={"Post Code"}
              onChange={(e) => {
                setUserAddress({ ...userAddress, postcode: e.target.value });
              }}
            />{" "}
          </ListGroup.Item>
        )}
        {showEd == true && (
          <>
            <ListGroup.Item>
              <span className="user-attribute-text-style">
                Type a new password
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              {showEd == true && (
                <div>
                  <div className="flex-container">
                    <Form.Control
                      style={{ height: "40px", width: "200px" }}
                      className="user-detail-update-text-style"
                      type="password"
                      name="verPass"
                      id="verPass"
                      placeholder="Verify your password"
                      value={user.userPass}
                      onChange={(e) => {
                        setUser({ ...user, userPass: e.target.value });
                      }}
                    />{" "}
                    <Button
                      size="sm"
                      variant="info"
                      onClick={() => {
                        updateUser("userPass", user.userPass);
                      }}
                    >
                      <span className="user-detail-update-button-style">
                        Update
                      </span>
                    </Button>
                  </div>{" "}
                  <p />
                  <div>
                    <Form.Control
                      style={{ height: "40px", width: "200px" }}
                      className="user-detail-update-text-style"
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
                </div>
              )}
            </ListGroup.Item>
          </>
        )}
      </Card.Body>
      <Card.Footer></Card.Footer>
    </Card>
  );
};

export default EditUserForm;
