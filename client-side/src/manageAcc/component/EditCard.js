import CredForm from "../../signup/container/CredForm";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";

const EditCard = ({
  updateCard,
  showEd,
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
      Card Number: {showCard}
      {showEd == true && (
        <div>
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
          />{" "}
          <Button onClick={updateCard}>update</Button>
        </div>
      )}
    </div>
  );
};
export default EditCard;
