import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ShowTask.css";
import TaskItem from "./taskItem";
import { Task } from "./task";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get<Task[]>(
          "https://chronos.wlssistemas.com.br/api/tasks"
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskDeleted = async (guid: number) => {
    try {
      await axios.delete(
        `https://chronos.wlssistemas.com.br/api/tasks/{guid}`
      );
      setTasks(tasks.filter((task) => task.id !== guid));
      alert("Tarefa excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
      alert("Erro ao excluir tarefa. Verifique o console para mais detalhes.");
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1 className="task-title">Lista de tarefas</h1>
      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onTaskDeleted={handleTaskDeleted}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
