import Logo from './Logo.jsx';

export default function AuthLayout({ children }) {
  return (
    <main className="app-shell auth-shell">
      <section className="auth-card">
        <div className="auth-guitar" aria-hidden="true" />
        <div className="auth-soundwave" aria-hidden="true" />
        <Logo />
        {children}
      </section>
    </main>
  );
}
