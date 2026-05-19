import { Link } from 'react-router-dom';
import { Mail, Music, Play } from 'lucide-react';
import AuthLayout from '../components/AuthLayout.jsx';

export default function Welcome() {
  return (
    <AuthLayout>
      <div className="welcome-hero">
        <div className="vinyl">
          <Music size={54} />
        </div>
        <h1>Aprende guitarra desde tu primer ritmo</h1>
        <p>Aprende. Practica. Mejora. Todo en un solo lugar.</p>
      </div>

      <div className="button-stack">
        <Link className="primary-button" to="/login">
          <Play size={18} /> Iniciar sesión
        </Link>
        <Link className="secondary-button" to="/registro">
          Registrarse
        </Link>
      </div>

      <div className="social-login" aria-label="Opciones visuales de login social">
        <button type="button">G</button>
        <button type="button">f</button>
        <button type="button">
          <Mail size={19} />
        </button>
      </div>
    </AuthLayout>
  );
}
