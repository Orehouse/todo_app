import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Form,
  FormGroup,
  Label,
  Row,
  Col,
  Button,
  Input,
  Card,
  CardBody,
  Spinner
} from "reactstrap";

import * as actions from "../../store/actions/index";

const AddTodoForm = props => {
  const [todoTitle, setTodoTitle] = useState("");

  const onSubmitHandler = event => {
    event.preventDefault();
    props.onTodoAdded({ title: todoTitle });
  };

  return (
    <Card>
      <CardBody>
        <Form onSubmit={onSubmitHandler}>
          <Row>
            <Col lg={12}>
              <Label for="newTodoTitle">Title</Label>
              <Row>
                <Col xs={9}>
                  <FormGroup>
                    <Input
                      type="text"
                      id="newTodoTitle"
                      placeholder="Please type what todo"
                      value={todoTitle}
                      onChange={event => {
                        setTodoTitle(event.target.value);
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col xs={2}>
                  <FormGroup>
                    <Button color="success" onClick={onSubmitHandler}>
                      Add
                    </Button>
                  </FormGroup>
                </Col>
                <Col xs={1} className="text-left">
                  {props.isLoading && <Spinner color="primary" />}
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.todo.loading,
    error: state.todo.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTodoAdded: todo => dispatch(actions.addOrEditTodo(todo))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTodoForm);
