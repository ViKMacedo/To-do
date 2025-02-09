import React, { useState } from "react";
import { Task } from "./task";
import EditTask from "./EditTask";
import "../styles/App.css";
interface TaskItemProps {
  task: Task;
  onTaskDeleted: (guid: string) => void;
  onTaskUpdated: (updatedTask: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onTaskDeleted,
  onTaskUpdated,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
      onTaskDeleted(task.id);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <EditTask
          task={task}
          onTaskUpdated={onTaskUpdated}
          onCancelEdit={handleCancelEdit}
        />
      ) : (
        <>
          <li className="task-title">{task.title}</li>
          <li>{task.description}</li>
          <li>{task.situation}</li>
          <button className="edit" onClick={handleEditClick}>
            Editar
          </button>
          <button className="remove" onClick={handleDelete}>
            Excluir
          </button>
        </>
      )}
    </div>
  );
};

export default TaskItem;
