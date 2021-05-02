import React from "react";
import Login from "./login/login";
const Header = ({
  userType,
  userID,
  user,
  isLogin,
  setIsLogin,
  setUserID,
  setUserType,
  setUser,
  messageSetter,
}) => {
  return (
    <div className="footer">
      <h1 className="titleText">CHKMV Furniture</h1>
      <div className={"right"}>
        {user.userType == "A" && (
          <h4 className="titleText">Admin Mode | User ID: {user.userID}</h4>
        )}
        {user.userType == "C" && (
          <h4 className="titleText">Welcome back, {user.firstName}!</h4>
        )}
        {/* The website log in component */}
        <Login
          user={user}
          setUser={setUser}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          // userID={userID}
          // setUserID={(userID) => setUserID(userID)}
          // setUserType={(userType) => setUserType(userType)}
          // userType={userType}
          setUser={setUser}
          messageSetter={messageSetter}
        />
      </div>
    </div>
  );
};

export default Header;
