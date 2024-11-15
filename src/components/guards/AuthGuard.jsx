// import { Navigate } from 'react-router-dom';

// const AuthGuard = ({ children, allowedRole }) => {
//     const token = localStorage.getItem('token');
//     const userRole = localStorage.getItem('role');

//     if (!token) {
//         return <Navigate to="/login" replace />;
//     }

//     if (allowedRole && userRole !== allowedRole) {
//         return <Navigate to="/" replace />;
//     }

//     return children;
// };

// export default AuthGuard; 

import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem("token"); // Check for token in local storage

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default AuthGuard;