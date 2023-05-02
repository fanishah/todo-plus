import { useEffect, useState } from "react";
import Header from "../components/Header";
import Todo from "../components/Todo";
import useTodos from "../hook/useTodos";

function HomePage() {
  const { TodoList, setTodoList } = useTodos();

  const [Todos, setTodos] = useState([]);
  const [IsDone, setIsDone] = useState(0);
  const [Incomplete, setIncomplete] = useState(0);
  const [SelectedOption, setSelectedOption] = useState("all");

  // Show all todolist
  useEffect(() => {
    setTodos(TodoList);
  }, [TodoList]);

  // Show todo based on filter
  useEffect(() => {
    const todos = [...TodoList];
    if (SelectedOption == "done") {
      let filterIsDone = todos.filter((e) => {
        return e.isDone;
      });
      return setTodoList(filterIsDone);
    }
    if (SelectedOption == "incomplete") {
      let filterIncomplete = todos.filter((e) => {
        return e.isDone == false;
      });
      return setTodoList(filterIncomplete);
    } else {
      return setTodoList(TodoList);
    }
  }, [SelectedOption]);

  // Show Todo statistics
  useEffect(() => {
    let filterIsDone = Todos.filter((e) => {
      return e.isDone;
    });
    setIsDone(filterIsDone.length);
    setIncomplete(Todos.length - filterIsDone.length);
  }, [Todos]);

  // Set filter todos
  function SelectedOptionHandel(selectValue) {
    setSelectedOption(selectValue);
  }

  return (
    <main className="px-1 md:w-10/12 xl:w-8/12 mx-auto my-10 space-y-2">
      <div>
        <Header />
      </div>
      <div className="flex">
        <div className="w-9/12 py-2 pr-2 space-y-2">
          {Todos.length > 0 ? (
            Todos.map((e) => {
              return (
                <Todo
                  key={e.id}
                  id={e.id}
                  name={e.name}
                  dec={e.dec}
                  isDone={e.isDone}
                  color={e.color}
                />
              );
            })
          ) : (
            <>
              <p className="text-center text-lg">Todo does not exist</p>
            </>
          )}
        </div>
        <div className="w-3/12 py-2 pl-2 space-y-3">
          <div className="bg-gray-900 py-5 px-4 rounded-lg">
            <select
              defaultValue="all"
              onChange={(e) => SelectedOptionHandel(e.target.value)}
              className="border text-gray-300 text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all" selected>
                All
              </option>
              <option value="done">Done</option>
              <option value="incomplete">Incomplete</option>
            </select>
          </div>
          <div className="bg-gray-900 px-4 pt-3 pb-4 rounded-lg">
            <h3 className="text-center mb-1 text-lg">Statistics</h3>
            <p>All : {Todos.length}</p>
            <p>Done : {IsDone}</p>
            <p>Incomplete : {Incomplete}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
