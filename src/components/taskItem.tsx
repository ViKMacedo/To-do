import React from "react";
import { Task } from "./task";

interface TaskItemProps {
  task: Task;
  onTaskDeleted: (taskId: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onTaskDeleted }) => {
  return (
    <div className="task-item">
      <li className="task-title">{task.title}</li>
      <li>{task.description}</li>
      <li>{task.situation}</li>
      <button onClick={() => onTaskDeleted(task.id)}>Excluir</button>
    </div>
  );
};

export default TaskItem;
