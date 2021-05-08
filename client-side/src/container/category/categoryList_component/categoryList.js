import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import React from "react";
import EditCategory from "./editCategory";
import Card from "react-bootstrap/Card";
import "./categoryList.css";
import Button from "react-bootstrap/Button";

const CategoryList = ({ catList, setIsLoading, messageSetter, history }) => {
  return (
    <Card>
      <Card.Header>
        <div className="category-title-style">Category</div>
      </Card.Header>
      <Card.Body>
        <Card.Title>
          <Button
            variant="info"
            className="category-edit-button-style"
            onClick={() => {
              history.push("/home");
              window.location.reload(false);
            }}
          >
            Reload
          </Button>
        </Card.Title>
        <Row
          gutter={40}
          style={{
            backgroundColor: "white",
          }}
        >
          {catList.map((data) => (
            <Col
              className="border-0 border-dark"
              xs={{ span: 6 }}
              sm={{ span: 4 }}
              md={{ span: 3 }}
              lg={{ span: 2 }}
              xl={{ span: 2 }}
            >
              <Card>
                <EditCategory
                  data={data}
                  setIsLoading={setIsLoading}
                  messageSetter={messageSetter}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CategoryList;
