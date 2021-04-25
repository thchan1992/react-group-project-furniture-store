import React, { useEffect, useState } from "react";
import { showCaterAPI_Func } from "../Utility/API";
import CatList from "./component/CatList";
const ShowCat = () => {
  const [catList, setCatList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    showCaterAPI_Func().then((response) => {
      setCatList(response.data.result);
      setIsLoading(false);
    });
  }, [isLoading]);

  return <CatList catList={catList} setIsLoading={setIsLoading} />;
};

export default ShowCat;
