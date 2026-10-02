import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type Node = { x: number; y: number };
type Edge = { a: number; b: number; d: number };

// Small seeded PRNG so the network has the same shape on every visit.
function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

function build(w: number, h: number, hub: Node) {
  const rand = rng(29);
  const count = Math.round(Math.min(56, Math.max(22, (w * h) / 26000)));
  const nodes: Node[] = [hub];
  const minGap = Math.min(w, h) / 9;

  let tries = 0;
  while (nodes.length < count && tries < count * 40) {
    tries++;
    const n = { x: rand() * w, y: rand() * h };
    if (nodes.every((m) => Math.hypot(m.x - n.x, m.y - n.y) > minGap)) nodes.push(n);
  }

  const seen = new Set<string>();
  const edges: Edge[] = [];
  const link = (a: number, b: number) => {
    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
    if (a === b || seen.has(key)) return;
    seen.add(key);
    // d = distance of the edge's near end from the hub, used to stagger the draw outward
    const d = Math.min(
      Math.hypot(nodes[a].x - hub.x, nodes[a].y - hub.y),
      Math.hypot(nodes[b].x - hub.x, nodes[b].y - hub.y),
    );
    edges.push({ a, b, d });
  };

  nodes.forEach((n, i) => {
    nodes
      .map((m, j) => ({ j, dist: Math.hypot(m.x - n.x, m.y - n.y) }))
      .sort((p, q) => p.dist - q.dist)
      .slice(1, i === 0 ? 6 : 3)
      .forEach(({ j }) => link(i, j));
  });

  const maxD = Math.max(...edges.map((e) => e.d), 1);
  return { nodes, edges, maxD };
}

export default function NetworkLayer({ revealed }: { revealed: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number; hub: Node } | null>(null);

  useEffect(() => {
    const el = ref.current!;
    const measure = () => {
      // The network radiates from whatever element is marked as its hub (the Ihsan mark).
      const box = el.getBoundingClientRect();
      const anchor = el.parentElement?.querySelector('[data-network-hub]')?.getBoundingClientRect();
      const hub = anchor
        ? { x: anchor.left + anchor.width / 2 - box.left, y: anchor.top + anchor.height / 2 - box.top }
        : { x: el.clientWidth / 2, y: el.clientHeight * 0.4 };
      setSize({ w: el.clientWidth, h: el.clientHeight, hub });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);

    // Flashlight: the network shows through only around the cursor.
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    window.addEventListener('pointermove', move);
    return () => {
      ro.disconnect();
      window.removeEventListener('pointermove', move);
    };
  }, []);

  const net = useMemo(() => (size ? build(size.w, size.h, size.hub) : null), [size]);

  // A handful of edges carry travelling signals once the network is revealed.
  const pulses = useMemo(() => {
    if (!net) return [];
    const rand = rng(7);
    return Array.from({ length: Math.min(12, net.edges.length) }, () => {
      const e = net.edges[Math.floor(rand() * net.edges.length)];
      const forward = rand() > 0.5;
      return {
        from: net.nodes[forward ? e.a : e.b],
        to: net.nodes[forward ? e.b : e.a],
        delay: 1 + rand() * 2.5,
        duration: 1.6 + rand() * 1.4,
      };
    });
  }, [net]);

  return (
    <div ref={ref} className={`net${revealed ? ' net-revealed' : ''}`} aria-hidden="true">
      {net && size ? (
        <svg width={size.w} height={size.h} viewBox={`0 0 ${size.w} ${size.h}`}>
          {net.edges.map((e, i) => {
            const a = net.nodes[e.a];
            const b = net.nodes[e.b];
            return (
              <motion.line
                key={`${i}-${revealed}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                className="net-edge"
                initial={revealed ? { pathLength: 0 } : false}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, delay: (e.d / net.maxD) * 1.1, ease: [0.25, 1, 0.5, 1] }}
              />
            );
          })}
          {net.nodes.map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r={i === 0 ? 0 : 1.8} className="net-node" />
          ))}
          {revealed
            ? pulses.map((p, i) => (
                <motion.circle
                  key={i}
                  r={2.2}
                  className="net-pulse"
                  initial={{ cx: p.from.x, cy: p.from.y, opacity: 0 }}
                  animate={{ cx: [p.from.x, p.to.x], cy: [p.from.y, p.to.y], opacity: [0, 1, 0] }}
                  transition={{
                    duration: p.duration,
                    delay: p.delay,
                    repeat: Infinity,
                    repeatDelay: 1.5,
                    ease: 'easeInOut',
                  }}
                />
              ))
            : null}
        </svg>
      ) : null}

      <style>{`
        .net {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity .8s ease;
        }
        .net svg { display: block; }
        .net-edge {
          stroke: hsl(var(--primary));
          stroke-width: .7;
          stroke-opacity: .35;
        }
        .net-node { fill: hsl(var(--primary) / .6); }
        .net-pulse { fill: hsl(var(--primary)); }

        @media (hover: hover) and (pointer: fine) {
          .net {
            opacity: 1;
            -webkit-mask-image: radial-gradient(circle 170px at var(--mx, -999px) var(--my, -999px), #000 0%, transparent 100%);
                    mask-image: radial-gradient(circle 170px at var(--mx, -999px) var(--my, -999px), #000 0%, transparent 100%);
          }
        }
        .net.net-revealed {
          opacity: 1;
          -webkit-mask-image: none;
                  mask-image: none;
        }
        .net-revealed .net-edge { stroke-opacity: .28; }

        @media (prefers-reduced-motion: reduce) {
          .net-pulse { display: none; }
        }
      `}</style>
    </div>
  );
}
