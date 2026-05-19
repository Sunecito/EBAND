import Logo from './Logo.jsx';

export default function AuthLayout({ children }) {
  return (
    <main className="app-shell auth-shell">
      <section className="auth-card">
        <Logo />
        {children}
      </section>
    </main>
  );
}
