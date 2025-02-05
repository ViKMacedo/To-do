import { useState } from "react";
import "./App.css";
import Todo from "./components/todoList";
import Form from "./components/form";
import Search from "./components/Search";

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Estudar",
      category: "Estudo",
      isComplete: false,
    },
    {
      id: 2,
      text: "Trabalhar",
      category: "Trabalho",
      isComplete: false,
    },
    {
      id: 3,
      text: "Descansar",
      category: "Descanso",
      isComplete: false,
    },
  ]);

  const addTodo = (text: any, category: any) => {
    const newTodos = [
      ...todos,
      {
        id: Math.floor(Math.random() * 10000),
        text,
        category,
        isComplete: false,
      },
    ];
    setTodos(newTodos);
  };

  const removeTodo = (id: number) => {
    const newTodos = [...todos];
    const filteredTodos = newTodos.filter((todo) =>
      todo.id !== id ? todo : null
    );
    setTodos(filteredTodos);
  };

  const completeTodo = (id: number) => {
    const newTodos = [...todos];
    newTodos.map((todo) =>
      todo.id === id ? (todo.isComplete = !todo.isComplete) : todo
    );
    setTodos(newTodos);
  };

  const [search, setSearch] = useState("");

  return (
    <div className="app">
      <h1>Lista de tarefas</h1>
      <Search search={search} setSearch={setSearch} />
      <div className="todo-map">
        {todos
          .filter((todo) =>
            todo.text.toLowerCase().includes(search.toLowerCase())
          )
          .map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              removeTodo={removeTodo}
              completeTodo={completeTodo}
            />
          ))}
      </div>
      <Form addTodo={addTodo} />
    </div>
  );
}

export default App;
