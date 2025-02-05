import React from 'react';
interface TodoType {
  id: number; 
  text: string;
  category: string;
  isComplete: boolean;
}
interface TodoProps {
  todo: TodoType;
}
const todoList: React.FC<TodoProps> = ({ todo }) => {
  return (
    <div className="todo">
            <div className="content">
              <p>{todo.text}</p>
              <p className="category">({todo.category})</p>
            </div>
            <div>
              <button className='complete'>Completar</button>
              <button className='remove'>Excluir</button>
            </div>
          </div>
  )
}

export default todoList