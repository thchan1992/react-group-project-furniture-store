import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import LoginForm from "./component/login";
import {
  loginAPI_Func,
  checkSessionAPI_Func,
  logoutAPI_Func,
} from "../../api/api";

const Login = ({ user, setUser, messageSetter, isLogin, setIsLogin }) => {
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
          setIsLogin(false);
          messageSetter(response.data.message, "danger", true);
        } else {
          // setUserID(response.data.result[0].userID);
          localStorage.setItem("token", response.data.token);
          setIsLogin(true);
          // setUserType(response.data.result[0].userType);
          setUser(response.data.result[0]);
          messageSetter("", "", false);
        }
      });
    }
  };

  //API log out function
  const handleLogOut = async () => {
    await logoutAPI_Func();
    window.localStorage.removeItem("token");
    window.location.reload(false);
    setIsLogin(false);
  };
  //API call to see if the session is still vaild
  useEffect(() => {
    checkSessionAPI_Func().then((response) => {
      if (response.data.error) {
        messageSetter(response.data.error, "danger", true);
        return;
      }
      if (response.data.loggedIn == true) {
        setIsLogin(true);
        setUser(response.data.user[0]);
      }
    });
  }, []);

  return (
    <div>
      <div className={"right"}>
        <LoginForm
          user={user}
          userID={user.userID}
          userEmail={userEmail}
          setEmail={setEmail}
          userPass={userPass}
          setUserPass={setUserPass}
          isLogin={isLogin}
          handleLogin={handleLogin}
          handleLogOut={handleLogOut}
          userType={user.userType}
          history={history}
        />{" "}
      </div>
    </div>
  );
};

export default Login;
