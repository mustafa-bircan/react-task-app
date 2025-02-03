import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TaskList = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const tasks = state?.tasks || []; // Eğer veri varsa, kullan; yoksa boş liste.
  const [tasksList, setTasksList] = useState(tasks);
  const [completedTasks, setCompletedTasks] = useState([]);

  const markAsCompleted = (taskId) => {
    // Tamamlanan görevi tamamlananlar listesine ekle
    const taskToMark = tasksList.find(task => task.id === taskId);
    const updatedTasks = tasksList.filter(task => task.id !== taskId);

    taskToMark.completed = true;

    setCompletedTasks([...completedTasks, taskToMark]);
    setTasksList(updatedTasks);
  };

  return (
    <div>
      <h2>Yapılacaklar Listesi</h2>
      <ul>
        {tasksList.map((task) => (
          <li key={task.id}>
            {task.taskName} - {task.description}
            <button onClick={() => markAsCompleted(task.id)}>Tamamlandı</button>
          </li>
        ))}
      </ul>

      {/* Tamamlananlara Git butonu */}
      <button onClick={() => navigate('/completed-tasks', { state: { completedTasks } })}>
        Tamamlananlara Git
      </button>
    </div>
  );
};

export default TaskList;
