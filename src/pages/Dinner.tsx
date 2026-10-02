import { useEffect } from 'react';
import { Link } from 'wouter';
import IhsanMark from '../IhsanMark';
import { dinner } from '../data/dinner';

export default function Dinner() {
  useEffect(() => {
    document.title = `${dinner.title} ${dinner.emphasis} · Ihsan`;
    return () => {
      document.title = 'Ihsan';
    };
  }, []);

  return (
    <main className="ev-page">
      <div className="ev-atmosphere" aria-hidden="true" />
      <div className="ev-rules" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="ev-shell">
        <header className="ev-nav">
          <Link href="/" className="ev-wordmark">
            <IhsanMark size={22} animate={false} />
            <span>Ihsan</span>
          </Link>
        </header>

        <section className="ev-hero">
          <div>
            <h1 className="ev-title ev-reveal">
              {dinner.title}
              <em>{dinner.emphasis}</em>
            </h1>
            <p className="ev-description ev-reveal">{dinner.description}</p>
            <p className="ev-note ev-reveal">{dinner.note}</p>
          </div>
        </section>

        <section className="ev-section">
          <div className="ev-section-label">Details</div>
          <div className="ev-details">
            {dinner.details.map((d) => (
              <article key={d.label}>
                <span className="ev-index">{d.label}</span>
                <h3>{d.value}</h3>
              </article>
            ))}
          </div>
        </section>

        {dinner.attendees.length ? (
          <section className="ev-section">
            <div className="ev-section-label">Attendees</div>
            <ul className="ev-guests">
              {dinner.attendees.map((a) => (
                <li key={a.name}>
                  {a.company ? <strong>{a.company}</strong> : null}
                  <span>
                    {a.linkedin ? (
                      <a href={a.linkedin} target="_blank" rel="noreferrer">
                        {a.name}
                      </a>
                    ) : (
                      a.name
                    )}
                    {a.role ? ` · ${a.role}` : ''}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <footer className="ev-footer">
          <Link href="/" className="ev-wordmark">
            <span>Ihsan</span>
          </Link>
          <span className="ev-powered">Powered by The Network</span>
        </footer>
      </div>

      <style>{`
        .ev-page {
          position: relative;
          min-height: 100svh;
          overflow-x: hidden;
          font-family: var(--font-body);
        }
        .ev-atmosphere {
          position: fixed;
          inset: -25vmax;
          z-index: 0;
          pointer-events: none;
          background:
            radial-gradient(32vmax 32vmax at 72% 15%, hsl(var(--primary) / 0.12), transparent 70%),
            radial-gradient(38vmax 32vmax at 12% 84%, hsl(var(--grid-line) / 0.35), transparent 72%);
        }
        .ev-rules {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          width: min(calc(100% - 3rem), 76rem);
          margin-inline: auto;
        }
        .ev-rules span {
          border-left: 1px solid hsl(var(--rule));
          opacity: .6;
        }
        .ev-shell {
          position: relative;
          z-index: 1;
          width: min(calc(100% - 3rem), 76rem);
          margin-inline: auto;
        }
        .ev-nav {
          padding: 1.5rem clamp(1.25rem, 4vw, 3.5rem) 0;
        }
        .ev-wordmark {
          display: inline-flex;
          align-items: center;
          gap: .6rem;
          color: hsl(var(--primary));
          text-decoration: none;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: .85rem;
          letter-spacing: .14em;
          text-transform: uppercase;
        }
        .ev-wordmark span { color: hsl(var(--foreground)); }
        .ev-section-label,
        .ev-index {
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: .14em;
          font-size: .75rem;
        }
        .ev-hero {
          min-height: min(42rem, 68svh);
          display: grid;
          align-items: end;
          padding: clamp(4rem, 12vh, 8rem) clamp(1.25rem, 4vw, 3.5rem) clamp(4rem, 9vh, 7rem);
          border-bottom: 1px solid hsl(var(--rule));
        }
        .ev-title {
          margin: 0;
          font-family: var(--font-display);
          font-size: clamp(3.6rem, 9vw, 7.8rem);
          font-weight: 400;
          line-height: .9;
          letter-spacing: -.06em;
        }
        .ev-title em {
          display: block;
          color: hsl(var(--primary));
          font-style: normal;
          font-weight: 300;
        }
        .ev-description {
          max-width: 64ch;
          margin: 2.2rem 0 0;
          color: hsl(var(--muted));
          font-weight: 300;
          font-size: clamp(1.05rem, 1.5vw, 1.3rem);
          line-height: 1.55;
        }
        .ev-note {
          margin: 1.4rem 0 0;
          color: hsl(var(--primary));
          font-family: var(--font-mono);
          font-size: .75rem;
          letter-spacing: .14em;
          text-transform: uppercase;
        }
        .ev-section {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 3rem;
          padding: clamp(4rem, 9vw, 7rem) clamp(1.25rem, 4vw, 3.5rem);
          border-bottom: 1px solid hsl(var(--rule));
        }
        .ev-section-label {
          color: hsl(var(--muted));
        }
        .ev-details {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        .ev-details article {
          min-height: 10rem;
          display: flex;
          flex-direction: column;
          padding: 1.35rem;
          border: 1px solid hsl(var(--rule));
          background: hsl(var(--background) / .6);
        }
        .ev-index { color: hsl(var(--primary)); }
        .ev-details h3 {
          margin: auto 0 0;
          font-family: var(--font-display);
          font-size: clamp(1.35rem, 1.9vw, 1.75rem);
          font-weight: 500;
          letter-spacing: -.03em;
          line-height: 1.15;
        }
        .ev-details p {
          margin: 0;
          color: hsl(var(--muted));
          font-size: .95rem;
        }
        .ev-guests {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: .75rem;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .ev-guests li {
          display: flex;
          flex-direction: column;
          gap: .3rem;
          padding: .95rem 1.05rem;
          border: 1px solid hsl(var(--rule));
          background: hsl(var(--background) / .6);
        }
        .ev-guests strong { font-weight: 500; }
        .ev-guests span { color: hsl(var(--muted)); font-size: .85rem; }
        .ev-guests a { text-underline-offset: .16em; }
        .ev-guests a:hover { color: hsl(var(--primary)); }
        .ev-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1.5rem clamp(1.25rem, 4vw, 3.5rem) 2rem;
          color: hsl(var(--muted) / .8);
          font-family: var(--font-mono);
          font-size: .7rem;
          letter-spacing: .06em;
          text-transform: uppercase;
        }
        .ev-powered {
          letter-spacing: .2em;
          color: hsl(var(--primary) / .55);
        }
        .ev-reveal {
          animation: ev-rise .8s cubic-bezier(.22,1,.36,1) both;
        }
        .ev-title { animation-delay: 150ms; }
        .ev-description { animation-delay: 230ms; }
        .ev-note { animation-delay: 310ms; }
        @keyframes ev-rise {
          from { opacity: 0; transform: translateY(1rem); }
        }
        @media (max-width: 720px) {
          .ev-rules { display: none; }
          .ev-shell { width: 100%; }
          .ev-nav { padding-inline: 1rem; }
          .ev-hero {
            min-height: auto;
            display: block;
            padding: 4.5rem 1rem 4rem;
          }
          .ev-section { display: block; padding: 4rem 1rem; }
          .ev-details, .ev-guests { margin-top: 1.5rem; grid-template-columns: 1fr; }
          .ev-details article { min-height: 7rem; }
          .ev-footer { padding-inline: 1rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ev-reveal { animation: none; }
        }
      `}</style>
    </main>
  );
}
