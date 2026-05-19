import { useEffect, useMemo, useState } from 'react';
import { Minus, Pause, Play, Plus, Timer } from 'lucide-react';

const measures = ['2/4', '3/4', '4/4', '6/8'];

export default function Metronome() {
  const [bpm, setBpm] = useState(90);
  const [playing, setPlaying] = useState(false);
  const [beat, setBeat] = useState(0);
  const [measure, setMeasure] = useState('4/4');
  const beatsPerMeasure = useMemo(() => Number(measure.split('/')[0]), [measure]);

  useEffect(() => {
    if (!playing) return undefined;

    const interval = window.setInterval(() => {
      setBeat((current) => (current + 1) % beatsPerMeasure);
    }, 60000 / bpm);

    return () => window.clearInterval(interval);
  }, [bpm, beatsPerMeasure, playing]);

  function changeBpm(amount) {
    setBpm((current) => Math.min(220, Math.max(40, current + amount)));
  }

  return (
    <div className="page">
      <header className="page-header">
        <span>Práctica de ritmo</span>
        <h1>Metrónomo</h1>
      </header>

      <section className="metro-card">
        <div className={`pulse-orb ${playing ? 'playing' : ''}`} style={{ '--pulse-speed': `${60000 / bpm}ms` }}>
          <Timer size={42} />
        </div>
        <div className="bpm-display">
          <strong>{bpm}</strong>
          <span>BPM</span>
        </div>

        <div className="stepper">
          <button type="button" onClick={() => changeBpm(-5)} aria-label="Bajar BPM">
            <Minus size={21} />
          </button>
          <input
            type="range"
            min="40"
            max="220"
            value={bpm}
            onChange={(event) => setBpm(Number(event.target.value))}
            aria-label="Selector de BPM"
          />
          <button type="button" onClick={() => changeBpm(5)} aria-label="Subir BPM">
            <Plus size={21} />
          </button>
        </div>

        <button className="primary-button play-button" type="button" onClick={() => setPlaying((current) => !current)}>
          {playing ? <Pause size={20} /> : <Play size={20} />} {playing ? 'Pausar' : 'Play'}
        </button>
      </section>

      <section className="measure-card">
        <h2>Compás</h2>
        <div className="segmented">
          {measures.map((item) => (
            <button className={measure === item ? 'selected' : ''} key={item} type="button" onClick={() => { setMeasure(item); setBeat(0); }}>
              {item}
            </button>
          ))}
        </div>
        <div className="beat-dots">
          {Array.from({ length: beatsPerMeasure }).map((_, index) => (
            <span className={playing && beat === index ? 'active' : ''} key={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
