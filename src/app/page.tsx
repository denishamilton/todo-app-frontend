// pages/index.tsx

'use client'; // Указывает, что этот компонент является клиентским компонентом

import { useEffect, useState, ChangeEvent } from 'react'; // Импортируем необходимые хуки из React
import { getTasks, addTask, updateTask, deleteTask, Task } from '../app/lib/api'; // Импортируем API функции и тип Task

const Home = () => {
  // Инициализируем состояние для хранения задач и новой задачи
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  // Хук useEffect вызывается при монтировании компонента для загрузки задач
  useEffect(() => {
    fetchTasks();
  }, []);

  // Функция для получения задач с сервера и обновления состояния
  const fetchTasks = async () => {
    const tasks = await getTasks(); // Получаем задачи с сервера
    setTasks(tasks); // Обновляем состояние
  };

  // Функция для добавления новой задачи
  const handleAddTask = async () => {
    if (newTask.trim() === '') return; // Проверяем, что строка не пустая
    await addTask({ title: newTask, isCompleted: false }); // Добавляем новую задачу на сервер
    setNewTask(''); // Очищаем поле ввода
    fetchTasks(); // Обновляем список задач
  };

  // Функция для отметки задачи как выполненной
  const handleCompleteTask = async (id: number) => {
    const task = tasks.find(task => task.id === id); // Находим задачу по id
    if (task) {
      await updateTask(id, { isCompleted: true }); // Обновляем задачу на сервере
      fetchTasks(); // Обновляем список задач
    }
  };

  // Функция для удаления задачи
  const handleDeleteTask = async (id: number) => {
    await deleteTask(id); // Удаляем задачу на сервере
    fetchTasks(); // Обновляем список задач
  };

  // Функция для обновления состояния при вводе текста в поле новой задачи
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value); // Обновляем состояние
  };

  // Рендерим компоненты на странице
  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        value={newTask} // Значение поля ввода берется из состояния newTask
        onChange={handleChange} // Вызываем handleChange при изменении текста в поле
        placeholder="Add a new task" // Placeholder для поля ввода
      />
      <button onClick={handleAddTask}>Add Task</button> {/* Кнопка для добавления новой задачи */}
      <ul>
        {tasks.map((task) => ( // Проходим по списку задач и рендерим каждую задачу
          <li key={task.id}>
            <span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
              {task.title} {/* Название задачи */}
            </span>
            {!task.isCompleted && ( // Кнопка "Complete" отображается только для невыполненных задач
              <button onClick={() => handleCompleteTask(task.id)}>Complete</button>
            )}
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button> {/* Кнопка для удаления задачи */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home; // Экспортируем компонент Home по умолчанию
