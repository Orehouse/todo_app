import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { Input } from "reactstrap";
import { updateObject } from "../../../../shared/utility";

const TodoItemTitleInput = props => {
  const [isEditing, setIsEditing] = useState(false);
  const [todoNewTitle, setTodoNewTitle] = useState(props.todoData.title);

  const [todoData, setTodoData] = [props.todoData, props.setTodoData];

  const enterToEditModeHandler = () => {
    setIsEditing(!isEditing);
    setTodoNewTitle(todoData.title);
  };

  const exitFromEditMode = () => {
    setIsEditing(false);
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

  return isEditing ? (
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
};

export default TodoItemTitleInput;
