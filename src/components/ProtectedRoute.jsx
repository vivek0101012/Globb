import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // Use replace to prevent navigation history issues
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;