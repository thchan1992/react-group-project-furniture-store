import React from "react";
import Form from "react-bootstrap/Form";
import basketIcon from "../../../assets/basket.png";
import logoutIcon from "../../../assets/logout.png";
import loginIcon from "../../../assets/login.png";
import "./login.css";
import { useHistory } from "react-router-dom";

const LoginForm = ({
  user,
  userID,
  userEmail,
  setEmail,
  userPass,
  setUserPass,
  isLogin,
  handleLogin,
  handleLogOut,
  userType,
  history,
}) => {
  return (
    <div>
      {!user.userID && (
        <div style={{ marginLeft: "auto" }}>
          <Form.Group className="flex-container">
            <Form.Control
              className="placeholder-style-login-form"
              style={{ width: "150px" }}
              type="text"
              placeholder="Email"
              id="userEmail"
              name="userEmail"
              value={userEmail}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Control
              className="placeholder-style-login-form"
              style={{ width: "150px" }}
              type="text"
              placeholder="Password"
              id="userPass"
              name="userPass"
              value={userPass}
              onChange={(e) => setUserPass(e.target.value)}
            />{" "}
            <img
              src={loginIcon}
              style={{ height: "40px" }}
              onClick={() => {
                handleLogin();
                history.push("/Home");
              }}
            />
          </Form.Group>{" "}
        </div>
      )}
      {user.userID && (
        <div>
          {user.userType == "C" && (
            <img
              onClick={() => history.push("/Basket/" + userID)}
              src={basketIcon}
              style={{ height: "40px" }}
            />
          )}
          <img
            src={logoutIcon}
            style={{ height: "40px" }}
            onClick={() => {
              handleLogOut();
              history.push("/Home");
            }}
          />
        </div>
      )}
    </div>
  );
};

export default LoginForm;
