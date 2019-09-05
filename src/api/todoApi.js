import uniqid from "uniqid";

export async function fetchTodoListAsync() {
  return new Promise(resolve => {
    setTimeout(() => {
      const todoList = JSON.parse(localStorage.getItem("todoList"));
      resolve(todoList);
    }, 500);
  });
}

export async function putTodoAsync(todo) {
  return new Promise(resolve => {
    setTimeout(() => {
      const todoList = JSON.parse(localStorage.getItem("todoList"));
      if (todo.id) {
        todoList[todoList.findIndex(el => el.id === todo.id)] = todo;
      } else {
        todo = { ...todo, id: uniqid() };
        todoList.push(todo);
      }
      localStorage.setItem("todoList", todoList);
      resolve(todo);
    }, 500);
  });
}

export async function deleteTodoAsync(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      const todoList = JSON.parse(localStorage.getItem("todoList"));
      const updatedTodoList = todoList.filter(el => el.id !== id);
      localStorage.setItem("todoList", updatedTodoList);
      resolve(id);
    }, 500);
  });
}
