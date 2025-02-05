import React, { useState } from 'react';

type AddTodoFn = (text: string, category: string) => void;

interface FormProps {
  addTodo: AddTodoFn;
}

const form: React.FC<FormProps> = ({addTodo}) => {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!value || !category) return;
    // console.log(value, category)
    addTodo(value, category)
    setValue("");
    setCategory("");
  };

  return (
    <div className="todo-form">
      <h2> Criar tarefa:</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite a tarefa"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Selecione</option>
          <option value="Estudo">Estudo</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Descanso">Descanso</option>
        </select>
        <button type="submit">Criar tarefa</button>
      </form>
    </div>
  );
};

export default form;
