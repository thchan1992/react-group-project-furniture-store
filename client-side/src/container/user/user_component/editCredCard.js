import CredForm from "../../signup/signup_component/credForm";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";

const EditCard = ({
  setUser,
  user,
  updateCard,
  showEd,
  showCard,
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
              user={user}
              setUser={setUser}
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
