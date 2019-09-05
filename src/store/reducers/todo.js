import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

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
    error: "Something went wrong"
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
    default:
      return state;
  }
};

export default reducer;
