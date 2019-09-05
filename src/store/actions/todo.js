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
    return fetchTodoListAsync()
      .then(todoList => {
        dispatch(fetchTodoListSuccess(todoList));
      })
      .catch(error => dispatch(fetchTodoListFail(error)));
  };
};

export const addOrEditTodoStart = () => {
  return { type: actionTypes.ADD_OR_EDIT_TODO_START };
};

export const addOrEditTodoSuccess = todo => {
  return { type: actionTypes.ADD_OR_EDIT_TODO_SUCCESS, todo };
};

export const addOrEditTodoFail = error => {
  return { type: actionTypes.ADD_OR_EDIT_TODO_FAIL, error };
};

export const addOrEditTodo = todo => {
  return dispatch => {
    dispatch(addOrEditTodoStart());
    return putTodoAsync(todo)
      .then(addedTodo => dispatch(addOrEditTodoSuccess(addedTodo)))
      .catch(error => dispatch(addOrEditTodoFail(error)));
  };
};

export const removeTodoStart = () => {
  return { type: actionTypes.REMOVE_TODO_START, loading: true, error: null };
};

export const removeTodoSuccess = id => {
  return { type: actionTypes.REMOVE_TODO_SUCCESS, loading: false, error: null };
};

export const removeTodoFail = error => {
  return { type: actionTypes.REMOVE_TODO_FAIL, loading: false, error };
};

export const removeTodo = id => {
  return dispatch => {
    dispatch(removeTodoStart());
    return deleteTodoAsync(id)
      .then(() => dispatch(removeTodoSuccess(id)))
      .catch(error => {
        removeTodoFail(error);
      });
  };
};
