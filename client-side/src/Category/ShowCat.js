import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { host, showCaterAPI } from "../Constants";
import EditCat from "./EditCat";

const ShowCat = () => {
  const [catList, setCatList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get(showCaterAPI).then((response) => {
      setCatList(response.data.result);
      setIsLoading(false);
    });
  }, [isLoading]);

  return (
    <div>
      <Row gutter={40}>
        {catList.map((data) => (
          <Col
            className="block-example border border-dark"
            xs={{ span: 6 }}
            sm={{ span: 4 }}
            md={{ span: 3 }}
            lg={{ span: 2 }}
            xl={{ span: 2 }}
          >
            <EditCat data={data} setIsLoading={setIsLoading} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ShowCat;
