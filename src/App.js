import React from "react";
import { Row, Col, Container } from "reactstrap";
import AddTodoForm from "./components/AddTodoForm/AddTodoForm";
import TodoList from "./components/TodoList/TodoList";

const App = props => {
  return (
    <Container fluid={true}>
      <div className="py-5 text-center">
        <h2>TODO App</h2>
      </div>
      <Row>
        <Col md={12} className="mb-3">
          <AddTodoForm />
        </Col>
        <Col md={12}>
          <TodoList />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
