import React, { useEffect, useState } from "react";
import axios from "axios";
import { host } from "../Constants";
import { pk } from "../setPrimary";
import AddSupForm from "./component/AddSupForm";

const AddSup = () => {
  const [suppName, setSuppName] = useState("");
  const [suppEmail, setSuppEmail] = useState("");
  const handleSubmit = () => {
    if (!suppName && !suppEmail) {
      window.alert("not enough data is inserted");
    } else {
      const suppID = pk;
      const newSup = { suppEmail, suppName, suppID };
      axios.post(host + "/suppliers/addSupplier", newSup).then((response) => {
        window.alert(response.data.message);
      });
    }
  };

  return (
    <AddSupForm
      suppName={suppName}
      setSuppName={setSuppName}
      suppEmail={suppEmail}
      setSuppEmail={setSuppEmail}
      handleSubmit={handleSubmit}
    />
  );
};

export default AddSup;
