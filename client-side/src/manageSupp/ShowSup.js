import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { host, showSuppAPI } from "../Constants";
import EditSupp from "./component/EditSupp";
import SuppList from "./component/SuppList";

const ShowSup = () => {
  const [suppList, setSuppList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get(showSuppAPI).then((response) => {
      setSuppList(response.data.result);
      setIsLoading(false);
    });
  }, [isLoading]);

  return <SuppList suppList={suppList} setIsLoading={setIsLoading} />;
};

export default ShowSup;
