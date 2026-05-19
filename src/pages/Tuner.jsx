import { useState } from 'react';
import { Radio, SlidersHorizontal, Waves } from 'lucide-react';
import { addTuningRecord, getProgress } from '../utils/storage';

const strings = [
  { note: 'E', hz: 82.4 },
  { note: 'A', hz: 110 },
  { note: 'D', hz: 146.8 },
  { note: 'G', hz: 196 },
  { note: 'B', hz: 246.9 },
  { note: 'E', hz: 329.6 },
];

const states = ['Muy baja', 'Afinada', 'Muy alta'];

export default function Tuner() {
  const [detected, setDetected] = useState({ note: 'E', hz: 82.4, state: 'Afinada', cents: 0 });
  const [listening, setListening] = useState(false);
  const [history, setHistory] = useState(getProgress().tuningHistory);

  function simulateTuning() {
    setListening(true);
    window.setTimeout(() => {
      const base = strings[Math.floor(Math.random() * strings.length)];
      const state = states[Math.floor(Math.random() * states.length)];
      const cents = state === 'Afinada' ? Math.floor(Math.random() * 5) - 2 : Math.floor(Math.random() * 26 + 12) * (state === 'Muy baja' ? -1 : 1);
      const hz = Number((base.hz + cents * 0.18).toFixed(1));
      const record = { ...base, hz, state, cents, time: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }) };
      setDetected(record);
      setHistory(addTuningRecord(record).tuningHistory);
      setListening(false);
    }, 850);
  }

  return (
    <div className="page">
      <header className="page-header">
        <span>Simulación dinámica</span>
        <h1>Afinador</h1>
      </header>

      <section className="tuner-card">
        <div className={`tuner-meter ${detected.state === 'Afinada' ? 'in-tune' : ''}`}>
          <span>-50</span>
          <div className="needle" style={{ transform: `rotate(${detected.cents * 1.7}deg)` }} />
          <span>+50</span>
        </div>
        <div className="detected-note">
          <strong>{detected.note}</strong>
          <span>{detected.hz} Hz</span>
        </div>
        <p className={`tuner-state ${detected.state === 'Afinada' ? 'ok' : ''}`}>{listening ? 'Escuchando...' : detected.state}</p>
        <button className="primary-button" type="button" onClick={simulateTuning} disabled={listening}>
          {listening ? <Waves size={18} /> : <Radio size={18} />} Escuchar
        </button>
      </section>

      <section className="history-card">
        <h2>
          <SlidersHorizontal size={19} /> Historial reciente
        </h2>
        {history.length === 0 ? (
          <p className="muted">Aún no hay afinaciones simuladas.</p>
        ) : (
          history.map((item, index) => (
            <div className="history-row" key={`${item.time}-${index}`}>
              <span>{item.note}</span>
              <strong>{item.state}</strong>
              <small>{item.hz} Hz · {item.time}</small>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
