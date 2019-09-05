import * as actionTypes from "../actions/actionTypes";
import { handleActions } from "redux-actions";
import dotProp from "dot-prop-immutable-chain";
import { addOrUpdateArrayElementWithKey } from "../../shared/utility";

const initialState = {
  todoList: [],
  loading: false,
  error: null
};

function fetchTodoListStart(state) {
  return dotProp(state)
    .set("loading", true)
    .set("error", null)
    .value();
}

function fetchTodoListSuccess(state, todoList) {
  return dotProp(state)
    .set("todoList", todoList)
    .set("loading", false)
    .set("error", null)
    .value();
}

function fetchTodoListFail(state) {
  return dotProp(state)
    .set("loading", false)
    .set("error", "Something went wrong with fetching todo list")
    .value();
}

function addOrEditTodoSuccess(state, todo) {
  return dotProp(state)
    .set("todoList", addOrUpdateArrayElementWithKey(state.todoList, "id", todo))
    .set("loading", false)
    .set("error", null)
    .value();
}

function addOrEditTodoStart(state) {
  return dotProp(state)
    .set("loading", true)
    .set("error", null)
    .value();
}

function addOrEditTodoFail(state) {
  return dotProp(state)
    .set("loading", false)
    .set("error", "Something went wrong with adding todo")
    .value();
}

function removeTodoStart(state) {
  return dotProp(state)
    .set("loading", true)
    .set("error", null)
    .value();
}

function removeTodoSuccess(state, id) {
  return dotProp(state)
    .set("loading", false)
    .set("error", null)
    .set("todoList", state.todoList.filter(todo => todo.id !== id))
    .value();
}

function removeTodoFail(state) {
  return dotProp(state)
    .set("loading", false)
    .set("error", "Something went wrong with removing todo item")
    .value();
}

const reducer = handleActions(
  {
    [actionTypes.FETCH_TODO_LIST_START](state) {
      return fetchTodoListStart(state);
    },
    [actionTypes.FETCH_TODO_LIST_SUCCESS](state, action) {
      return fetchTodoListSuccess(state, action.payload);
    },
    [actionTypes.FETCH_TODO_LIST_FAIL](state) {
      return fetchTodoListFail(state);
    },
    [actionTypes.ADD_OR_EDIT_TODO_START](state) {
      return addOrEditTodoStart(state);
    },
    [actionTypes.ADD_OR_EDIT_TODO_SUCCESS](state, action) {
      return addOrEditTodoSuccess(state, action.payload);
    },
    [actionTypes.ADD_OR_EDIT_TODO_FAIL](state) {
      return addOrEditTodoFail(state);
    },
    [actionTypes.REMOVE_TODO_START](state) {
      return removeTodoStart(state);
    },
    [actionTypes.REMOVE_TODO_SUCCESS](state, action) {
      return removeTodoSuccess(state, action.payload);
    },
    [actionTypes.REMOVE_TODO_FAIL](state) {
      return removeTodoFail(state);
    }
  },
  initialState
);

export default reducer;
