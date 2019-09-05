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
import {
  errorSelector,
  isLoadingSelector
} from "../../store/selectors/todoSelectors";

const AddTodoForm = props => {
  const [todoTitle, setTodoTitle] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const onSubmitHandler = event => {
    event.preventDefault();
    if (!isFormValid) return;
    props.onTodoAdded({ title: todoTitle, isCompleted: false }).then(() => {
      setTodoTitle("");
      setIsFormValid(false);
    });
  };

  const onChangeHandler = event => {
    const value = event.target.value;
    if (value.trim().length > 0) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
    setTodoTitle(value);
  };

  return (
    <Card>
      <CardBody>
        <Form onSubmit={onSubmitHandler}>
          <Row>
            <Col lg={12}>
              <Label for="newTodoTitle">Your new TODO:</Label>
              <Row>
                <Col xs={9}>
                  <FormGroup>
                    <Input
                      type="text"
                      id="newTodoTitle"
                      placeholder="What should be done?"
                      value={todoTitle}
                      onChange={onChangeHandler}
                    />
                  </FormGroup>
                </Col>
                <Col xs={2}>
                  <FormGroup>
                    <Button
                      color="success"
                      onClick={onSubmitHandler}
                      disabled={!isFormValid}
                    >
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
    isLoading: isLoadingSelector(state),
    error: errorSelector(state)
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
