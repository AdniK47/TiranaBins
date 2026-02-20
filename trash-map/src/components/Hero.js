// src/components/Hero.js
import React, { useEffect, useRef, useMemo } from "react";
import "../style/Hero.css";

/**
 * Final hardened Hero scene
 * - Large trash pool, single thrower concurrency, long linger
 * - Busy flags, bring-to-front, deterministic phases
 * - JS-driven quadratic Bézier arcs with robust lifecycle
 *
 * Paste this file to: src/components/Hero.js (overwrite)
 */

const SCENE = { width: 1200, height: 420 };

// Tunables (already conservative)
const NUM_ACTORS = 28;
const MIN_SEPARATION = 64;
const CYCLE_MS = 7000;
const TRASH_POOL_SIZE = 96; // large pool to avoid reuse
const MAX_THROWERS = 1;     // only one thrower at a time
const LINGER_MS = 20000;    // 20s linger so items don't vanish

function rand(min, max) {
  return Math.random() * (max - min) + min;
}
function choose(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateActors(n) {
  const actors = [];
  const attemptsLimit = 20000;
  let attempts = 0;
  while (actors.length < n && attempts < attemptsLimit) {
    attempts++;
    const x = Math.round(rand(60, SCENE.width - 60));
    const y = Math.round(rand(230, 260));
    const collides = actors.some((a) => Math.hypot(a.x - x, a.y - y) < MIN_SEPARATION);
    if (!collides) {
      const r = Math.random();
      let role = "passerby";
      if (r < 0.12) role = "litterer";
      else if (r < 0.4) role = "volunteer";
      const palette = choose([
        ["#2b6cff", "#1e40af"],
        ["#f59e0b", "#b45309"],
        ["#34d399", "#059669"],
        ["#60a5fa", "#2563eb"],
        ["#f97316", "#ea580c"],
        ["#a78bfa", "#7c3aed"],
      ]);
      actors.push({
        id: `actor-${actors.length}`,
        x,
        y,
        role,
        clothes: palette,
        scale: +(rand(0.86, 1.12)).toFixed(2),
        offset: Math.floor(rand(0, 1600)),
      });
    }
  }
  return actors;
}

const BINS = [
  { id: "bin-1", x: 240, y: 230, label: "PAPIR" },
  { id: "bin-2", x: 560, y: 230, label: "KOSH" },
  { id: "bin-3", x: 840, y: 230, label: "PLASTIK" },
];

export default function Hero() {
  const rootRef = useRef(null);

  // generate once
  const actors = useMemo(() => generateActors(NUM_ACTORS), []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Build and initialize trash pool
    const trashPool = Array.from(root.querySelectorAll(".trash-item")).slice(0, TRASH_POOL_SIZE);
    trashPool.forEach((t, i) => {
      t.classList.remove("in-flight", "landed", "picked", "stale");
      t.style.opacity = "0";
      t.style.transform = "";
      t.dataset.busy = "0";
      if (!t.id) t.id = `trash-${i}`;
      // ensure visible attribute not interfering
      t.setAttribute("visibility", "visible");
    });

    function nearestBin(x) {
      let best = BINS[0];
      let bestDist = Math.abs(x - BINS[0].x);
      for (let i = 1; i < BINS.length; i++) {
        const d = Math.abs(x - BINS[i].x);
        if (d < bestDist) {
          best = BINS[i];
          bestDist = d;
        }
      }
      return best;
    }

    function quadBezier(p0, p1, p2, t) {
      const u = 1 - t;
      return {
        x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x,
        y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y,
      };
    }

    // Robust animateTrash
    function animateTrash(trashEl, start, control, end, duration = 2400, delay = 0) {
      // guard busy
      if (trashEl.dataset.busy === "1") return () => {};
      trashEl.dataset.busy = "1";

      // bring to front
      const layer = root.querySelector(".trash-layer");
      if (layer && trashEl.parentNode !== layer) {
        try { layer.appendChild(trashEl); } catch (e) {}
      }

      console.debug("[trash] animate start", { id: trashEl.id, start, end, delay });

      let cancelled = false;
      trashEl.classList.add("in-flight");
      trashEl.classList.remove("landed", "picked", "stale");
      trashEl.style.opacity = "1";
      trashEl.style.transition = "none";
      trashEl.style.transform = "none";

      const startTime = performance.now() + delay;

      function step(now) {
        if (cancelled) return;
        if (now < startTime) {
          requestAnimationFrame(step);
          return;
        }
        const t = Math.min(1, (now - startTime) / duration);
        const p = quadBezier(start, control, end, t);
        trashEl.setAttribute("x", p.x);
        trashEl.setAttribute("y", p.y);
        const rot = (t * 720) % 360;
        trashEl.style.transform = `rotate(${rot}deg)`;
        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          // landed
          trashEl.classList.remove("in-flight");
          trashEl.classList.add("landed");
          trashEl.style.transform = "";
          trashEl.dataset.landedAt = String(performance.now());
          console.debug("[trash] landed", { id: trashEl.id, landedAt: trashEl.dataset.landedAt });

          // linger long before stale
          setTimeout(() => {
            if (trashEl.classList.contains("landed") && !trashEl.classList.contains("picked")) {
              trashEl.classList.add("stale");
              trashEl.style.transition = "opacity 1200ms ease, transform 1200ms ease";
              trashEl.style.opacity = "0";
              trashEl.style.transform = "scale(0.9)";
              // clear busy after fade completes
              setTimeout(() => {
                trashEl.dataset.busy = "0";
                console.debug("[trash] stale cleared busy", { id: trashEl.id });
              }, 1300);
            } else {
              // if picked or removed, clear busy immediately
              trashEl.dataset.busy = "0";
            }
          }, LINGER_MS);
        }
      }

      const rafId = requestAnimationFrame(step);
      return () => {
        cancelled = true;
        cancelAnimationFrame(rafId);
        trashEl.dataset.busy = "0";
      };
    }

    // Deterministic orchestration
    let phase = 0;
    setPhaseClasses(phase);
    const initialDelay = 800;
    let intervalId = null;
    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        phase = (phase + 1) % 3;
        setPhaseClasses(phase);
        orchestratePhase(phase);
      }, CYCLE_MS);
    }, initialDelay);

    function setPhaseClasses(p) {
      root.querySelectorAll("[data-role]").forEach((el) => {
        el.classList.remove("phase-0", "phase-1", "phase-2");
        el.classList.add(`phase-${p}`);
      });
      root.querySelectorAll(".bin").forEach((b) => {
        if (p === 1) b.classList.add("open");
        else b.classList.remove("open");
      });
    }

    function orchestratePhase(p) {
      if (p === 0) {
        // idle: hide only unused pool items
        trashPool.forEach((t) => {
          if (!t.classList.contains("in-flight") && !t.classList.contains("landed") && !t.classList.contains("picked")) {
            t.style.opacity = "0";
            t.classList.remove("stale");
            t.dataset.busy = "0";
          }
        });
      } else if (p === 1) {
        // litter: pick up to MAX_THROWERS litterers
        const litterers = Array.from(root.querySelectorAll(".actor-litter"));
        const chosen = [];
        const maxThrowers = Math.min(MAX_THROWERS, litterers.length);
        for (let i = 0; i < maxThrowers; i++) {
          const pick = litterers[Math.floor(Math.random() * litterers.length)];
          if (!chosen.includes(pick)) chosen.push(pick);
        }

        chosen.forEach((el, idx) => {
          el.classList.add("throwing");
          const actorX = parseFloat(el.getAttribute("data-x"));
          const actorY = parseFloat(el.getAttribute("data-y"));
          const bin = nearestBin(actorX);
          const free = trashPool.find((t) => {
            return t.dataset.busy !== "1" && !t.classList.contains("in-flight") && !t.classList.contains("landed") && !t.classList.contains("picked");
          });
          if (free) {
            free.dataset.busy = "1";
            const start = { x: actorX + (idx % 2 === 0 ? 12 : -6), y: actorY - 10 };
            const end = { x: bin.x + rand(-8, 8), y: bin.y - 28 };
            const midX = (start.x + end.x) / 2 + rand(-80, 80);
            const midY = Math.min(start.y, end.y) - rand(40, 90);
            const control = { x: midX, y: midY };
            animateTrash(free, start, control, end, 2400, idx * 200);
          } else {
            console.debug("[trash] no free trash available", { actorX, actorY });
          }
        });

        setTimeout(() => chosen.forEach((el) => el.classList.remove("throwing")), 1600);
      } else if (p === 2) {
        // pick: volunteers pick nearest landed trash
        const volunteers = Array.from(root.querySelectorAll(".actor-volunteer"));
        const landed = Array.from(root.querySelectorAll(".trash-item.landed")).filter((t) => !t.classList.contains("picked"));
        console.debug("[pick] volunteers", volunteers.length, "landed", landed.length);
        volunteers.slice(0, landed.length).forEach((vol, i) => {
          vol.classList.add("picking");
          const t = landed[i];
          if (t) {
            setTimeout(() => {
              t.classList.add("picked");
              t.style.transition = "opacity 260ms ease, transform 260ms ease";
              t.style.opacity = "0";
              t.style.transform = "scale(0.6)";
              // clear busy after pick
              setTimeout(() => {
                t.dataset.busy = "0";
                console.debug("[trash] picked cleared busy", { id: t.id });
              }, 300);
            }, 400 + i * 160);
          }
          setTimeout(() => vol.classList.remove("picking"), 1400);
        });
      }
    }

    return () => {
      clearTimeout(startTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  // Render scene using memoized actors
  return (
    <section className="hero" role="region" aria-label="Hero" ref={rootRef}>
      <svg
        className="hero-svg"
        viewBox={`0 0 ${SCENE.width} ${SCENE.height}`}
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#07102a" />
            <stop offset="1" stopColor="#0b2b3a" />
          </linearGradient>
          <linearGradient id="groundGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#083022" />
            <stop offset="1" stopColor="#052018" />
          </linearGradient>

          <g id="trash-bottle">
            <rect x="0" y="0" width="6" height="14" rx="2" fill="#9fb7c9" />
            <rect x="1" y="-4" width="4" height="4" rx="1.5" fill="#7f9fb0" />
          </g>
          <g id="trash-paper">
            <rect x="0" y="0" width="8" height="6" rx="1" fill="#e6e6e6" />
            <path d="M1 1 L7 1" stroke="#cfcfcf" strokeWidth="0.6" />
          </g>
        </defs>

        <rect width={SCENE.width} height={SCENE.height} fill="url(#skyGrad)" />
        <g className="stars" opacity="0.12" fill="#9ff7c9">
          {Array.from({ length: 18 }).map((_, i) => {
            const sx = 40 + i * 60 + (i % 3) * 12;
            const sy = 20 + ((i * 37) % 80);
            const r = 0.9 + (i % 3) * 0.6;
            return <circle key={`s-${i}`} cx={sx} cy={sy} r={r} />;
          })}
        </g>

        <rect y="220" width={SCENE.width} height="200" fill="url(#groundGrad)" />

        <g className="park-props">
          <g transform="translate(520,240)" opacity="0.95">
            <rect x="-40" y="-8" width="80" height="8" rx="2" fill="#6b4f3a" />
            <rect x="-44" y="0" width="6" height="18" rx="1" fill="#6b4f3a" />
            <rect x="38" y="0" width="6" height="18" rx="1" fill="#6b4f3a" />
          </g>
        </g>

        {BINS.map((b) => (
          <g key={b.id} className="bin" transform={`translate(${b.x},${b.y})`}>
            <rect x="-18" y="-30" width="36" height="40" rx="5" fill="#1e7f3a" />
            <rect className="bin-lid" x="-20" y="-38" width="40" height="10" rx="3" fill="#145c2a" />
            <text x="0" y="-8" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.9)" fontFamily="sans-serif">
              {b.label}
            </text>
          </g>
        ))}

        <g className="trash-layer">
          {Array.from({ length: TRASH_POOL_SIZE }).map((_, i) => {
            const isBottle = i % 3 === 0;
            const tx = 280 + (i % 8) * 12 + (i % 3) * 6;
            const ty = 200 + (i % 5) * 2;
            const style = {
              "--arc-x": `${Math.floor(rand(-120, 120))}px`,
              "--arc-rot": `${Math.floor(rand(-60, 60))}deg`,
            };
            return isBottle ? (
              <use key={`trash-${i}`} id={`trash-${i}`} href="#trash-bottle" className="trash-item" x={tx} y={ty} style={style} />
            ) : (
              <use key={`trash-${i}`} id={`trash-${i}`} href="#trash-paper" className="trash-item" x={tx} y={ty} style={style} />
            );
          })}
        </g>

        {actors.map((a) => {
          const transform = `translate(${a.x}, ${a.y}) scale(${a.scale})`;
          const clothes = a.clothes;
          const roleClass = `actor actor-${a.role}`;
          return (
            <g
              key={a.id}
              id={a.id}
              className={roleClass}
              data-role={a.role}
              transform={transform}
              data-x={a.x}
              data-y={a.y}
              style={{ animationDelay: `${a.offset}ms` }}
            >
              <rect className="torso" x="-12" y="-22" width="24" height="34" rx="6" fill={clothes[0]} />
              <circle className="head" cx="0" cy="-36" r="10" fill="#f0f7ff" />
              <rect className="leg left" x="-8" y="18" width="6" height="20" rx="3" fill={clothes[1]} />
              <rect className="leg right" x="2" y="18" width="6" height="20" rx="3" fill={clothes[1]} />
              <g className="arm-left" transform="translate(-14,-8)">
                <rect x="-4" y="0" width="6" height="18" rx="3" fill="#f0f7ff" />
              </g>
              <g className="arm-right" transform="translate(14,-8)">
                <rect className="upper-arm" x="0" y="0" width="6" height="14" rx="3" fill="#f0f7ff" />
                <rect className="forearm" x="6" y="8" width="6" height="12" rx="3" fill="#f0f7ff" transform="rotate(10 9 14)" />
                {a.role === "litterer" ? (
                  <g className="hand-trash" transform="translate(14,14)">
                    <rect className="trash-small" x="0" y="0" width="8" height="6" rx="1" fill="#bdbdbd" />
                  </g>
                ) : null}
                {a.role === "volunteer" ? (
                  <g className="bag" transform="translate(8,12)">
                    <rect x="0" y="0" width="14" height="18" rx="4" fill="rgba(0,0,0,0.22)" />
                  </g>
                ) : null}
              </g>
            </g>
          );
        })}
      </svg>

      <div className="hero-content">
        <h1 className="hero-title">
          <span className="title-white">Tirana</span>
          <span className="title-accent">Bin</span>
        </h1>
        <p className="hero-sub">Bashkë për një qytet më të pastër — Raporto, Bashkëpuno, Ndrysho.</p>
      </div>
    </section>
  );
}

