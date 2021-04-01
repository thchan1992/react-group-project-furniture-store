import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { host } from "../Constants";
import { pk } from "../setPrimary";

const ShowUser = ({ userID }) => {
  const [userEmail, setUserEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userPass, setUserPass] = useState("");
  const [verPass, setVerPass] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [column, setCol] = useState("");
  const [change, setChange] = useState("");
  const [user, setUser] = useState({});
  const [showEd, setShowEd] = useState(false);

  const updateUser = () => {
    if (column && change) {
      if (verPass != userPass) {
        window.alert("password verification failed");
        return;
      }
      const userID = user.userID;
      const newData = { userID, change, column };
      console.log(newData);
      axios
        .put(host + "/account/personalDetails/edit", newData)
        .then((response) => {
          window.alert(response.data.message);
          setIsLoading(true);
          setUserEmail("");
          setFirstName("");
          setLastName("");
          setUserAddress("");
          setUserPass("");
          setVerPass("");
          setCol("");
          setChange("");
        });
    } else {
      window.alert("not enough data is inserted");
    }
  };

  useEffect(() => {
    //remove it later
    axios.get(host + "/account/personalDetails/" + userID).then((response) => {
      setUser(response.data.result);
      setIsLoading(false);
    });
  }, [isLoading]);

  return (
    <div>
      <Form.Group as={Form.Row}>
        <Form.Label column sm={1}>
          First Name
        </Form.Label>
        <Col sm={10}>
          {user.firstName}
          {showEd == true && (
            <>
              <Form.Control
                style={{ height: "40px", width: "200px" }}
                type="text"
                name="firstName"
                id="firstName"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setCol(e.target.name);
                  setChange(e.target.value);
                }}
              />
              <Button
                size="sm"
                variant="info"
                onClick={() => {
                  updateUser();
                }}
              >
                Update
              </Button>
            </>
          )}
        </Col>
      </Form.Group>
      <Form.Group as={Form.Row}>
        <Form.Label column sm={1}>
          Last Name
        </Form.Label>
        <Col sm={10}>
          {user.lastName}
          {showEd == true && (
            <>
              <Form.Control
                style={{ height: "40px", width: "200px" }}
                type="text"
                name="lastName"
                id="lastName"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setCol(e.target.name);
                  setChange(e.target.value);
                }}
              />
              <Button
                size="sm"
                variant="info"
                onClick={() => {
                  updateUser();
                }}
              >
                Update
              </Button>
            </>
          )}
        </Col>
      </Form.Group>
      <Form.Group as={Form.Row}>
        <Form.Label column sm={1}>
          Email
        </Form.Label>
        <Col sm={10}>
          {user.userEmail}
          {showEd == true && (
            <>
              <Form.Control
                style={{ height: "40px", width: "200px" }}
                type="text"
                name="userEmail"
                id="userEmail"
                value={userEmail}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                  setCol(e.target.name);
                  setChange(e.target.value);
                }}
              />
              <Button
                size="sm"
                variant="info"
                onClick={() => {
                  updateUser();
                }}
              >
                Update
              </Button>
            </>
          )}
        </Col>
      </Form.Group>
      <Form.Group as={Form.Row}>
        <Form.Label column sm={1}>
          Address
        </Form.Label>
        <Col sm={10}>
          {user.userAddress}
          {showEd == true && (
            <>
              <Form.Control
                style={{ height: "40px", width: "200px" }}
                type="email"
                name="userAddress"
                id="userAddress"
                value={userAddress}
                onChange={(e) => {
                  setCol(e.target.name);
                  setChange(e.target.value);
                  setUserAddress(e.target.value);
                }}
              />{" "}
              <Button
                size="sm"
                variant="info"
                onClick={() => {
                  updateUser();
                }}
              >
                Update
              </Button>
            </>
          )}
        </Col>
      </Form.Group>
      {showEd == true && (
        <>
          <Form.Group as={Form.Row}>
            <Form.Label column sm={1}>
              Change Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                style={{ height: "40px", width: "200px" }}
                type="password"
                name="userPass"
                id="userPass"
                value={userPass}
                onChange={(e) => {
                  setCol(e.target.name);
                  setChange(e.target.value);
                  setUserPass(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Form.Row}>
            <Form.Label column sm={1}>
              verify Password
            </Form.Label>
            <Col sm={10}>
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
              <Button
                size="sm"
                variant="info"
                onClick={() => {
                  updateUser();
                }}
              >
                Update
              </Button>
            </Col>
          </Form.Group>
        </>
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

export default ShowUser;
