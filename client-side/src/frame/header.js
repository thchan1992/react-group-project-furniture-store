import React from "react";
import Login from "../container/login/login";
const Header = ({ user, setUser, messageSetter }) => {
  return (
    <div className="footer">
      <h1 className="titleText">CHKMV Furniture</h1>{" "}
      <div className="flex-container">
        {user.userType == "A" && (
          <h4 className="titleText">Admin Mode | User ID: {user.userID}</h4>
        )}
        {user.userType == "C" && (
          <h4 className="titleText">Welcome back, {user.firstName}!</h4>
        )}
        &nbsp;&nbsp;
        {/* The website log in component */}
        <Login
          user={user}
          setUser={setUser}
          setUser={setUser}
          messageSetter={messageSetter}
        />
      </div>
    </div>
  );
};

export default Header;
