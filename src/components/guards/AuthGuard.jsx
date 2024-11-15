import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children, allowedRole }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRole && userRole !== allowedRole) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AuthGuard; 