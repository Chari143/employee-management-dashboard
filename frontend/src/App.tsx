import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import type { Employee } from './types';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const API_URL = 'http://localhost:5000/api';

function App() {
  // auth state
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('username') || '';
  });

  // employee state
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  // save auth to localStorage
  useEffect(() => {
    localStorage.setItem('isLoggedIn', String(isLoggedIn));
    localStorage.setItem('username', username);
  }, [isLoggedIn, username]);

  // fetch employees from backend
  useEffect(() => {
    if (isLoggedIn) {
      fetchEmployees();
    }
  }, [isLoggedIn]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/employees`);
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error('Failed to fetch employees:', err);
    } finally {
      setLoading(false);
    }
  };

  const login = (user: string, pass: string) => {
    if (user && pass) {
      setIsLoggedIn(true);
      setUsername(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setEmployees([]);
  };

  const addEmployee = async (data: Omit<Employee, 'id'>) => {
    try {
      const res = await fetch(`${API_URL}/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const newEmp = await res.json();
      setEmployees([...employees, newEmp]);
    } catch (err) {
      console.error('Failed to add employee:', err);
    }
  };

  const updateEmployee = async (id: string, data: Partial<Employee>) => {
    try {
      const res = await fetch(`${API_URL}/employees/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const updated = await res.json();
      setEmployees(employees.map(emp => emp.id === id ? updated : emp));
    } catch (err) {
      console.error('Failed to update employee:', err);
    }
  };

  const deleteEmployee = async (id: string) => {
    try {
      await fetch(`${API_URL}/employees/${id}`, { method: 'DELETE' });
      setEmployees(employees.filter(emp => emp.id !== id));
    } catch (err) {
      console.error('Failed to delete employee:', err);
    }
  };

  const toggleStatus = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/employees/${id}/toggle`, { method: 'PATCH' });
      const updated = await res.json();
      setEmployees(employees.map(emp => emp.id === id ? updated : emp));
    } catch (err) {
      console.error('Failed to toggle status:', err);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login onLogin={login} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Dashboard
                username={username}
                onLogout={logout}
                employees={employees}
                loading={loading}
                onAddEmployee={addEmployee}
                onUpdateEmployee={updateEmployee}
                onDeleteEmployee={deleteEmployee}
                onToggleStatus={toggleStatus}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
