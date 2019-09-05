import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";
import TodoItem from "./TodoItem/TodoItem";

import * as actions from "../../store/actions/index";

const TodoList = props => {
  useEffect(() => {
    props.onFetchTodoList();
  }, []);

  const getSortedTodoList = (unsortedList, isReversed = false) => {
    const reversedMultiplier = isReversed ? -1 : 1;
    return [...unsortedList].sort((a, b) => {
      const titleA = a.title.toUpperCase();
      const titleB = b.title.toUpperCase();
      return (
        (titleA < titleB ? -1 : titleA > titleB ? 1 : 0) * reversedMultiplier
      );
    });
  };

  const todoList =
    props.todoList && props.todoList.length > 0 ? (
      getSortedTodoList(props.todoList, true).map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          title={todo.title}
          id={todo.id}
          isCompleted={todo.isCompleted}
        />
      ))
    ) : (
      <tr className="text-center">
        <td>Your TODO list is empty!</td>
      </tr>
    );

  return (
    <Table>
      <thead>
        <tr>
          <th>Completed</th>
          <th>Title</th>
          <th></th>
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
