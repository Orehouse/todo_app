import React from "react";
import { Row, Col, Container } from "reactstrap";
import AddTodoForm from "./components/AddTodoForm/AddTodoForm";

const App = props => {
  return (
    <Container fluid={true}>
      <div className="py-5 text-center">
        <h2>TODO App</h2>
      </div>
      <Row>
        <Col md={12}>
          <AddTodoForm />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
