import React, { useEffect, useState } from "react";
import SignUpForm from "./signUpForm";
import CredForm from "./credForm";
import Button from "react-bootstrap/Button";
const Signup = ({
  user,
  setUser,
  userType,
  addr1,
  setAddr1,
  addr2,
  setAddr2,
  city,
  setCity,
  postcode,
  setPostcode,
  userPass,
  setUserPass,
  verPass,
  setVerPass,
  payMetList,
  handleSubmit,
}) => {
  return (
    <div>
      <SignUpForm
        user={user}
        setUser={setUser}
        userType={userType}
        addr1={addr1}
        setAddr1={setAddr1}
        addr2={addr2}
        setAddr2={setAddr2}
        city={city}
        setCity={setCity}
        postcode={postcode}
        setPostcode={setPostcode}
        userPass={userPass}
        setUserPass={setUserPass}
        verPass={verPass}
        setVerPass={setVerPass}
      />
      {userType != "A" && (
        <CredForm user={user} setUser={setUser} payMetList={payMetList} />
      )}
      <Button onClick={handleSubmit}>Sign Up</Button>
    </div>
  );
};
export default Signup;
