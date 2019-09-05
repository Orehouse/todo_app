import * as actionTypes from "../actions/actionTypes";
import { handleActions } from "redux-actions";
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

function fetchTodoListSuccess(state, todoList) {
  return updateObject(state, {
    todoList: todoList,
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

function addOrEditTodoSuccess(state, todo) {
  return updateObject(state, {
    loading: false,
    error: null,
    todoList: addOrUpdateArrayElementWithKey(state.todoList, "id", todo)
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

function removeTodoSuccess(state, id) {
  return updateObject(state, {
    loading: false,
    error: null,
    todoList: state.todoList.filter(todo => todo.id !== id)
  });
}

function removeTodoFail(state) {
  return updateObject(state, {
    loading: false,
    error: "Something went wrong with removing todo item"
  });
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
