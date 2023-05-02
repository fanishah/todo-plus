import { createContext, useEffect, useState } from "react";

export const TodoContext = createContext();
export const TodoContextDispacher = createContext();

function TodoProvider({ children }) {
  const [TodoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(TodoList));
  }, [TodoList]);

  return (
    <TodoContext.Provider value={{ TodoList, setTodoList }}>
      {children}
    </TodoContext.Provider>
  );
}

export default TodoProvider;
