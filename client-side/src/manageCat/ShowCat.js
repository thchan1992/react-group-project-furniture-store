import React, { useEffect, useState } from "react";
import axios from "axios";
import { host, showCaterAPI } from "../Constants";

import CatList from "./component/CatList";
const ShowCat = () => {
  const [catList, setCatList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get(showCaterAPI).then((response) => {
      setCatList(response.data.result);
      setIsLoading(false);
    });
  }, [isLoading]);

  return <CatList catList={catList} setIsLoading={setIsLoading} />;
};

export default ShowCat;
