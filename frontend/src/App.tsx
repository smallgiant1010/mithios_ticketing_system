import React from 'react';
import './styles/App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from "./components/AuthLayout";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/" element={<Navigate to="/login" replace />}/> 
          <Route path="/login" element={<Login />} /> 
{/*          <Route path="/code" element={<Authenticate />} /> */}
{/*          <Route path="/reset" element={<ResetPassword />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
