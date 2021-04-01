import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { host, showSuppAPI } from "../Constants";
import EditSupp from "./EditSupp";

const ShowSup = () => {
  const [suppList, setSuppList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get(showSuppAPI).then((response) => {
      setSuppList(response.data.result);
      setIsLoading(false);
    });
  }, [isLoading]);

  return (
    <div>
      <Row gutter={40}>
        {suppList.map((data) => (
          <Col
            className="block-example border border-dark"
            xs={{ span: 6 }}
            sm={{ span: 4 }}
            md={{ span: 3 }}
            lg={{ span: 2 }}
            xl={{ span: 2 }}
          >
            <EditSupp data={data} setIsLoading={setIsLoading} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ShowSup;
