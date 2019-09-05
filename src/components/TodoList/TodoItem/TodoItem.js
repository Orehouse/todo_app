import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, FormGroup, Input, Label } from "reactstrap";
import OutsideClickHandler from "react-outside-click-handler";
import { updateObject } from "../../../shared/utility";
import * as classes from "./ToolItem.module.css";

import * as actions from "../../../store/actions/index";

const TodoItem = props => {
  const [todoData, setTodoData] = useState({
    id: props.id,
    title: props.title,
    isCompleted: props.isCompleted
  });
  const [todoNewTitle, setTodoNewTitle] = useState(props.title);
  const [isEditing, setIsEditing] = useState(false);

  const onCompleteChangedHandler = event => {
    const updatedTodo = updateObject(todoData, {
      isCompleted: event.target.checked
    });
    setTodoData(updatedTodo);
    props.onTodoUpdated(updatedTodo);
  };

  const enterToEditModeHandler = () => {
    setIsEditing(!isEditing);
  };

  const exitFromEditMode = () => {
    setIsEditing(false);
    setTodoNewTitle(todoData.title);
  };

  const exitFromEditModeHandler = () => {
    exitFromEditMode();
  };

  const onNewTitleChangeHandler = event => {
    setTodoNewTitle(event.target.value);
  };

  const saveNewTitle = () => {
    const updatedTodo = updateObject(todoData, {
      title: todoNewTitle
    });
    props.onTodoUpdated(updatedTodo).then(() => {
      setTodoData(updatedTodo);
      exitFromEditModeHandler();
    });
  };

  const onInputKeyDownHandler = event => {
    if (event.key === "Enter") {
      saveNewTitle();
    }
  };

  const titleContent = isEditing ? (
    <OutsideClickHandler onOutsideClick={exitFromEditModeHandler}>
      <Input
        type="text"
        value={todoNewTitle}
        onChange={onNewTitleChangeHandler}
        onKeyDown={onInputKeyDownHandler}
        autoFocus
      />
    </OutsideClickHandler>
  ) : (
    <span
      onDoubleClick={enterToEditModeHandler}
      style={{
        textDecoration: todoData.isCompleted ? "line-through" : "none"
      }}
    >
      {todoData.title}
    </span>
  );

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
        <div className={classes.TodoItem__Title}>{titleContent}</div>
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
