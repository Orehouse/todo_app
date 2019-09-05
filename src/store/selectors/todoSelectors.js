import { createSelector } from "reselect";

const todoSelector = state => state.todo;

export const isLoadingSelector = createSelector(
  todoSelector,
  todo => todo.loading
);
export const errorSelector = createSelector(
  todoSelector,
  todo => todo.error
);
