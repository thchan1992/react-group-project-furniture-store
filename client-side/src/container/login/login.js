import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Component from "./component/login";
import {
  loginAPI_Func,
  checkSessionAPI_Func,
  logoutAPI_Func,
} from "../../api/api";

const Login = ({ user, setUser, messageSetter }) => {
  const [userEmail, setEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  axios.defaults.withCredentials = true;
  const history = useHistory();

  //Log in API function
  const handleLogin = () => {
    if (userEmail && userPass) {
      const user = { userEmail, userPass };
      loginAPI_Func(user).then((response) => {
        if (response.data.error) {
          messageSetter(response.data.error, "danger", true);
          return;
        }
        if (!response.data.auth) {
          messageSetter(response.data.message, "danger", true);
        } else {
          localStorage.setItem("token", response.data.token);
          setUser(response.data.result[0]);
          messageSetter("", "", false);
        }
      });
    }
  };

  //API log out function
  const handleLogOut = async () => {
    await logoutAPI_Func();
    //clear the token in the broswer
    localStorage.removeItem("token");
    window.location.reload(false);
  };
  //API call to see if the session is still vaild
  useEffect(() => {
    checkSessionAPI_Func().then((response) => {
      if (response.data.error) {
        messageSetter(response.data.error, "danger", true);
        return;
      }
      if (response.data.loggedIn == true) {
        setUser(response.data.user[0]);
      }
    });
  }, []);

  return (
    <div>
      <div className={"right"}>
        <Component
          user={user}
          userID={user.userID}
          userEmail={userEmail}
          setEmail={setEmail}
          userPass={userPass}
          setUserPass={setUserPass}
          handleLogin={handleLogin}
          handleLogOut={handleLogOut}
          history={history}
        />{" "}
      </div>
    </div>
  );
};

export default Login;
