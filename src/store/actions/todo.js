import * as actionTypes from "./actionTypes";
import { createAction } from "redux-actions";
import {
  fetchTodoListAsync,
  putTodoAsync,
  deleteTodoAsync
} from "../../api/todoApi";

export const fetchTodoListStart = createAction(
  actionTypes.FETCH_TODO_LIST_START
);
export const fetchTodoListSuccess = createAction(
  actionTypes.FETCH_TODO_LIST_SUCCESS
);
export const fetchTodoListFail = createAction(actionTypes.FETCH_TODO_LIST_FAIL);

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

export const addOrEditTodoStart = createAction(
  actionTypes.ADD_OR_EDIT_TODO_START
);
export const addOrEditTodoSuccess = createAction(
  actionTypes.ADD_OR_EDIT_TODO_SUCCESS
);
export const addOrEditTodoFail = createAction(
  actionTypes.ADD_OR_EDIT_TODO_FAIL
);

export const addOrEditTodo = todo => {
  return dispatch => {
    dispatch(addOrEditTodoStart());
    return putTodoAsync(todo)
      .then(addedTodo => dispatch(addOrEditTodoSuccess(addedTodo)))
      .catch(error => dispatch(addOrEditTodoFail(error)));
  };
};

export const removeTodoStart = createAction(actionTypes.REMOVE_TODO_START);
export const removeTodoSuccess = createAction(actionTypes.REMOVE_TODO_SUCCESS);
export const removeTodoFail = createAction(actionTypes.REMOVE_TODO_FAIL);

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
