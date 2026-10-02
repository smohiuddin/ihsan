import { motion } from 'framer-motion';

// Eight-pointed star — two overlapping squares around a still centre.
// Each square draws on in turn (pathLength), then the centre settles in.
export default function IhsanMark({ size = 36, animate = true }: { size?: number; animate?: boolean }) {
  const squares = [
    { rotate: 0, o: 0.45, delay: 0.35 },
    { rotate: 45, o: 1, delay: 0.7 },
  ];
  const d = 'M14,14 L34,14 L34,34 L14,34 Z';

  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      {squares.map((s, i) => (
        <motion.path
          key={i}
          d={d}
          transform={`rotate(${s.rotate} 24 24)`}
          stroke="currentColor"
          strokeOpacity={s.o}
          strokeWidth={1.1}
          strokeLinejoin="round"
          initial={animate ? { pathLength: 0, opacity: 0 } : false}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: 1.2, delay: s.delay, ease: [0.25, 1, 0.5, 1] },
            opacity: { duration: 0.01, delay: s.delay },
          }}
        />
      ))}
      <motion.circle
        cx={24}
        cy={24}
        r={2}
        fill="currentColor"
        initial={animate ? { scale: 0, opacity: 0 } : false}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: '24px 24px' }}
      />
    </svg>
  );
}
