import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

interface Props {
  children: React.ReactNode;
  role?: string;
}

const ProtectedRoute = ({ children, role }: Props) => {
  const { user, token } = useAuth();

  if (!token) return <Navigate to="/" replace />;
  if (!user) return <LoadingSpinner />;

  if (role && user.role !== role) {
    const redirectTo = user.role === 'super_admin' ? '/admin' : '/user';
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;