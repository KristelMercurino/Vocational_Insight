import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import RecuperarContraseña from './RecuperarContraseña';
import ResetPassword from './ResetPassword';  // Importa la vista de restablecimiento de contraseña

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recuperar-contraseña" element={<RecuperarContraseña />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} /> {/* Ruta para restablecer contraseña */}
        <Route path="/" element={<Login />} /> {/* Redirigir al login por defecto */}
      </Routes>
    </Router>
  </React.StrictMode>
);
