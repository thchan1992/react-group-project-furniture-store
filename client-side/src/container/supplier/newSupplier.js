import React, { useState } from "react";
import { addSupp_Func } from "../../frame/API";
import { pk } from "../../setPrimary";
import AddSupForm from "./component/newSupplier";
import { useHistory } from "react-router-dom";

const AddSup = ({ messageSetter }) => {
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
        if (response.data.auth == false) {
          history.push("/error");
          window.location.reload(false);
        }
        messageSetter(response.data.message, "success", true);
      });
      setSuppName("");
      setSuppEmail("");
    }
  };

  return (
    <div>
      <AddSupForm
        suppName={suppName}
        setSuppName={setSuppName}
        suppEmail={suppEmail}
        setSuppEmail={setSuppEmail}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddSup;
