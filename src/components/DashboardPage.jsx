import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './DashboardPage.css'; // CSS dosyasını ekledik

const DashboardPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isValid }, reset, watch } = useForm({
    mode: 'onChange',
  });

  const [tasks, setTasks] = useState([
    { id: 1, taskName: 'Görev 1', description: 'Açıklama 1', completed: false },
    { id: 2, taskName: 'Görev 2', description: 'Açıklama 2', completed: true },
  ]);
  const [completedTasks, setCompletedTasks] = useState([
    { id: 3, taskName: 'Görev 3', description: 'Açıklama 3', completed: true },
    { id: 4, taskName: 'Görev 4', description: 'Açıklama 4', completed: true },
  ]);
  const [employees, setEmployees] = useState(['Ali', 'Ayşe', 'Mehmet']);
  const [newPersonel, setNewPersonel] = useState('');
  const [assignedPersonnels, setAssignedPersonnels] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const taskName = watch("taskName");
  const description = watch("description");

  const addTask = (data) => {
    const newTask = { ...data, id: tasks.length + 1, completed: false };
    setTasks([newTask, ...tasks]);
    reset(); 
    setAssignedPersonnels([]);
    setErrorMessage('');
    toast.success('Görev ekleme başarılı!');
  };

  const handleCheckboxChange = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      if (assignedPersonnels.length < 3) {
        setAssignedPersonnels([...assignedPersonnels, value]);
        setErrorMessage('');
      } else {
        setErrorMessage('En fazla 3 kişi seçebilirsiniz');
      }
    } else {
      setAssignedPersonnels(assignedPersonnels.filter(item => item !== value));
      setErrorMessage('');
    }
  };

  const isFormValid = isValid && assignedPersonnels.length >= 1 && assignedPersonnels.length <= 3 && !errorMessage;

  const handleNewPersonel = () => {
    if (newPersonel && !employees.includes(newPersonel)) {
      setEmployees([...employees, newPersonel]);
      setNewPersonel('');
    }
  };

  const handleCompleteTask = (taskId) => {
    const taskToComplete = tasks.find(task => task.id === taskId);
    setCompletedTasks([taskToComplete, ...completedTasks]);
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  useEffect(() => {
    if (isValid) {
      setErrorMessage('');
    }
  }, [taskName, description, assignedPersonnels]);

  const isTasksEmpty = tasks.length === 0;

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Admin Paneli</h2>

      <form onSubmit={handleSubmit(addTask)} className="task-form">
        <div className="form-group">
          <label>Görev Adı</label>
          <input
            type="text"
            {...register('taskName', {
              required: 'Görev adı gerekli',
              minLength: { value: 3, message: 'En az 3 karakter olmalı' },
            })}
          />
          {errors.taskName && <p className="error-message">{errors.taskName.message}</p>}
        </div>

        <div className="form-group">
          <label>Açıklama</label>
          <input
            type="text"
            {...register('description', {
              required: 'Açıklama gerekli',
              minLength: { value: 10, message: 'En az 10 karakter olmalı' },
            })}
          />
          {errors.description && <p className="error-message">{errors.description.message}</p>}
        </div>

        <div className="form-group">
          <label>Atanacak Personel</label>
          <div className="checkbox-group">
            {employees.map((employee, index) => (
              <label key={index} className="checkbox-label">
                <input type="checkbox" value={employee} onChange={handleCheckboxChange} />
                {employee}
              </label>
            ))}
          </div>
          {assignedPersonnels.length === 0 && <p className="error-message">Lütfen en az bir kişi seçin</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>

        <button type="submit" disabled={!isFormValid} className="submit-button">Görev Ekle</button>
      </form>

      <div className="personel-container">
        <h3>Yeni Personel Ekle</h3>
        <input
          type="text"
          value={newPersonel}
          onChange={(e) => setNewPersonel(e.target.value)}
          placeholder="Yeni personel adı"
          className="input-field"
        />
        <button onClick={handleNewPersonel} className="add-button">Ekle</button>
      </div>

      {!isTasksEmpty && (
        <div className="tasks-container">
          <h3>Yapılacaklar (Görevler)</h3>
          <ul className="task-list">
            {tasks.map(task => (
              <li key={task.id} className="task-item">
                {task.taskName} - {task.description}
                <button onClick={() => handleCompleteTask(task.id)} className="complete-button">Tamamlandı</button>
              </li>
            ))}
          </ul>
          <button onClick={() => navigate('/tasks', { state: { tasks } })} className="view-button">Tamamını Gör</button>
        </div>
      )}

      <div className="completed-container">
        <h3>Tamamlananlar</h3>
        <ul className="completed-list">
          {completedTasks.map(task => (
            <li key={task.id} className="completed-item">{task.taskName} - {task.description}</li>
          ))}
        </ul>
        <button onClick={() => navigate('/completed-tasks', { state: { completedTasks } })} className="view-button">Tamamını Gör</button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default DashboardPage;
