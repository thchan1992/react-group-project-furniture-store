import React, { useState } from "react";
import { addSupp_Func } from "../../api/api";
import { pk } from "../../Utility/setPrimary";
import Component from "./newSupplier_component/newSupplier";
import { useHistory } from "react-router-dom";
import { authChecker } from "../../Utility/authChecker";

const NewSupplier = ({ messageSetter }) => {
  const [suppName, setSuppName] = useState("");
  const [suppEmail, setSuppEmail] = useState("");
  const history = useHistory();

  const handleSubmit = () => {
    if (!suppName && !suppEmail) {
      messageSetter("not enough data is inserted", "danger", true);
    } else {
      const suppID = pk;
      const newSup = { suppEmail, suppName, suppID };
      addSupp_Func(newSup).then((response) => {
        authChecker(history, response, false);
        messageSetter(response.data.message, "success", true);
      });
      setSuppName("");
      setSuppEmail("");
    }
  };

  return (
    <div>
      <Component
        suppName={suppName}
        setSuppName={setSuppName}
        suppEmail={suppEmail}
        setSuppEmail={setSuppEmail}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default NewSupplier;
