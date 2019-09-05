import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";
import TodoItem from "./TodoItem/TodoItem";

import * as actions from "../../store/actions/index";

const TodoList = props => {
  useEffect(() => {
    props.onFetchTodoList();
  }, []);

  const todoList =
    props.todoList && props.todoList.length > 0 ? (
      props.todoList.map(todo => (
        <TodoItem key={todo.id} title={todo.title} id={todo.id} />
      ))
    ) : (
      <tr className="text-center">Your TODO list is empty!</tr>
    );

  return (
    <Table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{todoList}</tbody>
    </Table>
  );
};

const mapStateToProps = state => {
  return {
    todoList: state.todo.todoList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchTodoList: () => dispatch(actions.fetchTodoList())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
