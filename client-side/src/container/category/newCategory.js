import React, { useState } from "react";
import { addCatAPI_Func } from "../../api/api";
import { pk } from "../../utility/setPrimary";
import { useHistory } from "react-router-dom";
import Component from "./newCategory_component/newCategory";
import { authChecker } from "../../utility/authChecker";

const AddCat = ({ messageSetter }) => {
  const [itemCatName, setItemCatName] = useState("");
  const history = useHistory();
  const handleSubmit = () => {
    if (!itemCatName) {
      messageSetter("No date was inserted", "danger", true);
    } else {
      const itemCatID = pk;
      const newCat = { itemCatName, itemCatID };
      addCatAPI_Func(newCat).then((response) => {
        authChecker(history, response, false);
        messageSetter(response.data.message, "success", true);
      });
    }
  };

  return (
    <Component
      itemCatName={itemCatName}
      setItemCatName={setItemCatName}
      handleSubmit={handleSubmit}
    />
  );
};

export default AddCat;
