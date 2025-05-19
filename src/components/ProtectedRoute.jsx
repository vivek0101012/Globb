import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './loader'; // Import your loader component

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />; // Show loading state while checking auth
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;