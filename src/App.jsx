import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Welcome from './pages/Welcome.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import Lessons from './pages/Lessons.jsx';
import Tuner from './pages/Tuner.jsx';
import Metronome from './pages/Metronome.jsx';
import Progress from './pages/Progress.jsx';
import Profile from './pages/Profile.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route
        element={
          <PrivateRoute>
            <AppLayout />
          </PrivateRoute>
        }
      >
        <Route path="/home" element={<Home />} />
        <Route path="/lecciones" element={<Lessons />} />
        <Route path="/afinador" element={<Tuner />} />
        <Route path="/metronomo" element={<Metronome />} />
        <Route path="/progreso" element={<Progress />} />
        <Route path="/perfil" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
