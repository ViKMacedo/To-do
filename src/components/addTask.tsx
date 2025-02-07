import React, { useState } from "react";
import { Task } from "./task";
import "../styles/addTask.css"

interface AddTaskProps {
  onTaskCreated: (newTask: Task) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onTaskCreated }) => {
  const [newTask, setNewTask] = useState<Omit<Task, "id">>({
    title: "",
    description: "",
    situation: "Pendente",
  });

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleCreateTask = async () => {
    try {
      const newTaskWithId: Task = {
        ...newTask,
        id: Date.now(),
      };

      onTaskCreated(newTaskWithId);
      setNewTask({ title: "", description: "", situation: "Pendente" });
      alert("Tarefa criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      alert("Erro ao criar tarefa. Verifique o console para mais detalhes.");
    }
  };

  return (
    <div>
      <h2>Nova Tarefa</h2>
      <form className="new-task-form">
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={newTask.title}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Descrição"
          value={newTask.description}
          onChange={handleInputChange}
        />
        <select
          name="situation"
          value={newTask.situation}
          onChange={handleInputChange}
        >
          <option value="Pendente">Pendente</option>
          <option value="Em Andamento">Em Andamento</option>
          <option value="Concluída">Concluída</option>
        </select>
        <button type="button" onClick={handleCreateTask}>
          Criar Tarefa
        </button>
      </form>
    </div>
  );
};

export default AddTask;
