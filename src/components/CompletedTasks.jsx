import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CompletedTasks = () => {
  const { state } = useLocation();
  const completedTasks = state?.completedTasks || [];
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div>
      <h2>Tamamlananlar Listesi</h2>
      <ul>
        {completedTasks.map((task) => (
          <li key={task.id}>
            {task.taskName} - {task.description}
          </li>
        ))}
      </ul>
      <button onClick={handleBackToDashboard}>Dashboard'a Dön</button>
    </div>
  );
};

export default CompletedTasks;
