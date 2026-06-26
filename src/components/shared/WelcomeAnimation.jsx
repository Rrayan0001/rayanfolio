import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// ---------------------------------------------------------------------------
// Particles
// ---------------------------------------------------------------------------
const PARTICLE_COUNT = 16;
const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: Math.random() * 2 + 1,
  opacity: Math.random() * 0.15 + 0.1,
  duration: Math.random() * 4 + 3,
  delay: Math.random() * 2,
}));

// ---------------------------------------------------------------------------
// TypewriterLine
// ---------------------------------------------------------------------------
function TypewriterLine({ prefix, value, delay, onDone }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const tick = setInterval(() => {
      i++;
      setDisplayed(value.slice(0, i));
      if (i >= value.length) {
        clearInterval(tick);
        onDone?.();
      }
    }, 12);
    return () => clearInterval(tick);
  }, [started, value, onDone]);

  if (!started) return null;

  return (
    <div className="flex items-center gap-1 leading-relaxed">
      <span style={{ color: "#a1a1aa", fontFamily: "Inconsolata, monospace", fontSize: "clamp(14px, 2vw, 18px)" }}>
        {prefix}
      </span>
      <span style={{ color: "#f97316", fontFamily: "Inconsolata, monospace", fontSize: "clamp(14px, 2vw, 18px)" }}>
        {displayed}
      </span>
      {displayed.length < value.length && (
        <span style={{ color: "#f97316", animation: "blink 0.7s step-end infinite" }}>|</span>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// WelcomeAnimation
// ---------------------------------------------------------------------------
export default function WelcomeAnimation({ onComplete }) {
  const shouldReduce = useReducedMotion();
  const [phase, setPhase] = useState(1);
  const [line1Done, setLine1Done] = useState(false);
  const [line2Done, setLine2Done] = useState(false);
  const [line3Done, setLine3Done] = useState(false);
  const [nameColorIndex, setNameColorIndex] = useState(-1);
  const nameLetters = ["R", "A", "Y", "A", "N"];
  const exitTimer = useRef(null);

  // Reduced motion: skip straight to done
  useEffect(() => {
    if (shouldReduce) {
      onComplete();
    }
  }, [shouldReduce, onComplete]);

  // Phase 1 → 2
  useEffect(() => {
    const t = setTimeout(() => setPhase(2), 250);
    return () => clearTimeout(t);
  }, []);

  // Phase 2 → 3 after all lines done
  useEffect(() => {
    if (line3Done) {
      const t = setTimeout(() => setPhase(3), 150);
      return () => clearTimeout(t);
    }
  }, [line3Done]);

  // Phase 3: stagger letter colorization
  useEffect(() => {
    if (phase !== 3) return;
    nameLetters.forEach((_, i) => {
      const t = setTimeout(() => setNameColorIndex(i), 280 + i * 50);
      return () => clearTimeout(t);
    });
    const to3 = setTimeout(() => setPhase(4), 450);
    return () => clearTimeout(to3);
  }, [phase]);

  // Phase 4 → 5
  useEffect(() => {
    if (phase !== 4) return;
    const t = setTimeout(() => setPhase(5), 320);
    return () => clearTimeout(t);
  }, [phase]);

  // Phase 5: fire onComplete after exit anim
  useEffect(() => {
    if (phase !== 5) return;
    exitTimer.current = setTimeout(onComplete, 380);
    return () => {
      if (exitTimer.current) clearTimeout(exitTimer.current);
    };
  }, [phase, onComplete]);

  if (shouldReduce) return null;

  const showTerminal = phase === 2;
  const showName = phase === 3 || phase === 4 || phase === 5;
  const showParticles = phase === 2 || phase === 3 || phase === 4;

  return (
    <motion.div
      key="welcome"
      initial={{ opacity: 1 }}
      animate={phase === 5 ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#09090A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Keyframe styles */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes pulse-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      {/* Particles */}
      {showParticles &&
        particles.map((p) => (
          <motion.div
            key={p.id}
            style={{
              position: "absolute",
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: "#f97316",
              opacity: p.opacity,
            }}
            animate={{ y: -window.innerHeight * 1.1 }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
          />
        ))}

      {/* Scan line */}
      {showTerminal && (
        <motion.div
          initial={{ top: 0, opacity: 0.4 }}
          animate={{ top: "100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: "linear", delay: 0.05 }}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: 1,
            backgroundColor: "#f97316",
          }}
        />
      )}

      {/* Phase 1 — blinking cursor */}
      {phase === 1 && (
        <span
          style={{
            fontFamily: "Inconsolata, monospace",
            fontSize: 32,
            color: "#f97316",
            animation: "pulse-cursor 0.7s step-end infinite",
          }}
        >
          |
        </span>
      )}

      {/* Phase 2 — terminal */}
      <AnimatePresence>
        {showTerminal && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.3 }}
            style={{ display: "flex", flexDirection: "column", gap: 8 }}
          >
            <TypewriterLine prefix="> " value="initializing..." delay={0} onDone={() => setLine1Done(true)} />
            {line1Done && (
              <TypewriterLine prefix="> " value="loading: rayan.portfolio" delay={0.03} onDone={() => setLine2Done(true)} />
            )}
            {line2Done && (
              <TypewriterLine prefix="> " value="status: open_to_work ✓" delay={0.03} onDone={() => setLine3Done(true)} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 3/4/5 — name */}
      <AnimatePresence>
        {showName && (
          <motion.div
            key="name"
            initial={{ scale: 2.5, opacity: 0 }}
            animate={
              phase === 4
                ? {
                    scale: 1,
                    opacity: 1,
                    x: [0, -4, 6, -2, 4, -1, 0],
                  }
                : phase === 5
                ? { scale: 8, opacity: 0 }
                : { scale: 1, opacity: 1 }
            }
            transition={
              phase === 3
                ? { type: "spring", stiffness: 400, damping: 20, duration: 0.6 }
                : phase === 4
                ? { duration: 0.5, ease: "easeInOut" }
                : { duration: 0.32, ease: "easeIn" }
            }
            style={{
              position: "relative",
              willChange: "transform",
              display: "flex",
            }}
          >
            {/* Glow behind */}
            <div
              style={{
                position: "absolute",
                inset: "-40%",
                background: "radial-gradient(ellipse at center, rgba(249,115,22,0.14) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            {/* Chromatic aberration ghost layers (phase 4) */}
            {phase === 4 && (
              <>
                <div
                  style={{
                    position: "absolute",
                    fontFamily: "VT323, monospace",
                    fontSize: "clamp(80px, 20vw, 240px)",
                    color: "rgba(249,115,22,0.4)",
                    transform: "translateX(-5px)",
                    letterSpacing: "0.05em",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                >
                  RAYAN
                </div>
                <div
                  style={{
                    position: "absolute",
                    fontFamily: "VT323, monospace",
                    fontSize: "clamp(80px, 20vw, 240px)",
                    color: "rgba(255,255,255,0.2)",
                    transform: "translateX(5px)",
                    letterSpacing: "0.05em",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                >
                  RAYAN
                </div>
              </>
            )}

            {/* Main name — letters colorize left-to-right */}
            {nameLetters.map((letter, i) => (
              <motion.span
                key={i}
                animate={{ color: nameColorIndex >= i ? "#f97316" : "#ffffff" }}
                transition={{ duration: 0.2 }}
                style={{
                  fontFamily: "VT323, monospace",
                  fontSize: "clamp(80px, 20vw, 240px)",
                  letterSpacing: "0.05em",
                  lineHeight: 1,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
