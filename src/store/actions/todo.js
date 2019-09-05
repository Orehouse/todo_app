import * as actionTypes from "./actionTypes";
import {
  fetchTodoListAsync,
  putTodoAsync,
  deleteTodoAsync
} from "../../api/todoApi";

export const fetchTodoListStart = () => {
  return { type: actionTypes.FETCH_TODO_LIST_START };
};

export const fetchTodoListSuccess = todoList => {
  return { type: actionTypes.FETCH_TODO_LIST_SUCCESS, todoList };
};

export const fetchTodoListFail = error => {
  return { type: actionTypes.FETCH_TODO_LIST_FAIL, error };
};

export const fetchTodoList = () => {
  return dispatch => {
    dispatch(fetchTodoListStart());
    fetchTodoListAsync()
      .then(todoList => {
        fetchTodoListSuccess(todoList);
      })
      .catch(error => fetchTodoListFail(error));
  };
};
