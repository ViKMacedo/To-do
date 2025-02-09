import "./styles/App.css";
import TaskList from "./components/TaskList";
import AddTask from "./components/addTask";
import { useState } from "react";
import { Task } from "./components/task";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleTaskCreated = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="app">
      <AddTask onTaskCreated={handleTaskCreated} />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
