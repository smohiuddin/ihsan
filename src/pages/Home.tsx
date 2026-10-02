import { motion } from 'framer-motion';
import { Link } from 'wouter';
import IhsanMark from '../IhsanMark';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Home() {
  return (
    <div className="home">
      {/* Grid */}
      <div className="home-grid" aria-hidden="true" />

      {/* Centre glow — breathes slowly */}
      <motion.div
        className="home-glow"
        aria-hidden="true"
        animate={{ opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <main className="home-main">
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="home-mark"
        >
          <IhsanMark size={120} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6, ease }}
          className="home-wordmark"
        >
          Ihsan
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 1.75, ease }}
          className="home-rule"
        />

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.85 }}
          className="home-tagline"
        >
          We are Muslim founders trying to strive for excellence in all aspects of our life.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.95 }}
        >
          <Link href="/dinner" className="home-event">
            <span className="home-event-date">10.29</span>
            <span>Series A+ Founders Dinner</span>
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </main>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 2.6 }}
        className="home-network"
      >
        <span>Powered by The Network</span>
        An invisible, decentralized network to systematically identify and connect exceptional
        talent.
      </motion.p>

      <style>{`
        .home {
          position: relative;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .home-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(hsl(var(--grid-line) / 0.28) 0.5px, transparent 0.5px),
            linear-gradient(90deg, hsl(var(--grid-line) / 0.28) 0.5px, transparent 0.5px);
          background-size: 64px 64px;
        }
        .home-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(ellipse 60% 55% at 50% 44%, hsl(var(--glow)) 0%, transparent 70%);
        }
        .home-main {
          position: relative;
          z-index: 1;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.5rem;
          text-align: center;
        }
        .home-mark {
          color: hsl(var(--primary));
          margin-bottom: 1.25rem;
        }
        .home-wordmark {
          margin: 0;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(2rem, 5vw, 4rem);
          line-height: 0.88;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .home-rule {
          margin-top: 0.85rem;
          width: 100%;
          max-width: 260px;
          height: 1px;
          background: hsl(var(--primary) / 0.2);
          transform-origin: center;
        }
        .home-tagline {
          margin: 0.85rem 0 0;
          max-width: 460px;
          font-weight: 300;
          font-size: clamp(0.95rem, 1.6vw, 1.08rem);
          line-height: 1.65;
          letter-spacing: 0.01em;
          color: hsl(var(--foreground) / 0.6);
        }
        .home-event {
          display: inline-flex;
          align-items: center;
          gap: 0.9rem;
          margin-top: 1.6rem;
          padding: 0.7rem 0 0.55rem;
          border-bottom: 1px solid hsl(var(--foreground) / 0.18);
          font-family: var(--font-mono);
          font-weight: 300;
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          color: hsl(var(--foreground) / 0.75);
          transition: color .3s ease, border-color .3s ease;
        }
        .home-event:hover {
          color: hsl(var(--primary));
          border-color: hsl(var(--primary) / 0.5);
        }
        .home-event-date { color: hsl(var(--primary)); }
        .home-network {
          position: relative;
          z-index: 1;
          margin: 0 auto;
          padding: 0 1.5rem 2.25rem;
          max-width: 30rem;
          text-align: center;
          font-weight: 300;
          font-size: 0.88rem;
          line-height: 1.6;
          color: hsl(var(--foreground) / 0.55);
        }
        .home-network span {
          display: block;
          margin-bottom: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: hsl(var(--primary) / 0.85);
        }
      `}</style>
    </div>
  );
}
