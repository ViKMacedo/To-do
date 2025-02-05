import React from 'react';
interface Todo {
  id: number; 
  text: string;
  category: string;
  isComplete: boolean;
}
interface TodoListProps {
  todo: Todo;
  removeTodo: (id: number) => void;
  completeTodo: (id: number) => void;
}

const todoList: React.FC<TodoListProps> = ({todo, removeTodo, completeTodo} ) => {
  return (
    <div className="todo" style={{textDecoration: todo.isComplete ? "line-through" : "" }}>
            <div className="content">
              <p>{todo.text}</p>
              <p className="category">({todo.category})</p>
            </div>
            <div>
              <button className='complete'onClick={() => completeTodo(todo.id)}>Completar</button>
              <button className='remove' onClick={() => removeTodo(todo.id)}>Excluir</button>
            </div>
          </div>
  )
}

export default todoList