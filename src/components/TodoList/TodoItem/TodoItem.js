import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import TodoItemTitle from "./TodoItemTitle/TodoItemTitle";
import TodoItemCompleted from "./TodoItemCompleted/TodoItemCompleted";
import * as actions from "../../../store/actions/index";
import * as classes from "./ToolItem.module.css";

const TodoItem = props => {
  const [todoData, setTodoData] = useState({
    id: props.id,
    title: props.title,
    isCompleted: props.isCompleted
  });

  return (
    <tr className={todoData.isCompleted ? "table-secondary" : ""}>
      <td>
        <TodoItemCompleted
          todoData={todoData}
          setTodoData={setTodoData}
          onTodoUpdated={props.onTodoUpdated}
        />
      </td>
      <td>
        <div className={classes.TodoItem__Title}>
          <TodoItemTitle
            todoData={todoData}
            setTodoData={setTodoData}
            onTodoUpdated={props.onTodoUpdated}
          />
        </div>
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
