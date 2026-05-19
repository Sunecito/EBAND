import { Navigate } from 'react-router-dom';
import { getSession, getUser } from '../utils/storage';

export default function PrivateRoute({ children }) {
  return getSession() && getUser() ? children : <Navigate to="/login" replace />;
}
