import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
    const token = localStorage.getItem("token");

    // If there is no token, redirect to login
    if (!token) {
        return <Navigate to="/login" />;
    }

    // Return the element to render
    return element;
};

export default ProtectedRoute;
