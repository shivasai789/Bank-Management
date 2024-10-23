import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import BankAccounts from './components/BankAccount/BankAccounts';
import AdminDashboard from './components/Admin/AdminDashboard';
import ProtectedRoute from './ProtectedRoute'; 
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />

                    {/* Use ProtectedRoute correctly here */}
                    <Route exact path="/bank-accounts" element={<ProtectedRoute element={<BankAccounts />} />} />
                    <Route exact path="/admin" element={<ProtectedRoute element={<AdminDashboard />} />} />

                    <Route exact path="/" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
