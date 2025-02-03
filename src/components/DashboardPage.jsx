import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Toast importu
import 'react-toastify/dist/ReactToastify.css'; // CSS

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
    reset(); // Formu sıfırlıyoruz

    // Form sıfırlanırsa, checkbox ve hata mesajlarını temizliyoruz
    setAssignedPersonnels([]);
    setErrorMessage('');

    toast.success('Görev Eklemen Başarılı Şekilde Gerçekleşmiştir!');
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

    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    if (isValid) {
      setErrorMessage('');  // Hata mesajlarını temizle
    }
  }, [taskName, description, assignedPersonnels]);

  // Yapılacaklar kısmı boş mu kontrolü
  const isTasksEmpty = tasks.length === 0;

  return (
    <div>
      <h2>Admin Paneli</h2>
      <form onSubmit={handleSubmit(addTask)}>
        <div>
          <label>Görev Adı</label>
          <input
            type="text"
            {...register('taskName', {
              required: 'Görev adı gerekli',
              minLength: {
                value: 3,
                message: 'Görev adı en az 3 karakter olmalı',
              },
            })}
          />
          {errors.taskName && <p>{errors.taskName.message}</p>}
        </div>

        <div>
          <label>Açıklama</label>
          <input
            type="text"
            {...register('description', {
              required: 'Açıklama gerekli',
              minLength: {
                value: 10,
                message: 'Açıklama en az 10 karakter olmalı',
              },
            })}
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>

        <div>
          <label>Atanacak Personel</label>
          <div>
            {employees.map((employee, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  value={employee}
                  onChange={handleCheckboxChange}
                />
                {employee}
              </label>
            ))}
          </div>
          {assignedPersonnels.length === 0 && <p>Lütfen en az bir kişi seçin</p>}
          {errorMessage && <p>{errorMessage}</p>}
        </div>

        <div>
          <button type="submit" disabled={!isFormValid}>Görev Ekle</button>
        </div>
      </form>

      <div>
        <h3>Yeni Personel Ekle</h3>
        <input
          type="text"
          value={newPersonel}
          onChange={(e) => setNewPersonel(e.target.value)}
          placeholder="Yeni personel adı"
        />
        <button onClick={handleNewPersonel}>Ekle</button>
      </div>

      {/* Yapılacaklar kısmı boşsa görünmesin */}
      {!isTasksEmpty && (
        <div>
          <h3>Yapılacaklar (Görevler)</h3>
          <ul>
            {tasks.map(task => (
              <li key={task.id}>
                {task.taskName} - {task.description}
                <button onClick={() => handleCompleteTask(task.id)}>Tamamlandı</button>
              </li>
            ))}
          </ul>
          <button onClick={() => navigate('/tasks', { state: { tasks } })}>Tamamını Gör</button>
        </div>
      )}

      <div>
        <h3>Tamamlananlar</h3>
        <ul>
          {completedTasks.map(task => (
            <li key={task.id}>
              {task.taskName} - {task.description}
            </li>
          ))}
        </ul>
        <button onClick={() => navigate('/completed-tasks', { state: { completedTasks } })}>Tamamını Gör</button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default DashboardPage;
