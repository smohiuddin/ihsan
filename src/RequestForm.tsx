import { useState } from 'react';

const ENDPOINT = 'https://formspree.io/f/mqparzbj';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function RequestForm({ event }: { event: string }) {
  const [status, setStatus] = useState<Status>('idle');

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const data = new FormData(e.currentTarget);
    data.append('event', event);
    data.append('_subject', `Request to attend: ${event}`);
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="rf-done" role="status">
        <p className="rf-done-title">Thank you.</p>
        <p>We review every request and will be in touch by email.</p>
      </div>
    );
  }

  return (
    <form className="rf" onSubmit={submit}>
      <label>
        <span>Name</span>
        <input name="name" autoComplete="name" required />
      </label>
      <label>
        <span>Email</span>
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        <span>Company</span>
        <input name="company" autoComplete="organization" required />
      </label>
      <label>
        <span>Role</span>
        <input name="role" autoComplete="organization-title" required />
      </label>
      <label>
        <span>Latest round</span>
        <select name="round" required defaultValue="">
          <option value="" disabled>
            Select
          </option>
          <option>Series A</option>
          <option>Series B</option>
          <option>Series C+</option>
        </select>
      </label>
      <label>
        <span>LinkedIn</span>
        <input name="linkedin" type="url" inputMode="url" placeholder="https://linkedin.com/in/" required />
      </label>
      {/* Honeypot: hidden from people, filled by bots, ignored by Formspree. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="rf-trap" aria-hidden="true" />

      <div className="rf-actions">
        <button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Request to attend'}
        </button>
        {status === 'error' ? (
          <p className="rf-error" role="alert">
            Something went wrong. Please try again.
          </p>
        ) : null}
      </div>

      <style>{`
        .rf {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.6rem 1.5rem;
        }
        .rf label {
          display: flex;
          flex-direction: column;
          gap: .45rem;
          min-width: 0;
        }
        .rf label > span {
          color: hsl(var(--primary));
          font-family: var(--font-mono);
          font-size: .7rem;
          letter-spacing: .14em;
          text-transform: uppercase;
        }
        .rf input,
        .rf select {
          width: 100%;
          padding: .55rem 0 .6rem;
          border: 0;
          border-bottom: 1px solid hsl(var(--foreground) / .22);
          border-radius: 0;
          background: transparent;
          color: hsl(var(--foreground));
          font: 300 1.05rem var(--font-body);
          outline: none;
          transition: border-color .3s ease;
          -webkit-appearance: none;
                  appearance: none;
        }
        .rf select {
          cursor: pointer;
          background-image: linear-gradient(45deg, transparent 50%, hsl(var(--muted)) 50%),
                            linear-gradient(-45deg, transparent 50%, hsl(var(--muted)) 50%);
          background-size: 5px 5px;
          background-position: calc(100% - 7px) 55%, calc(100% - 2px) 55%;
          background-repeat: no-repeat;
        }
        .rf select:invalid { color: hsl(var(--foreground) / .4); }
        .rf option { color: #111; }
        .rf input::placeholder { color: hsl(var(--foreground) / .3); }
        .rf input:focus,
        .rf select:focus { border-bottom-color: hsl(var(--primary) / .7); }
        .rf-trap {
          position: absolute !important;
          left: -9999px;
          width: 1px;
          height: 1px;
          opacity: 0;
        }
        .rf-actions {
          grid-column: 1 / -1;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem 1.5rem;
          margin-top: .6rem;
        }
        .rf button {
          padding: .95rem 1.6rem;
          border: 1px solid hsl(var(--primary) / .6);
          background: hsl(var(--primary) / .08);
          color: hsl(var(--primary));
          font-family: var(--font-mono);
          font-size: .72rem;
          letter-spacing: .18em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background .3s ease, color .3s ease;
        }
        .rf button:hover:not(:disabled) {
          background: hsl(var(--primary));
          color: hsl(var(--background));
        }
        .rf button:disabled { opacity: .5; cursor: default; }
        .rf-error {
          margin: 0;
          color: hsl(8 70% 66%);
          font-size: .9rem;
        }
        .rf-done {
          padding: 1.5rem 0;
          color: hsl(var(--muted));
          font-size: 1rem;
          line-height: 1.6;
        }
        .rf-done p { margin: 0; }
        .rf-done-title {
          margin-bottom: .4rem !important;
          color: hsl(var(--foreground));
          font-family: var(--font-display);
          font-weight: 300;
          font-size: 2rem;
        }
        @media (max-width: 720px) {
          .rf { grid-template-columns: 1fr; gap: 1.4rem; margin-top: 2rem; }
          .rf-done { margin-top: 1rem; }
          .rf input, .rf select { font-size: 16px; } /* stops iOS zooming on focus */
          .rf button { width: 100%; }
        }
      `}</style>
    </form>
  );
}
