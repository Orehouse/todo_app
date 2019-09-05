import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { updateObject } from "../../../shared/utility";

import * as actions from "../../../store/actions/index";

const TodoItem = props => {
  const [todoData, setTodoData] = useState({
    id: props.id,
    title: props.title,
    isCompleted: props.isCompleted
  });
  const [todoNewTitle, setTodoNewTitle] = useState(props.title);

  const onCompleteChangedHandler = event => {
    const updatedTodo = updateObject(todoData, {
      isCompleted: event.target.checked
    });
    setTodoData(updatedTodo);
    props.onTodoUpdated(updatedTodo);
  };

  return (
    <tr className={todoData.isCompleted ? "table-secondary" : ""}>
      <td>
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              checked={todoData.isCompleted}
              onChange={onCompleteChangedHandler}
            />{" "}
            &#8203;
          </Label>
        </FormGroup>
      </td>
      <td>
        <span
          style={{
            textDecoration: todoData.isCompleted ? "line-through" : "none"
          }}
        >
          {todoData.title}
        </span>
      </td>
      <td>
        <Button
          close
          onClick={event => {
            event.preventDefault();
            props.onRemoveTodo(todoData.id);
          }}
        />
      </td>
    </tr>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onRemoveTodo: id => dispatch(actions.removeTodo(id)),
    onTodoUpdated: todo => dispatch(actions.addOrEditTodo(todo))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(TodoItem);
