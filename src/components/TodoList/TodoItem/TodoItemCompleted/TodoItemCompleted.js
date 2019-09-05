import React from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { updateObject } from "../../../../shared/utility";

const TodoItemCompleted = props => {
  const todoData = props.todoData;

  const onCompleteChangedHandler = event => {
    const updatedTodo = updateObject(todoData, {
      isCompleted: event.target.checked
    });
    props.onTodoUpdated(updatedTodo);
  };

  return (
    <FormGroup check>
      <Label check>
        <Input
          type="checkbox"
          checked={todoData.isCompleted}
          onChange={onCompleteChangedHandler}
        />
        &#8203;
      </Label>
    </FormGroup>
  );
};

export default TodoItemCompleted;
