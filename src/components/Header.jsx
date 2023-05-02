import { TbSquareRoundedPlus } from "react-icons/tb";
import { IoColorFill } from "react-icons/io5";
import { Fragment, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { Menu, Transition } from "@headlessui/react";
import useTodos from "../hook/useTodos";

function Header() {
  const { TodoList, setTodoList } = useTodos();

  const [Name, setName] = useState("");
  const [Dec, setDec] = useState("");
  const [ColorList] = useState([
    "111827",
    "22c55e",
    "f97316",
    "c026d3",
    "3b82f6",
    "8b5cf6",
    "84cc16",
    "e11d48",
    "ec4899",
  ]);
  const [Color, setColor] = useState("111827");

  function ChangeColorHandel(eleman) {
    setColor(eleman);
  }

  // add todo
  function AddTodoHandel() {
    if (!Name) {
      return toast.error("Entering the Name is mandatory.", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    if (TodoList) {
      setTodoList([
        ...TodoList,
        {
          id: uuidv4(),
          name: Name,
          dec: Dec,
          isDone: false,
          color: `#${Color}`,
        },
      ]);
      setName("");
      setDec("");
      setColor(ColorList[0]);
      return;
    }
    setTodoList([
      { id: uuidv4(), name: Name, dec: Dec, isDone: false, color: `#${Color}` },
    ]);
    setName("");
    setDec("");
    setColor(ColorList[0]);
  }

  return (
    <div className="bg-gray-900 flex rounded-xl py-5 px-8 justify-between items-center space-x-5">
      <div className="flex w-full space-x-1.5 items-center">
        <input
          type="text"
          placeholder="Name Todo"
          className="border text-sm rounded-lg w-3/12 p-2.5 bg-[#030712] border-gray-600 placeholder-gray-600 text-gray-400"
          dir="auto"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={Name}
          required
        />
        <input
          type="text"
          placeholder="Description"
          className="border text-sm rounded-lg w-9/12 xl:w-7/12 p-2.5 bg-[#030712] border-gray-600 placeholder-gray-600 text-gray-400"
          dir="auto"
          onChange={(e) => {
            setDec(e.target.value);
          }}
          value={Dec}
          required
        />
        <TbSquareRoundedPlus
          onClick={AddTodoHandel}
          size="1.9rem"
          className="text-gray-300 cursor-pointer"
        />
      </div>
      <div className="flex space-x-2 items-center relative">
        <Menu>
          <Menu.Button>
            <IoColorFill
              size="1.6rem"
              className="cursor-pointer text-gray-300"
            />
          </Menu.Button>
          <div className="absolute top-7 -left-[59px]">
            <Transition
              as={Fragment}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Menu.Items>
                <div className="bg-gray-800 rounded-lg flex flex-wrap w-32 justify-center p-2">
                  {ColorList.map((color) => {
                    return (
                      <span
                        key={color}
                        className="p-1 cursor-pointer"
                        onClick={(e, eleman = color) => {
                          ChangeColorHandel(eleman);
                        }}
                      >
                        <div
                          className={`rounded-full w-7 h-7 bg-[#${color}] ${
                            color === Color && "ring-2 ring-gray-300"
                          }`}
                        ></div>
                      </span>
                    );
                  })}
                </div>
              </Menu.Items>
            </Transition>
          </div>
        </Menu>
      </div>
    </div>
  );
}

export default Header;
