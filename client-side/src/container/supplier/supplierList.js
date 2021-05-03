import React, { useEffect, useState } from "react";
import Component from "./supplierList_component/supplierList";
import { showSuppAPI_Func } from "../../api/api";
import { useHistory } from "react-router-dom";
import { authChecker } from "../../utility/authChecker";

const SupplierList = ({ messageSetter }) => {
  const [suppList, setSuppList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    showSuppAPI_Func().then((response) => {
      authChecker(history, response, true);
      setSuppList(response.data.result);
      setIsLoading(false);
    });
  }, [isLoading]);

  return (
    <Component
      suppList={suppList}
      setIsLoading={setIsLoading}
      messageSetter={messageSetter}
    />
  );
};

export default SupplierList;
