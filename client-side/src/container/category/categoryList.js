import React, { useEffect, useState } from "react";
import { showCaterAPI_Func } from "../../frame/API";
import CatList from "./component/categoryList";
import { useHistory } from "react-router-dom";
const ShowCat = ({ messageSetter }) => {
  const [catList, setCatList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    showCaterAPI_Func().then((response) => {
      setCatList(response.data.result);
      setIsLoading(false);
    });
  }, [isLoading]);

  return (
    <CatList
      catList={catList}
      setIsLoading={setIsLoading}
      messageSetter={messageSetter}
    />
  );
};

export default ShowCat;
