import * as actionTypes from "../actions/actionTypes";
import {
  updateObject,
  addOrUpdateArrayElementWithKey
} from "../../shared/utility";

const initialState = {
  todoList: [],
  loading: false,
  error: null
};

function fetchTodoListStart(state) {
  return updateObject(state, { loading: true, error: null });
}

function fetchTodoListSuccess(state, action) {
  return updateObject(state, {
    todoList: action.todoList,
    loading: false,
    error: null
  });
}

function fetchTodoListFail(state) {
  return updateObject(state, {
    loading: false,
    error: "Something went wrong with fetching todo list"
  });
}

function addOrEditTodoSuccess(state, action) {
  return updateObject(state, {
    loading: false,
    error: null,
    todoList: addOrUpdateArrayElementWithKey(state.todoList, "id", action.todo)
  });
}

function addOrEditTodoStart(state) {
  return updateObject(state, { loading: true, error: null });
}

function addOrEditTodoFail(state) {
  return updateObject(state, {
    loading: false,
    error: "Something went wrong with adding todo"
  });
}

function removeTodoStart(state) {
  return updateObject(state, { loading: true, error: null });
}

function removeTodoSuccess(state, action) {
  return updateObject(state, {
    loading: false,
    error: null,
    todoList: state.todoList.filter(todo => todo.id !== action.id)
  });
}

function removeTodoFail(state) {
  return updateObject(state, {
    loading: false,
    error: "Something went wrong with removing todo item"
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TODO_LIST_START:
      return fetchTodoListStart(state);
    case actionTypes.FETCH_TODO_LIST_SUCCESS:
      return fetchTodoListSuccess(state, action);
    case actionTypes.FETCH_TODO_LIST_FAIL:
      return fetchTodoListFail(state);
    case actionTypes.ADD_OR_EDIT_TODO_START:
      return addOrEditTodoStart(state);
    case actionTypes.ADD_OR_EDIT_TODO_SUCCESS:
      return addOrEditTodoSuccess(state, action);
    case actionTypes.ADD_OR_EDIT_TODO_FAIL:
      return addOrEditTodoFail(state);
    case actionTypes.REMOVE_TODO_START:
      return removeTodoStart(state);
    case actionTypes.REMOVE_TODO_SUCCESS:
      return removeTodoSuccess(state, action);
    case actionTypes.REMOVE_TODO_FAIL:
      return removeTodoFail(state);
    default:
      return state;
  }
};

export default reducer;
