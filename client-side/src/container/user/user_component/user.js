import React from "react";
import EditUserForm from "./editUserForm";
import EditCredCard from "./editCard";
import "./user.css";
const User = ({
  user,
  setUser,
  curUser,
  showEd,
  updateUser,
  verPass,
  setVerPass,
  setShowEd,
  updateCard,
  showCard,
  payMetList,
  userAddress,
  setUserAddress,
}) => {
  return (
    <div>
      {" "}
      <EditUserForm
        userAddress={userAddress}
        setUserAddress={setUserAddress}
        user={user}
        setUser={setUser}
        curUser={curUser}
        showEd={showEd}
        updateUser={updateUser}
        verPass={verPass}
        setVerPass={setVerPass}
        setShowEd={setShowEd}
      />
      {curUser.userType != "A" && (
        <EditCredCard
          setUser={setUser}
          user={user}
          updateCard={updateCard}
          showEd={showEd}
          showCard={showCard}
          payMetList={payMetList}
        />
      )}
    </div>
  );
};

export default User;
