import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { loginAPI, logoutAPI } from "../Constants";

const Login = ({ setUserID, setUserType }) => {
  const [userEmail, setEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  axios.defaults.withCredentials = true;
  //Log in API function
  const handleLogin = () => {
    if (userEmail && userPass) {
      const user = { userEmail, userPass };
      console.log(user);
      axios.post(loginAPI, user).then((response) => {
        if (!response.data.auth) {
          setIsLogin(false);
          window.alert(response.data.message);
        } else {
          setUserID(response.data.result[0].userID);
          localStorage.setItem("token", response.data.token);
          setIsLogin(true);
          setUserType(response.data.result[0].userType);
        }
      });
    }
  };

  //API log out function
  const handleLogOut = async () => {
    await axios
      .get(logoutAPI, {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((response) => {});
    window.localStorage.removeItem("token");
    window.location.reload(false);
    setIsLogin(false);
  };
  //API call to see if the session is still vaild
  useEffect(() => {
    axios.get(loginAPI).then((response) => {
      console.log(response);
      if (response.data.loggedIn == true) {
        setUserID(response.data.user[0].userID);
        setUserType(response.data.user[0].userType);
        setIsLogin(true);
      }
    });
  }, []);

  return (
    <div>
      {isLogin == true && (
        <Button
          onClick={() => {
            handleLogOut();
          }}
        >
          Log Out
        </Button>
      )}
      {isLogin == false && (
        <Form.Group className="flex-container">
          <Form.Control
            style={{ width: "150px" }}
            type="text"
            placeholder="Email"
            id="userEmail"
            name="userEmail"
            value={userEmail}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            style={{ width: "150px" }}
            type="text"
            placeholder="Password"
            id="userPass"
            name="userPass"
            value={userPass}
            onChange={(e) => setUserPass(e.target.value)}
          />{" "}
          <Button
            onClick={() => {
              handleLogin();
            }}
          >
            log in
          </Button>
        </Form.Group>
      )}
    </div>
  );
};

export default Login;
