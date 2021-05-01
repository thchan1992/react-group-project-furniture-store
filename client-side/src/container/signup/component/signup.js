import React, { useEffect, useState } from "react";
import SignUpForm from "./signUpForm";
import CredForm from "./credForm";
import Button from "react-bootstrap/Button";
const Signup = ({
  isFin,
  userType,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  userEmail,
  setUserEmail,
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
  payMetID,
  setPayMetID,
  cardNumber,
  setCardNumber,
  expire_Date,
  setExpire_Date,
  ccv,
  setCcv,
  payMetList,
  handleSubmit,
}) => {
  return (
    <div>
      {isFin == true && <h1>Registration Finished, please log in</h1>}
      {isFin == false && (
        <div>
          <SignUpForm
            userType={userType}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            userEmail={userEmail}
            setUserEmail={setUserEmail}
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
            <CredForm
              payMetID={payMetID}
              setPayMetID={setPayMetID}
              cardNumber={cardNumber}
              setCardNumber={setCardNumber}
              expire_Date={expire_Date}
              setExpire_Date={setExpire_Date}
              ccv={ccv}
              setCcv={setCcv}
              payMetList={payMetList}
            />
          )}

          <Button onClick={handleSubmit}>Sign Up</Button>
        </div>
      )}
    </div>
  );
};
export default Signup;
