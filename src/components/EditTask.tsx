import React, { useEffect, useState } from "react";
import { Task, TaskSituation } from "./task";
import "../styles/App.css";
import axios from "axios";

interface EditTaskProps {
  task: Task;
  onTaskUpdated: (updatedTask: Task) => void;
  onCancelEdit: () => void;
}

const EditTask: React.FC<EditTaskProps> = ({ task, onTaskUpdated, onCancelEdit }) => {
  const [editedTask, setEditedTask] = useState<Task>({ ...task });

  useEffect(() => {
      setEditedTask({ ...task }); // Mantém editedTask sincronizado com a prop task
  }, [task]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = event.target;
      const newValue = value as TaskSituation; // Cast para TaskSituation
      setEditedTask({ ...editedTask, [name]: newValue });
  };

  const handleUpdateTask = async () => {
    try {
      const response = await axios.put<Task>(
        `https://chronos.wlssistemas.com.br/api/tasks/{editedTask.id}`,
        editedTask
      );

      onTaskUpdated(response.data);
      alert("Tarefa atualizada com sucesso!");
      onCancelEdit();
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
      alert(
        "Erro ao atualizar tarefa. Verifique o console para mais detalhes."
      );
    }
  };

  return (
    <div className="edit-task-form">
      <h2>Editar Tarefa</h2>
      <form>
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={editedTask.title}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Descrição"
          value={editedTask.description}
          onChange={handleInputChange}
        />
        <select
          name="situation"
          value={editedTask.situation}
          onChange={handleSelectChange}
        >
          <option value="Pendente">Pendente</option>
          <option value="Concluída">Concluída</option>
        </select>
        <button type="button" onClick={handleUpdateTask}>
          Salvar Alterações
        </button>
        <button type="button" onClick={onCancelEdit}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default EditTask;
