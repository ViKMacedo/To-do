import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ShowTask.css";
import TaskItem from "./taskItem";
import { Task } from "./task";

interface TodoListProps {
  tasks: Task[];
  onTaskAdded?: (newTask: Task) => void;
}

const TaskList: React.FC<TodoListProps> = ({}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<Task[]>(
          "https://chronos.wlssistemas.com.br/api/tasks"
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
        setError("Erro ao carregar tarefas. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleTaskDeleted = async (taskId: string) => {
    const url = `https://chronos.wlssistemas.com.br/api/tasks/${taskId}`;
    console.log("URL de exclusão:", url);

    try {
        const response = await axios.delete(url);

        if (response.status === 200 || response.status === 204) {
            setTasks(tasks.filter((task) => task.id !== taskId));
            alert("Tarefa excluída com sucesso!");
        } else {
            console.error("Erro ao excluir tarefa:", response.data);
            alert(`Erro ao excluir tarefa: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error("Erro ao excluir tarefa:", error);
        alert("Erro ao excluir tarefa. Verifique o console para mais detalhes.");
    }
};

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    console.log(searchTerm);
  };

  const handleStatusFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setStatusFilter(event.target.value);
  };

  const filteredTasks = tasks.filter((task) => {
    const titleMatch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const descriptionMatch = task.description
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const statusMatch =
      statusFilter === "all" ||
      (statusFilter === "pending" && !task.complete) ||
      (statusFilter === "completed" && task.complete);
    console.log(
      "Tarefa:",
      task.title,
      "Status:",
      task.complete,
      "Filtro:",
      statusMatch
    );
    return titleMatch || (descriptionMatch && statusMatch);
  });

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  console.log(currentTasks);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredTasks.length / tasksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <h1 className="task-title">Lista de tarefas</h1>
      <input
        type="text"
        placeholder="Pesquisar tarefas..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <select value={statusFilter} onChange={handleStatusFilterChange}>
        <option value="all">Todos</option>{" "}
        <option value="Pendente">Pendentes</option>{" "}
        <option value="Concluída">Concluídas</option>{" "}
      </select>
      <ul className="task-list">
        {currentTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onTaskDeleted={handleTaskDeleted}
            onTaskUpdated={handleTaskUpdated}
          />
        ))}
      </ul>
      <div>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <a
                href="#"
                className="page-link"
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
