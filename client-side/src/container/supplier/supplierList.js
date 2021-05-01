import React, { useEffect, useState } from "react";
import SuppList from "./component/supplierList";
import { showSuppAPI_Func } from "../../frame/API";
import { useHistory } from "react-router-dom";

const ShowSup = ({ messageSetter }) => {
  const [suppList, setSuppList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  useEffect(() => {
    showSuppAPI_Func().then((response) => {
      if (!response.data.result || response.data.auth == false) {
        history.push("/error");
        window.location.reload(false);
      }
      setSuppList(response.data.result);
      setIsLoading(false);
    });
  }, [isLoading]);

  return (
    <SuppList
      suppList={suppList}
      setIsLoading={setIsLoading}
      messageSetter={messageSetter}
    />
  );
};

export default ShowSup;
