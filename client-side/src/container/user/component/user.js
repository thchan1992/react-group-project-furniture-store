import React from "react";
import EditUserForm from "./editUserForm";
import EditCredCard from "./editCredCard";

const User = ({
  user,
  showEd,
  firstName,
  setFirstName,
  setCol,
  setChange,
  updateUser,
  lastName,
  setLastName,
  userEmail,
  setUserEmail,
  userAddress,
  setUserAddress,
  userPass,
  setUserPass,
  verPass,
  setVerPass,
  setShowEd,
  updateCard,
  showCard,
  payMetID,
  setPayMetID,
  cardNumber,
  setCardNumber,
  expire_Date,
  setExpire_Date,
  ccv,
  setCcv,
  payMetList,
}) => {
  return (
    <div>
      {" "}
      <EditUserForm
        user={user}
        showEd={showEd}
        firstName={firstName}
        setFirstName={setFirstName}
        setCol={setCol}
        setChange={setChange}
        updateUser={updateUser}
        lastName={lastName}
        setLastName={setLastName}
        userEmail={userEmail}
        setUserEmail={setUserEmail}
        userAddress={userAddress}
        setUserAddress={setUserAddress}
        userPass={userPass}
        setUserPass={setUserPass}
        verPass={verPass}
        setVerPass={setVerPass}
        setShowEd={setShowEd}
      />
      <EditCredCard
        updateCard={updateCard}
        showEd={showEd}
        showCard={showCard}
        payMetID={payMetID}
        setPayMetID={setPayMetID}
        cardNumber={cardNumber}
        setCardNumber={setCardNumber}
        expire_Date={expire_Date}
        setExpire_Date={setExpire_Date}
        ccv={ccv}
        setCcv={setCcv}
        payMetList={payMetList}
      />{" "}
    </div>
  );
};

export default User;
