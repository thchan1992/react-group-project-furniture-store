import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import LoginForm from "./container/LoginForm";
import {
  loginAPI_Func,
  checkSessionAPI_Func,
  logoutAPI_Func,
} from "../Utility/API";
import Message from "../Utility/Message";

const Login = ({ setUserID, setUserType }) => {
  const [userEmail, setEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  axios.defaults.withCredentials = true;
  const [showMessage, setShowMessage] = useState(false);
  const [messageCont, setMessageCont] = useState({
    text: "",
    theme: "",
  });

  const messageSetter = (text, theme) => {
    setMessageCont({
      text: text,
      theme: theme,
    });
    setShowMessage(true);
  };

  //Log in API function
  const handleLogin = () => {
    if (userEmail && userPass) {
      const user = { userEmail, userPass };
      loginAPI_Func(user).then((response) => {
        if (!response.data.auth) {
          setIsLogin(false);
          messageSetter(response.data.message, "danger");
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
    await logoutAPI_Func().then((response) => {});
    window.localStorage.removeItem("token");
    window.location.reload(false);
    setIsLogin(false);
  };
  //API call to see if the session is still vaild
  useEffect(() => {
    checkSessionAPI_Func().then((response) => {
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
      <Message
        messageCont={messageCont}
        showMessage={showMessage}
        setShowMessage={setShowMessage}
      />
      {isLogin == false && (
        <div className="flex-container">
          <LoginForm
            userEmail={userEmail}
            setEmail={setEmail}
            userPass={userPass}
            setUserPass={setUserPass}
          />{" "}
          <Button
            style={{ height: "40px" }}
            onClick={() => {
              handleLogin();
            }}
          >
            log in
          </Button>
        </div>
      )}
      {isLogin == true && (
        <Button
          onClick={() => {
            handleLogOut();
          }}
        >
          Log Out
        </Button>
      )}
    </div>
  );
};

export default Login;
