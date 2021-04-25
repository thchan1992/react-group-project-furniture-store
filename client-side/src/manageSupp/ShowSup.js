import React, { useEffect, useState } from "react";
import SuppList from "./component/SuppList";
import { showSuppAPI_Func } from "../Utility/API";

const ShowSup = () => {
  const [suppList, setSuppList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    showSuppAPI_Func().then((response) => {
      setSuppList(response.data.result);
      setIsLoading(false);
    });
  }, [isLoading]);

  return <SuppList suppList={suppList} setIsLoading={setIsLoading} />;
};

export default ShowSup;
