import React from 'react';
import './styles/App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from "./pages/AuthLayout";
import Login from "./components/Login";
import Authenticate from "./components/Authenticate";
import ResetPassword from "./components/ResetPassword";
import ContentLayout from "./pages/ContentLayout";
import Profile from "./components/Profile";
import Tickets from "./components/Tickets";
import Drive from "./components/Drive";
import Members from "./components/Members";
import Resources from "./components/Resources";
import NotFound from "./components/NotFound";

function App() {
  const user = localStorage.getItem("user");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/" element={<Navigate to={user ? "/profile" : "/login"} replace />}/> 
          <Route path="/login" element={<Login />} /> 
          <Route path="/code" element={<Authenticate />} />
          <Route path="/reset" element={<ResetPassword />} />
        </Route>
        <Route element={<ContentLayout />}>
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/drive" element={<Drive />} />
          <Route path="/members" element={<Members />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
