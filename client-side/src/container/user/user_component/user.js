import React from "react";
import EditUserForm from "./editUserForm";
import EditCredCard from "./editCredCard";

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
}) => {
  return (
    <div>
      {" "}
      <EditUserForm
        user={user}
        setUser={setUser}
        curUser={curUser}
        showEd={showEd}
        updateUser={updateUser}
        verPass={verPass}
        setVerPass={setVerPass}
        setShowEd={setShowEd}
      />
      {user.userType == "C" && (
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
