import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import AuthLayout from '../components/AuthLayout.jsx';
import { ensureInitialProgress, saveUser, setSession } from '../utils/storage';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    terms: false,
  });
  const [error, setError] = useState('');

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.password || !form.confirm) {
      setError('Completa todos los campos.');
      return;
    }

    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (form.password !== form.confirm) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (!form.terms) {
      setError('Debes aceptar los términos para continuar.');
      return;
    }

    saveUser({ name: form.name.trim(), email: form.email.trim(), password: form.password, createdAt: new Date().toISOString() });
    ensureInitialProgress();
    setSession(form.email.trim());
    navigate('/home');
  }

  return (
    <AuthLayout>
      <h1>Crea tu cuenta</h1>
      <p className="muted">Guarda tu avance localmente para la sustentación del prototipo.</p>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Nombre
          <input value={form.name} onChange={(event) => updateField('name', event.target.value)} />
        </label>
        <label>
          Correo
          <input value={form.email} onChange={(event) => updateField('email', event.target.value)} type="email" />
        </label>
        <label>
          Contraseña
          <input value={form.password} onChange={(event) => updateField('password', event.target.value)} type="password" />
        </label>
        <label>
          Confirmar contraseña
          <input value={form.confirm} onChange={(event) => updateField('confirm', event.target.value)} type="password" />
        </label>
        <label className="check-row">
          <input checked={form.terms} onChange={(event) => updateField('terms', event.target.checked)} type="checkbox" />
          Acepto términos y condiciones del prototipo EBAND
        </label>
        {error && <p className="form-error">{error}</p>}
        <button className="primary-button" type="submit">
          <UserPlus size={18} /> Registrarme
        </button>
      </form>
      <Link className="small-link" to="/login">
        Ya tengo cuenta
      </Link>
    </AuthLayout>
  );
}
