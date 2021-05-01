import CredForm from "../../signup/component/credForm";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";

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
      <Card border="" bg="light">
        <Card.Header>
          {" "}
          <span className="user-attribute-text-style">Card Number:</span> <br />
          <span className="user-detail-text-style">{showCard}</span>
        </Card.Header>
        {showEd == true && (
          <>
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
              updateCard={updateCard}
            />{" "}
          </>
        )}
      </Card>
    </div>
  );
};
export default EditCard;
