import React, { useState } from "react";
import { addCatAPI_Func } from "../../frame/API";
import { pk } from "../../setPrimary";
import { useHistory } from "react-router-dom";
import Component from "./component/newCategory";

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
        if (response.data.auth == false) {
          history.push("/error");
          window.location.reload(false);
        }
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
