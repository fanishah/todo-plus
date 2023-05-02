import {
  TbSquareRoundedCheckFilled,
  TbSquareRounded,
  TbEditCircle,
  TbTrashXFilled,
  TbSend,
} from "react-icons/tb";
import { useContext, useState } from "react";

import "./Todo.css";
import useTodos from "../hook/useTodos";

function Todo({ id, name, dec, isDone, color }) {
  const { TodoList, setTodoList } = useTodos();

  const [IsEdit, setIsEdit] = useState(false);
  const [NameTodo, setNameTodo] = useState(name);
  const [DecTodo, setDecTodo] = useState(dec);

  // delete todo
  function DeleteHandel(ID) {
    const Newtodolist = TodoList.filter((e) => {
      return e.id !== ID;
    });
    setTodoList(Newtodolist);
  }

  // Todo status done change
  function DoneHandle(ID) {
    let todos = [...TodoList];
    const todoIndex = todos.findIndex((e) => {
      return e.id == ID;
    });
    todos[todoIndex].isDone = !todos[todoIndex].isDone;
    setTodoList(todos);
  }

  // Show Edit Mode
  function ShowEditHandel() {
    setIsEdit(!IsEdit);
  }

  // Editing in Todo
  function EditHandel(ID) {
    let todos = [...TodoList];
    const todoIndex = todos.findIndex((e) => {
      return e.id == ID;
    });
    todos[todoIndex].name = NameTodo;
    todos[todoIndex].dec = DecTodo;
    setTodoList(todos);
    setIsEdit(false);
  }

  return (
    <div className={`flex bg-[${color}] rounded-lg py-3 px-4 justify-between`}>
      <div className="flex flex-col justify-center w-full">
        <div className="flex items-center space-x-1">
          {isDone && (
            <TbSquareRoundedCheckFilled
              onClick={(e, eleman = id) => {
                if (IsEdit) {
                  DoneHandle(eleman);
                }
              }}
              size="1.4rem"
              className={`${IsEdit && "cursor-pointer"} ${
                color == "#111827" ? "text-green-500" : "text-white"
              }`}
            />
          )}
          {!isDone && (
            <TbSquareRounded
              onClick={(e, eleman = id) => {
                DoneHandle(eleman);
              }}
              size="1.4rem"
              className="cursor-pointer"
            />
          )}

          {IsEdit ? (
            <input
              type="text"
              class="border text-sm rounded-lg w-4/12 py-1 px-2.5 bg-[#030712] border-gray-600 placeholder-gray-600 text-gray-400"
              dir="auto"
              value={NameTodo}
              onChange={(e) => {
                setNameTodo(e.target.value);
              }}
            />
          ) : (
            <h1
              className={`text-lg mb-1 ${
                color == "#111827" ? "text-gray-200" : "text-gray-900"
              }`}
            >
              {NameTodo}
            </h1>
          )}
        </div>

        {IsEdit ? (
          <input
            type="text"
            class="border text-sm rounded-lg mt-1 w-11/12 py-1 px-2.5 bg-[#030712] border-gray-600 placeholder-gray-600 text-gray-400"
            dir="auto"
            value={DecTodo}
            onChange={(e) => {
              setDecTodo(e.target.value);
            }}
          />
        ) : (
          <p
            className={`text-sm pb-1 ${
              color == "#111827" ? "text-gray-400" : "text-gray-950"
            }`}
          >
            {DecTodo}
          </p>
        )}
      </div>
      <div className="flex flex-col items-center justify-center space-y-1">
        <TbTrashXFilled
          onClick={(e, eleman = id) => {
            DeleteHandel(eleman);
          }}
          size="1.6rem"
          className={`cursor-pointer ${
            color == "#111827" ? "text-red-500" : "text-gray-100"
          }`}
        />
        {IsEdit ? (
          <TbSend
            size="1.5rem"
            onClick={(e, ID = id) => {
              EditHandel(ID);
            }}
            className="cursor-pointer"
          />
        ) : (
          <TbEditCircle
            size="1.6rem"
            onClick={ShowEditHandel}
            className="text-yellow-500 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}

export default Todo;
