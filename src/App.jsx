// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import TaskList from './components/TaskList';
import CompletedTasks from './components/CompletedTasks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/completed-tasks" element={<CompletedTasks />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
