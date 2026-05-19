import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import AuthLayout from '../components/AuthLayout.jsx';
import { ensureInitialProgress, getUser, saveProgress, saveUser, setSession, getProgress } from '../utils/storage';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: 'demo@eband.com', password: '123456' });
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    let user = getUser();

    if (!form.email || !form.password) {
      setError('Ingresa correo y contraseña.');
      return;
    }

    if (!user && form.email === 'demo@eband.com' && form.password === '123456') {
      user = { name: 'Estudiante EBAND', email: form.email, password: form.password, createdAt: new Date().toISOString() };
      saveUser(user);
    }

    if (!user || user.email !== form.email || user.password !== form.password) {
      setError('Usuario no encontrado. Puedes registrarte o usar demo@eband.com / 123456.');
      return;
    }

    ensureInitialProgress();
    saveProgress({ ...getProgress(), achievements: Array.from(new Set([...getProgress().achievements, 'first-login'])) });
    setSession(user.email);
    navigate('/home');
  }

  return (
    <AuthLayout>
      <h1>Bienvenido de nuevo</h1>
      <p className="muted">Continúa practicando con tu ruta inicial de guitarra.</p>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Correo
          <input value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} type="email" />
        </label>
        <label>
          Contraseña
          <input
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            type="password"
          />
        </label>
        {error && <p className="form-error">{error}</p>}
        <button className="primary-button" type="submit">
          <LogIn size={18} /> Iniciar sesión
        </button>
      </form>
      <Link className="small-link" to="/registro">
        ¿Olvidaste tu contraseña? Crea o recupera tu acceso de prueba
      </Link>
    </AuthLayout>
  );
}
