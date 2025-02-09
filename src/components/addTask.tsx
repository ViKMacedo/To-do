import React, { useState } from "react";
import { Task, TaskSituation } from "./task";
import "../styles/addTask.css";
import axios from "axios";

interface AddTaskProps {
  onTaskCreated: (newTask: Task) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onTaskCreated }) => {
  const [newTask, setNewTask] = useState<Omit<Task, "id">>({
    title: "",
    description: "",
    situation: TaskSituation.Uncompleted,
    complete: false
  });

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    const newValue = name === "situation" ? (value as TaskSituation) : value;
    setNewTask({ ...newTask, [name]: newValue });
  };

  const handleCreateTask = async () => {
    try {
      const response = await axios.post<Task>(
        "https://chronos.wlssistemas.com.br/api/tasks",
        newTask
      );

      const createdTask: Task = {
        id: response.data.id,
        ...newTask,
        situation: response.data.situation as TaskSituation,
        complete: response.data.complete,
      };

      onTaskCreated(createdTask);
      setNewTask({
        title: "",
        description: "",
        situation: TaskSituation.Uncompleted,
        complete: false
      });
      alert("Tarefa criada com sucesso!");
    } catch (error) {}
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
          {Object.values(TaskSituation).map((situation) => (
            <option key={situation} value={situation}>
              {situation}
            </option>
          ))}
        </select>
        <button type="button" onClick={handleCreateTask}>
          Criar Tarefa
        </button>
      </form>
    </div>
  );
};

export default AddTask;
