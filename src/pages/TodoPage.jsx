import viteLogo from './watermelon.svg';
import background from './watermelon2.svg'; 
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 


function TodoPage() {
  const [todos, setTodos] = useState([
    { id: 1, title: 'Съесть арбуз', completed: false },
    { id: 2, title: 'Выгулять кошку', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo) return;
    const newTodoItem = {
      id: Date.now(),
      title: newTodo,
      completed: false,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'incomplete') return !todo.completed;
    return true; 
  });

  return (
    <div>
      <h1>
        Мой список дел
        <img src={viteLogo} alt="Logo" style={{ width: '40px', marginLeft: '10px', marginTop: '10px' }} />
      </h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Добавить новую задачу..."
        />
        <button type="submit">Добавить</button>
      </form>
      <div className="task">
        <label htmlFor="filter">Фильтр задач: </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Все</option>
          <option value="completed">Выполненные</option>
          <option value="incomplete">Невыполненные</option>
        </select>
      </div>
      <div className="background">
        <img src={background} alt="background" />
      </div>
      <div className="todo-list-container">
        {filteredTodos.map((todo) => (
          <div key={todo.id} className="todo-item">
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)} className="delete-button">
              Удалить
            </button>
          </div>
        ))}
      </div>
      <div className="navigation">
        <Link to="/dnd" className="nav-button">Dnd страница</Link> 
      </div>
    </div>
  );
}

export default TodoPage;