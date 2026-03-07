import { useState, useEffect, useCallback, useRef } from "react";

import { playCorrectSound, playWrongSound, playTickSound, playWinSound, playStartSound } from "./sounds";

const shuffleArray = (items) => {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

import { englishQuestions } from "./data/englishQuestions";
import { mathQuestions } from "./data/mathQuestions";

// ─── Question Generator ───────────────────────────────────────────────────────
const generateQuestions = (difficulty, numQuestions, subject = "Math") => {
  const players = [[], []];
  const diffLower = difficulty.toLowerCase();

  // Choose the right pool based on subject
  const pool = subject === "English" ? englishQuestions : mathQuestions;
  let filteredQs = pool.filter(q => q.level === diffLower);

  // Fallback: if nothing at this level, use easy
  if (filteredQs.length === 0) {
    filteredQs = pool.filter(q => q.level === "easy");
    if (filteredQs.length === 0) filteredQs = pool;
  }

  for (let p = 0; p < 2; p++) {
    let pQs = [];
    while (pQs.length < numQuestions) {
      pQs = pQs.concat(shuffleArray([...filteredQs]));
    }
    players[p] = pQs.slice(0, numQuestions).map(q => {
      const base = { ...q, q: q.question };
      if (q.type === "spelling_tap") {
        return { ...base, options: shuffleArray([...q.options]) };
      }
      return { ...base, options: shuffleArray([...q.options]) };
    });
  }
  return players;
};


const createQuestionBank = (difficulty, len, subject = "Math") => generateQuestions(difficulty, len, subject);

const pickRandom = (items) => items[Math.floor(Math.random() * items.length)];
const CORRECT_CHEERS = ["Great job!", "Awesome answer!", "You got it!", "Brilliant!", "Super smart!"];
const MISS_CHEERS = ["Nice try!", "Keep going!", "You can do it!", "Almost there!"];
const TIMEOUT_CHEERS = ["Time's up! Next one!", "Quick quick! Next round!", "No worries, try the next question!"];

const TOTAL_QUESTIONS = 10;
const TIMER_DURATION = 10;
const getDisplayName = (name, player) => (name || "").trim() || `Player ${player}`;

// ─── SVG Vehicles ─────────────────────────────────────────────────────────────
function Car1({ color = "#FF3D6E", base = "#FF6B93" }) {
  return (
    <svg viewBox="0 0 80 48" width="76" height="46"
      style={{ filter: `drop-shadow(0 4px 10px ${color}88)` }}>
      <ellipse cx="40" cy="40" rx="30" ry="5" fill="rgba(0,0,0,0.25)" />
      <rect x="8" y="20" width="64" height="18" rx="7" fill={color} />
      <rect x="16" y="10" width="44" height="16" rx="5" fill={base} />
      <rect x="20" y="12" width="17" height="10" rx="3" fill="#CCF0FF" opacity="0.9" />
      <rect x="41" y="12" width="14" height="10" rx="3" fill="#CCF0FF" opacity="0.9" />
      <circle cx="21" cy="36" r="7" fill="#222" /><circle cx="21" cy="36" r="4" fill="#777" /><circle cx="21" cy="36" r="1.5" fill="#ddd" />
      <circle cx="59" cy="36" r="7" fill="#222" /><circle cx="59" cy="36" r="4" fill="#777" /><circle cx="59" cy="36" r="1.5" fill="#ddd" />
      <rect x="66" y="23" width="9" height="6" rx="2" fill="#FFE566" />
      <rect x="5" y="23" width="7" height="5" rx="2" fill="#FF9999" opacity="0.8" />
    </svg>
  );
}

function Rocket({ color = "#A78BFA", base = "#8B5CF6" }) {
  return (
    <svg viewBox="0 0 80 48" width="76" height="46"
      style={{ filter: `drop-shadow(0 4px 10px ${color}88)` }}>
      <path d="M15,24 Q30,12 60,24 Q30,36 15,24" fill={base} />
      <path d="M50,18 Q75,24 50,30" fill={color} />
      <circle cx="45" cy="24" r="6" fill="#CCF0FF" stroke="#333" strokeWidth="1.5" />
      <path d="M20,20 L10,12 L25,22 Z" fill={color} />
      <path d="M20,28 L10,36 L25,26 Z" fill={color} />
      <path d="M5,24 L15,22 L15,26 Z" fill="#FF9A3C" opacity="0.8" />
    </svg>
  );
}

function Ufo({ color = "#F59E0B", base = "#FBBF24" }) {
  return (
    <svg viewBox="0 0 80 48" width="76" height="46"
      style={{ filter: `drop-shadow(0 4px 10px ${color}88)`, animation: 'bounce 1s infinite alternate ease-in-out' }}>
      <ellipse cx="40" cy="40" rx="25" ry="5" fill="rgba(0,0,0,0.25)" />
      <ellipse cx="40" cy="28" rx="28" ry="8" fill={color} />
      <path d="M25,26 Q40,10 55,26" fill="#CCF0FF" opacity="0.9" />
      <circle cx="20" cy="28" r="2.5" fill="#fff" />
      <circle cx="40" cy="30" r="2.5" fill="#fff" />
      <circle cx="60" cy="28" r="2.5" fill="#fff" />
      <rect x="38" y="36" width="4" height="8" rx="2" fill="#FFE566" opacity="0.6" />
    </svg>
  );
}

const VEHICLES = {
  car: { id: "car", icon: "🚗", Component: Car1 },
  rocket: { id: "rocket", icon: "🚀", Component: Rocket },
  ufo: { id: "ufo", icon: "🛸", Component: Ufo }
};

// ─── Timer Ring ───────────────────────────────────────────────────────────────
function TimerRing({ timeLeft, total }) {
  const r = 34, circ = 2 * Math.PI * r;
  const pct = timeLeft / total;
  const color = timeLeft <= 3 ? "#FF3D6E" : timeLeft <= 6 ? "#FFB800" : "#00C9A7";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <svg width="88" height="88" viewBox="0 0 88 88"
        style={{ animation: timeLeft <= 3 ? "shake 0.4s ease infinite" : "none" }}>
        <circle cx="44" cy="44" r={r} fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" strokeWidth="7" />
        <circle cx="44" cy="44" r={r} fill="none" stroke={color} strokeWidth="7"
          strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)}
          strokeLinecap="round" transform="rotate(-90 44 44)"
          style={{ transition: "stroke-dashoffset 0.9s linear, stroke 0.3s" }} />
        <text x="44" y="44" textAnchor="middle" dominantBaseline="central"
          fontSize="25" fontWeight="900" fill={color} fontFamily="'Fredoka One', cursive">{timeLeft}</text>
      </svg>
      <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontFamily: "Nunito,sans-serif", marginTop: -4 }}>sec</span>
    </div>
  );
}

// ─── Track Themes ─────────────────────────────────────────────────────────────
const TRACK_THEMES = {
  space: {
    id: "space", name: "Space", icon: "🌌",
    bg: "linear-gradient(180deg, #0d1b4b 0%, #112040 45%, #1a3a6b 100%)",
    particleShape: "circle", particleColor: "white", particleAnim: "twinkle", numParticles: 18,
    dashColor: "repeating-linear-gradient(180deg,rgba(255,255,255,0.22) 0,rgba(255,255,255,0.22) 18px,transparent 18px,transparent 36px)"
  },
  water: {
    id: "water", name: "Ocean", icon: "🌊",
    bg: "linear-gradient(180deg, #023859 0%, #065b77 45%, #0e8ea3 100%)",
    particleShape: "circle", particleColor: "rgba(255,255,255,0.4)", particleAnim: "floatUp", numParticles: 12, border: "1px solid rgba(255,255,255,0.6)",
    dashColor: "repeating-linear-gradient(180deg,rgba(255,255,255,0.3) 0,rgba(255,255,255,0.3) 18px,transparent 18px,transparent 36px)"
  },
  desert: {
    id: "desert", name: "Desert", icon: "🏜️",
    bg: "linear-gradient(180deg, #b06222 0%, #d48a42 45%, #f2ba7c 100%)",
    particleShape: "rect", particleColor: "#82400b", particleAnim: "none", numParticles: 10, borderRadius: "2px",
    dashColor: "repeating-linear-gradient(180deg,rgba(255,255,255,0.4) 0,rgba(255,255,255,0.4) 18px,transparent 18px,transparent 36px)"
  },
  volcano: {
    id: "volcano", name: "Volcano", icon: "🌋",
    bg: "linear-gradient(180deg, #2b0606 0%, #591612 45%, #a32c1a 100%)",
    particleShape: "circle", particleColor: "#ffca4f", particleAnim: "floatUp", numParticles: 20,
    dashColor: "repeating-linear-gradient(180deg,rgba(255,200,100,0.3) 0,rgba(255,200,100,0.3) 18px,transparent 18px,transparent 36px)"
  }
};

// ─── Power-ups ────────────────────────────────────────────────────────────────
const POWERUPS = {
  shield: { id: "shield", icon: "🛡️", name: "Shield", desc: "Saves streak on miss!" },
  turbo: { id: "turbo", icon: "🚀", name: "Turbo", desc: "Next answer moves +2!" },
  freeze: { id: "freeze", icon: "⏱️", name: "Time+", desc: "+5 sec next round!" }
};

// ─── Race Track ───────────────────────────────────────────────────────────────
function CheerToast({ cheer }) {
  if (!cheer) return null;
  return (
    <div style={{
      position: "fixed",
      top: 18,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 990,
      pointerEvents: "none",
      background: "linear-gradient(135deg, rgba(18,25,56,0.95), rgba(10,16,34,0.95))",
      border: `2px solid ${cheer.color}`,
      borderRadius: 18,
      padding: "10px 16px",
      color: "white",
      boxShadow: `0 10px 22px ${cheer.color}55`,
      animation: "popIn 0.3s cubic-bezier(0.34,1.56,0.64,1)"
    }}>
      <span style={{ fontFamily: "'Fredoka One', cursive", fontSize: 20, marginRight: 8 }}>{cheer.icon}</span>
      <span style={{ fontFamily: "'Fredoka One', cursive", fontSize: 18 }}>{cheer.text}</span>
    </div>
  );
}

function RaceTrack({ p1Progress, p2Progress, p1Name, p2Name, total, p1Vehicle, p2Vehicle, theme }) {
  const trackH = 400;
  const usable = trackH - 90;
  const p1Y = usable - (p1Progress / total) * usable;
  const p2Y = usable - (p2Progress / total) * usable;

  const P1Component = p1Vehicle.Component;
  const P2Component = p2Vehicle.Component;
  const t = TRACK_THEMES[theme] || TRACK_THEMES.space;

  return (
    <div style={{
      width: "100%", height: trackH, position: "relative",
      background: t.bg,
      borderRadius: 24, overflow: "hidden",
      border: "3px solid rgba(255,255,255,0.12)",
      boxShadow: "inset 0 0 50px rgba(0,0,0,0.4), 0 8px 28px rgba(0,0,0,0.4)",
      transition: "background 0.5s ease"
    }}>
      {/* Particles/Decorations */}
      {[...Array(t.numParticles)].map((_, i) => (
        <div key={`${theme}-${i}`} style={{
          position: "absolute",
          width: t.particleShape === "rect" ? 6 : (i % 4 === 0 ? 5 : 3),
          height: t.particleShape === "rect" ? 12 : (i % 4 === 0 ? 5 : 3),
          borderRadius: t.borderRadius || "50%",
          background: t.particleColor,
          border: t.border || "none",
          left: `${(i * 41 + 9) % 88 + 6}%`,
          top: t.particleAnim === "floatUp" ? "110%" : `${(i * 57 + 5) % 80 + 10}%`,
          opacity: 0.25 + (i % 5) * 0.12,
          animation: t.particleAnim === "floatUp"
            ? `floatUp ${3 + (i % 4)}s linear infinite`
            : t.particleAnim !== "none" ? `${t.particleAnim} ${1.4 + (i % 3) * 0.6}s ease-in-out infinite alternate` : "none",
          animationDelay: t.particleAnim === "floatUp" ? `${(i * 0.5) % 3}s` : `${i * 0.3}s`
        }} />
      ))}

      {/* Finish line */}
      <div style={{
        position: "absolute", top: 22, left: 0, right: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: 6, zIndex: 10
      }}>
        <div style={{ flex: 1, height: 4, background: "repeating-linear-gradient(90deg,#fff 0,#fff 9px,#000 9px,#000 18px)" }} />
        <div style={{
          fontSize: 18, padding: "3px 10px", borderRadius: 10,
          background: "rgba(255,215,0,0.18)", border: "2px solid gold",
          color: "#FFD700", fontFamily: "'Fredoka One', cursive", whiteSpace: "nowrap"
        }}>🏁 FINISH!</div>
        <div style={{ flex: 1, height: 4, background: "repeating-linear-gradient(90deg,#fff 0,#fff 9px,#000 9px,#000 18px)" }} />
      </div>

      {/* Center dash */}
      <div style={{ position: "absolute", left: "50%", top: 58, bottom: 18, width: 2, transform: "translateX(-50%)", background: t.dashColor }} />

      {/* P1 Vehicle */}
      <div style={{ position: "absolute", left: "12%", top: p1Y + 44, transition: "top 0.65s cubic-bezier(0.34,1.56,0.64,1)", zIndex: 5 }}>
        <P1Component color="#FF3D6E" base="#FF6B93" />
      </div>

      {/* P2 Vehicle */}
      <div style={{ position: "absolute", right: "12%", top: p2Y + 44, transition: "top 0.65s cubic-bezier(0.34,1.56,0.64,1)", zIndex: 5 }}>
        <P2Component color="#00C9A7" base="#4DFFDB" />
      </div>

      {/* Bottom labels */}
      <div style={{ position: "absolute", bottom: 6, left: 0, right: 0, display: "flex", justifyContent: "space-around" }}>
        <span style={{ color: "#FF6B93", fontFamily: "'Fredoka One', cursive", fontSize: 13 }}>{p1Vehicle.icon} {p1Name}: {p1Progress}/{total}</span>
        <span style={{ color: "#4DFFDB", fontFamily: "'Fredoka One', cursive", fontSize: 13 }}>{p2Vehicle.icon} {p2Name}: {p2Progress}/{total}</span>
      </div>
    </div>
  );
}

// ─── Player Panel ─────────────────────────────────────────────────────────────
function PlayerPanel({ player, name, onNameChange, question, onAnswer, feedback, answered, canAnswer, streak, resultBanner, accent, vehicle, onVehicleChange, powerup }) {
  const [typedLetters, setTypedLetters] = useState([]);
  useEffect(() => { setTypedLetters([]); }, [question]);

  if (!question) return null;
  const labelColors = ["#FFB800", "#A78BFA", "#00C9A7", "#FF3D6E"];
  const pInfo = powerup ? POWERUPS[powerup] : null;

  const handleSpellingTap = (char, index) => {
    if (answered || !canAnswer) return;
    const newTyped = [...typedLetters, { char, index }];
    setTypedLetters(newTyped);

    // Check if word is complete
    if (newTyped.length === question.answer.length) {
      const spelledWord = newTyped.map(t => t.char).join("");
      onAnswer(spelledWord);
    }
  };

  return (
    <div style={{
      background: "rgba(255,255,255,0.055)",
      border: `2px solid ${accent}44`,
      borderRadius: 24, padding: "18px 14px",
      display: "flex", flexDirection: "column", gap: 14,
      backdropFilter: "blur(10px)",
      boxShadow: `0 0 30px ${accent}18, inset 0 1px 0 rgba(255,255,255,0.07)`
    }}>

      {/* Badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 48, height: 48, borderRadius: "50%", flexShrink: 0,
          background: `linear-gradient(135deg, ${accent}cc, ${accent}55)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 26, boxShadow: `0 4px 14px ${accent}44`
        }}>{vehicle.icon}</div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: onVehicleChange ? 6 : 0 }}>
            <input
              value={name}
              onChange={e => onNameChange(e.target.value)}
              placeholder={`Player ${player}`}
              maxLength={18}
              style={{
                width: "100%", color: accent, background: "rgba(255,255,255,0.07)",
                border: `1px solid ${accent}66`, borderRadius: 10, padding: "7px 10px",
                fontFamily: "'Fredoka One', cursive", fontSize: 18, lineHeight: 1.1, outline: "none"
              }}
            />
            {onVehicleChange && (
              <div style={{ display: "flex", gap: 4 }}>
                {Object.values(VEHICLES).map(v => (
                  <button key={v.id} onClick={() => onVehicleChange(v.id)}
                    style={{
                      background: vehicle.id === v.id ? `${accent}44` : "rgba(255,255,255,0.05)",
                      border: `1px solid ${vehicle.id === v.id ? accent : "transparent"}`,
                      borderRadius: 8, padding: 4, cursor: "pointer", fontSize: 16
                    }}>
                    {v.icon}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, fontFamily: "Nunito, sans-serif" }}>
            {canAnswer ? "pick the right answer!" : "press start to begin!"}
          </div>
          <div style={{
            marginTop: 5,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: streak >= 3 ? "rgba(255,184,0,0.24)" : "rgba(255,255,255,0.08)",
            border: `1px solid ${streak >= 3 ? "#FFB80088" : "rgba(255,255,255,0.2)"}`,
            borderRadius: 999,
            padding: "2px 8px",
            color: streak >= 3 ? "#FFD56A" : "rgba(255,255,255,0.7)",
            fontFamily: "Nunito, sans-serif",
            fontSize: 11,
            fontWeight: 800
          }}>
            <span>{streak >= 3 ? "🔥" : "⭐"}</span>
            <span>{streak > 0 ? `Streak x${streak}` : "Build a streak!"}</span>
          </div>

          {/* Active Powerup display */}
          {pInfo && (
            <div style={{
              marginTop: 6, padding: "4px 8px", borderRadius: 8,
              background: "linear-gradient(135deg, rgba(167,139,250,0.3), rgba(96,165,250,0.3))",
              border: "1px solid #A78BFA", color: "#E7D7FF", display: "inline-flex", gap: 6,
              fontFamily: "Nunito, sans-serif", fontSize: 11, fontWeight: 800, animation: "popIn 0.3s ease"
            }}>
              <span>{pInfo.icon}</span> <span>{pInfo.name}: {pInfo.desc}</span>
            </div>
          )}
        </div>
      </div>

      {resultBanner && (
        <div style={{
          textAlign: "center",
          padding: "14px 10px",
          borderRadius: 16,
          border: `2px solid ${resultBanner === "winner" ? "#00D28C88" : "#FF3D6E88"}`,
          background: resultBanner === "winner"
            ? "linear-gradient(135deg, rgba(0,210,140,0.28), rgba(0,130,255,0.14))"
            : "linear-gradient(135deg, rgba(255,61,110,0.28), rgba(255,166,0,0.14))",
          color: "white",
          fontFamily: "'Fredoka One', cursive",
          animation: "popIn 0.35s cubic-bezier(0.34,1.56,0.64,1)",
          boxShadow: resultBanner === "winner" ? "0 8px 22px rgba(0,210,140,0.25)" : "0 8px 22px rgba(255,61,110,0.25)"
        }}>
          <div style={{ fontSize: 24, marginBottom: 2 }}>
            {resultBanner === "winner" ? "🏆✨" : "😢💔"}
          </div>
          <div style={{ fontSize: 18, lineHeight: 1.1 }}>
            {resultBanner === "winner" ? "Champion Moment!" : "So Close!"}
          </div>
          <div style={{ fontFamily: "Nunito, sans-serif", fontSize: 12, opacity: 0.9, marginTop: 4 }}>
            {resultBanner === "winner" ? "You took the lead at the end!" : "Next round, you got this!"}
          </div>
        </div>
      )}

      {/* Question */}
      <div style={{
        background: "rgba(0,0,0,0.3)", borderRadius: 18,
        padding: "20px 12px", textAlign: "center",
        border: "1px solid rgba(255,255,255,0.06)"
      }}>
        {question.image && (
          <div style={{ fontSize: "64px", marginBottom: "10px", lineHeight: 1 }}>
            {question.image}
          </div>
        )}
        <div style={{ color: "rgba(255,255,255,0.45)", fontFamily: "Nunito, sans-serif", fontSize: 12, marginBottom: 6 }}>
          {question.type === "grammar_have_has" ? "Lengkapi titik-titik di bawah ini:" : question.type ? "Question:" : "What is…"}
        </div>
        <div style={{ color: "white", fontFamily: "'Fredoka One', cursive", fontSize: question.type ? "clamp(20px,2.8vw,30px)" : "clamp(32px,4.5vw,44px)", lineHeight: 1.2 }}>
          {question.q}
        </div>
      </div>

      {/* Buttons */}
      {question.type === "spelling_tap" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Tapped Letters Display */}
          <div style={{
            display: "flex", gap: 8, justifyContent: "center", minHeight: 48,
            borderBottom: "2px dashed rgba(255,255,255,0.2)", paddingBottom: 10
          }}>
            {Array.from({ length: question.answer.length }).map((_, i) => (
              <div key={i} style={{
                width: 40, height: 48, borderRadius: 8, background: "rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28, color: "white", fontFamily: "'Fredoka One', cursive",
                border: `1px solid ${accent}66`
              }}>
                {typedLetters[i] ? typedLetters[i].char : ""}
              </div>
            ))}
          </div>
          {/* Letter Options */}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            {question.options.map((char, i) => {
              const isTapped = typedLetters.some(t => t.index === i);
              return (
                <button key={`${char}-${i}`} disabled={isTapped || answered || !canAnswer}
                  onClick={() => handleSpellingTap(char, i)}
                  style={{
                    width: 50, height: 50, borderRadius: 12,
                    background: isTapped ? "rgba(0,0,0,0.2)" : `${accent}33`,
                    border: `2px solid ${isTapped ? "transparent" : accent}`,
                    color: isTapped ? "rgba(255,255,255,0.2)" : "white",
                    fontFamily: "'Fredoka One', cursive", fontSize: 24,
                    cursor: (isTapped || answered || !canAnswer) ? "default" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    opacity: (answered || !canAnswer) && !isTapped ? 0.65 : 1
                  }}>
                  {char}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {question.options.map((opt, i) => {
            const isCorrect = opt === question.answer;
            const isChosen = feedback === opt;
            let bg = "rgba(255,255,255,0.09)";
            let border = `2px solid ${accent}2a`;
            let icon = null;
            if (isChosen) {
              bg = isCorrect ? "rgba(0,210,140,0.28)" : "rgba(255,61,110,0.28)";
              border = isCorrect ? "2px solid #00D28C" : "2px solid #FF3D6E";
              icon = isCorrect ? "✅" : "❌";
            }
            return (
              <button key={opt} disabled={answered || !canAnswer} onClick={() => !answered && canAnswer && onAnswer(opt)}
                style={{
                  background: bg, border, borderRadius: 16,
                  padding: "14px 16px", cursor: answered || !canAnswer ? "default" : "pointer",
                  display: "flex", alignItems: "center", gap: 10,
                  transform: isChosen ? "scale(0.97)" : "scale(1)",
                  transition: "all 0.18s ease", outline: "none", width: "100%",
                  opacity: canAnswer ? 1 : 0.65
                }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                  background: `${labelColors[i % labelColors.length]}1a`, border: `2px solid ${labelColors[i % labelColors.length]}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Fredoka One', cursive", fontSize: 17, color: labelColors[i % labelColors.length]
                }}>
                  {["A", "B", "C", "D"][i] || "-"}
                </div>
                <span style={{ color: "white", fontFamily: "'Fredoka One', cursive", fontSize: "clamp(24px,3.5vw,34px)", flex: 1, textAlign: "center" }}>
                  {opt}
                </span>
                {icon && <span style={{ fontSize: 22 }}>{icon}</span>}
              </button>
            );
          })}
        </div>
      )}

      {/* Feedback */}
      {feedback !== null && (
        <div style={{
          textAlign: "center", padding: "10px 8px", borderRadius: 14,
          background: feedback === question.answer ? "rgba(0,210,140,0.13)" : "rgba(255,61,110,0.13)",
          border: `1px solid ${feedback === question.answer ? "#00D28C" : "#FF3D6E"}44`,
          color: feedback === question.answer ? "#00D28C" : "#FF6B93",
          fontFamily: "'Fredoka One', cursive", fontSize: 18,
          animation: "popIn 0.3s cubic-bezier(0.34,1.56,0.64,1)"
        }}>
          {feedback === question.answer ? "🎉 Great job!" : "😅 Try next one!"}
        </div>
      )}
    </div>
  );
}

// ─── Winner Banner & Stats ────────────────────────────────────────────────────
function WinnerBanner({ winner, winnerName, onRestart, mode = "finish", stats }) {
  const isP1 = winner === 1;
  const color = isP1 ? "#FF3D6E" : "#00C9A7";
  const emoji = isP1 ? stats.p1Vehicle.icon : stats.p2Vehicle.icon;
  const message = mode === "questions" ? "won with the highest score! 🌟" : "reached the finish line first! 🏁";

  const confetti = [...Array(55)].map((_, i) => ({
    x: Math.random() * 100, delay: Math.random() * 1.8,
    color: ["#FF3D6E", "#FFB800", "#00C9A7", "#A78BFA", "#60A5FA", "#FFD700", "#FF9A3C"][i % 7],
    size: 7 + Math.random() * 11, dur: 1.8 + Math.random() * 2
  }));

  const accuracy = Math.round((stats.score / stats.attempts) * 100) || 0;
  const avgTime = stats.avgTime > 0 ? (stats.avgTime / 1000).toFixed(1) + "s" : "N/A";

  const badges = [];
  if (accuracy === 100) badges.push({ icon: "🎯", name: "Flawless", color: "#FF3D6E" });
  if (stats.maxStreak >= 5) badges.push({ icon: "🔥", name: "Streak Master", color: "#FFB800" });
  if (stats.avgTime > 0 && stats.avgTime < 3000) badges.push({ icon: "⚡", name: "Speed Demon", color: "#00C9A7" });
  if (badges.length === 0) badges.push({ icon: "🌟", name: "Good Effort", color: "#A78BFA" });

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 999,
      background: "rgba(4,4,18,0.9)", backdropFilter: "blur(12px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      animation: "fadeIn 0.35s ease"
    }}>
      {confetti.map((c, i) => (
        <div key={i} style={{
          position: "absolute", left: `${c.x}%`, top: -18, width: c.size, height: c.size,
          borderRadius: i % 3 === 0 ? "50%" : 3, background: c.color,
          animation: `fall ${c.dur}s ${c.delay}s ease-in infinite`
        }} />
      ))}

      <div style={{
        position: "relative", zIndex: 1, background: "linear-gradient(145deg, #13132e, #0c0c20)",
        border: `4px solid ${color}`, borderRadius: 36, padding: "30px 40px",
        textAlign: "center", maxWidth: 500, width: "90%",
        boxShadow: `0 0 90px ${color}55, 0 32px 64px rgba(0,0,0,0.75)`,
        animation: "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1)"
      }}>
        <div style={{ fontSize: 64, marginBottom: -10, display: "inline-block", animation: "bounce 0.7s ease infinite alternate" }}>🏆</div>

        <div style={{
          fontFamily: "'Fredoka One', cursive", fontSize: "clamp(42px,7vw,58px)",
          background: `linear-gradient(135deg, ${color}, #FFD700)`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          lineHeight: 1.2, marginBottom: 4
        }}>
          {winnerName}
        </div>

        <div style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 20 }}>
          {emoji} {message}
        </div>

        {/* Stats Grid */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20,
          background: "rgba(0,0,0,0.25)", padding: 16, borderRadius: 20, border: "1px solid rgba(255,255,255,0.05)"
        }}>
          <div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, fontFamily: "Nunito, sans-serif" }}>Final Score</div>
            <div style={{ color: "white", fontSize: 24, fontFamily: "'Fredoka One', cursive" }}>{stats.score}/{TOTAL_QUESTIONS}</div>
          </div>
          <div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, fontFamily: "Nunito, sans-serif" }}>Accuracy</div>
            <div style={{ color: "white", fontSize: 24, fontFamily: "'Fredoka One', cursive" }}>{accuracy}%</div>
          </div>
          <div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, fontFamily: "Nunito, sans-serif" }}>Avg Speed</div>
            <div style={{ color: "white", fontSize: 24, fontFamily: "'Fredoka One', cursive" }}>{avgTime}</div>
          </div>
          <div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, fontFamily: "Nunito, sans-serif" }}>Best Streak</div>
            <div style={{ color: "white", fontSize: 24, fontFamily: "'Fredoka One', cursive" }}>🔥 {stats.maxStreak}</div>
          </div>
        </div>

        {/* Badges */}
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
          {badges.map((b, i) => (
            <div key={i} style={{
              background: `${b.color}22`, border: `1px solid ${b.color}55`, borderRadius: 12,
              padding: "6px 12px", display: "flex", alignItems: "center", gap: 6,
              color: "white", fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: 14
            }}>
              <span>{b.icon}</span> <span style={{ color: b.color }}>{b.name}</span>
            </div>
          ))}
        </div>

        <button onClick={onRestart}
          style={{
            background: `linear-gradient(135deg, ${color}, ${color}99)`, border: "none", borderRadius: 20,
            padding: "14px 40px", fontFamily: "'Fredoka One', cursive", fontSize: 22, color: "white",
            cursor: "pointer", boxShadow: `0 8px 24px ${color}55`, transition: "transform 0.2s",
            display: "inline-flex", alignItems: "center", gap: 10
          }}
          onMouseOver={e => { e.currentTarget.style.transform = "scale(1.05)"; }}
          onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; }}>
          🔄 Play Again
        </button>
      </div>
    </div>
  );
}

// ─── Main Game ────────────────────────────────────────────────────────────────
function TieBanner({ p1Name, p2Name, score, onRestart }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 998,
      background: "rgba(6,8,24,0.78)", backdropFilter: "blur(9px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      animation: "fadeIn 0.3s ease"
    }}>
      <div style={{
        width: "min(92vw, 480px)",
        borderRadius: 28,
        border: "3px solid #A78BFA",
        background: "linear-gradient(155deg, #171333, #0e1931)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.55), 0 0 60px rgba(167,139,250,0.35)",
        padding: "28px 24px",
        textAlign: "center",
        animation: "popIn 0.45s cubic-bezier(0.34,1.56,0.64,1)"
      }}>
        <div style={{ fontSize: 56, lineHeight: 1, marginBottom: 8 }}>🤝</div>
        <div style={{
          fontFamily: "'Fredoka One', cursive",
          fontSize: "clamp(30px, 7vw, 44px)",
          color: "#E7D7FF",
          marginBottom: 8
        }}>
          It's a Tie!
        </div>
        <div style={{
          color: "rgba(255,255,255,0.75)",
          fontFamily: "Nunito, sans-serif",
          fontWeight: 800,
          fontSize: 16,
          marginBottom: 18
        }}>
          {p1Name} and {p2Name} both scored {score}/{TOTAL_QUESTIONS}
        </div>
        <button onClick={onRestart}
          style={{
            background: "linear-gradient(135deg, #A78BFA, #60A5FA)",
            border: "none",
            borderRadius: 16,
            padding: "13px 30px",
            color: "white",
            fontFamily: "'Fredoka One', cursive",
            fontSize: 20,
            cursor: "pointer",
            boxShadow: "0 8px 18px rgba(96,165,250,0.35)"
          }}>
          🔁 Play Again
        </button>
      </div>
    </div>
  );
}

export default function RacingGame() {
  const [difficulty, setDifficulty] = useState("Easy");
  const [subject, setSubject] = useState("Math");
  const [theme, setTheme] = useState("space");
  const [isSinglePlayer, setIsSinglePlayer] = useState(false);
  const [questionBank, setQuestionBank] = useState(() => createQuestionBank(difficulty, 10, "Math"));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [endReason, setEndReason] = useState(null);

  const [p1Name, setP1Name] = useState("Player 1");
  const [p2Name, setP2Name] = useState("Player 2");
  const [p1VehicleId, setP1VehicleId] = useState("car");
  const [p2VehicleId, setP2VehicleId] = useState("car");

  const [p1Progress, setP1Progress] = useState(0);
  const [p2Progress, setP2Progress] = useState(0);

  // Power-ups
  const [p1Powerup, setP1Powerup] = useState(null);
  const [p2Powerup, setP2Powerup] = useState(null);

  // Tracking stats
  const [p1Stats, setP1Stats] = useState({ attempts: 0, maxStreak: 0, totalAnswerTimeMs: 0 });
  const [p2Stats, setP2Stats] = useState({ attempts: 0, maxStreak: 0, totalAnswerTimeMs: 0 });

  const [p1Feedback, setP1Feedback] = useState(null);
  const [p2Feedback, setP2Feedback] = useState(null);
  const [p1Streak, setP1Streak] = useState(0);
  const [p2Streak, setP2Streak] = useState(0);
  const [p1Answered, setP1Answered] = useState(false);
  const [p2Answered, setP2Answered] = useState(false);
  const [cheer, setCheer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [winner, setWinner] = useState(null);
  const [roundKey, setRoundKey] = useState(0);

  const timerRef = useRef(null);
  const cheerTimeoutRef = useRef(null);
  const questionStartTimeRef = useRef(null);

  const p1Q = questionBank[0][questionIndex] || null;
  const p2Q = questionBank[1][questionIndex] || null;
  const displayP1Name = getDisplayName(p1Name, 1);
  const displayP2Name = getDisplayName(p2Name, 2);
  const isTie = endReason === "tie";
  const gameOver = winner !== null || isTie;
  const p1ResultBanner = endReason === "questions" && winner ? (winner === 1 ? "winner" : "loser") : null;
  const p2ResultBanner = endReason === "questions" && winner ? (winner === 2 ? "winner" : "loser") : null;

  const p1Vehicle = VEHICLES[p1VehicleId];
  const p2Vehicle = isSinglePlayer ? VEHICLES.rocket : VEHICLES[p2VehicleId];

  const showCheer = useCallback((text, color, icon) => {
    clearTimeout(cheerTimeoutRef.current);
    setCheer({ text, color, icon });
    cheerTimeoutRef.current = setTimeout(() => setCheer(null), 1300);
  }, []);

  const advanceRound = useCallback(() => {
    clearInterval(timerRef.current);
    setTimeout(() => {
      const next = questionIndex + 1;
      if (next >= TOTAL_QUESTIONS) {
        if (p1Progress === p2Progress) {
          setWinner(null);
          setEndReason("tie");
        } else {
          const scoreWinner = p1Progress > p2Progress ? 1 : 2;
          setWinner(scoreWinner);
          setEndReason("questions");
          playWinSound();
        }
        setGameStarted(false);
        return;
      }
      setQuestionIndex(next);
      setP1Feedback(null); setP2Feedback(null);
      setP1Answered(false); setP2Answered(false);
      setTimeLeft(TIMER_DURATION);
      setRoundKey(k => k + 1);
      questionStartTimeRef.current = Date.now();
    }, 1400);
  }, [questionIndex, p1Progress, p2Progress]);

  useEffect(() => () => {
    clearInterval(timerRef.current);
    clearTimeout(cheerTimeoutRef.current);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (winner || !gameStarted) return;
    if (!questionStartTimeRef.current) questionStartTimeRef.current = Date.now();

    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 4 && t > 1) playTickSound(); // tick at 3, 2, 1
        if (t <= 1) {
          clearInterval(timerRef.current);
          setP1Answered(true);
          setP2Answered(true);
          setP1Streak(0);
          setP2Streak(0);
          showCheer(pickRandom(TIMEOUT_CHEERS), "#FFB800", "⏰");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [roundKey, winner, gameStarted, showCheer]);

  // AI Player Logic
  useEffect(() => {
    if (!gameStarted || winner || !isSinglePlayer || p2Answered || !p2Q) return;

    // AI speed depends on difficulty
    const baseDelay = difficulty === "Easy" ? 3500 : difficulty === "Medium" ? 2500 : 1800;
    const fuzz = Math.random() * 1500;
    const totalDelay = baseDelay + fuzz;

    const aiTimer = setTimeout(() => {
      if (p2Answered || winner || !gameStarted || !p2Q) return;

      // AI Accuracy depends on difficulty
      const accuracyRate = difficulty === "Easy" ? 0.5 : difficulty === "Medium" ? 0.75 : 0.92;
      const isCorrect = Math.random() < accuracyRate;

      const correctAns = p2Q.answer;
      const wrongAns = p2Q.options.find(o => o !== correctAns) || correctAns;

      handleAnswer(2, isCorrect ? correctAns : wrongAns);
    }, totalDelay);

    return () => clearTimeout(aiTimer);
  }, [gameStarted, winner, isSinglePlayer, p2Answered, p2Q, difficulty]); // handleAnswer isn't stable unless wrapped in useCallback, so omitting it here is fine since we recreate the effect on inputs changing

  // Advance when both answered
  useEffect(() => {
    if (gameStarted && p1Answered && p2Answered && !winner) advanceRound();
  }, [gameStarted, p1Answered, p2Answered, winner, advanceRound]);

  const handleAnswer = (player, opt) => {
    if (!gameStarted || winner) return;
    const q = player === 1 ? p1Q : p2Q;
    const correct = opt === q.answer;
    const timeTaken = Date.now() - (questionStartTimeRef.current || Date.now());

    // Helper to process powerup grant
    const checkGrantPowerup = (currentStreak) => {
      if (currentStreak > 0 && currentStreak % 3 === 0) {
        const types = ["shield", "turbo", "freeze"];
        const pu = types[Math.floor(Math.random() * types.length)];
        const info = POWERUPS[pu];
        if (pu === "freeze") setTimeLeft(t => t + 5);
        showCheer(`${player === 1 ? displayP1Name : displayP2Name} got ${info.icon} ${info.name}!`, "#A78BFA", "✨");
        if (pu !== "freeze") player === 1 ? setP1Powerup(pu) : setP2Powerup(pu);
      }
    };

    if (player === 1) {
      setP1Feedback(opt); setP1Answered(true);
      setP1Stats(s => ({ ...s, attempts: s.attempts + 1, totalAnswerTimeMs: s.totalAnswerTimeMs + timeTaken }));
      if (correct) {
        playCorrectSound();
        const moveAmount = p1Powerup === "turbo" ? 2 : 1;
        if (p1Powerup === "turbo") setP1Powerup(null); // consume turbo

        const np = p1Progress + moveAmount;
        const nextStreak = p1Streak + 1;
        setP1Progress(np);
        setP1Streak(nextStreak);
        setP1Stats(s => ({ ...s, maxStreak: Math.max(s.maxStreak, nextStreak) }));

        showCheer(
          nextStreak >= 3 ? `${displayP1Name} is on fire! x${nextStreak}` : `${displayP1Name}: ${pickRandom(CORRECT_CHEERS)}`,
          nextStreak >= 3 ? "#FFB800" : "#00D28C",
          nextStreak >= 3 ? "🔥" : "🎉"
        );
        checkGrantPowerup(nextStreak);

        if (np >= TOTAL_QUESTIONS) {
          clearInterval(timerRef.current);
          setWinner(1);
          setEndReason("finish");
          playWinSound();
        }
      } else {
        playWrongSound();
        if (p1Powerup === "shield") {
          setP1Powerup(null); // consume shield
          showCheer(`Shield protected ${displayP1Name}!`, "#4DFFDB", "🛡️");
        } else {
          setP1Streak(0);
          showCheer(`${displayP1Name}: ${pickRandom(MISS_CHEERS)}`, "#FF6B93", "💪");
        }
      }
    } else {
      setP2Feedback(opt); setP2Answered(true);
      setP2Stats(s => ({ ...s, attempts: s.attempts + 1, totalAnswerTimeMs: s.totalAnswerTimeMs + timeTaken }));
      if (correct) {
        playCorrectSound();
        const moveAmount = p2Powerup === "turbo" ? 2 : 1;
        if (p2Powerup === "turbo") setP2Powerup(null); // consume turbo

        const np = p2Progress + moveAmount;
        const nextStreak = p2Streak + 1;
        setP2Progress(np);
        setP2Streak(nextStreak);
        setP2Stats(s => ({ ...s, maxStreak: Math.max(s.maxStreak, nextStreak) }));

        showCheer(
          nextStreak >= 3 ? `${displayP2Name} is on fire! x${nextStreak}` : `${displayP2Name}: ${pickRandom(CORRECT_CHEERS)}`,
          nextStreak >= 3 ? "#FFB800" : "#00D28C",
          nextStreak >= 3 ? "🔥" : "🎉"
        );
        checkGrantPowerup(nextStreak);

        if (np >= TOTAL_QUESTIONS) {
          clearInterval(timerRef.current);
          setWinner(2);
          setEndReason("finish");
          playWinSound();
        }
      } else {
        playWrongSound();
        if (p2Powerup === "shield") {
          setP2Powerup(null); // consume shield
          showCheer(`Shield protected ${displayP2Name}!`, "#4DFFDB", "🛡️");
        } else {
          setP2Streak(0);
          showCheer(`${displayP2Name}: ${pickRandom(MISS_CHEERS)}`, "#FF6B93", "💪");
        }
      }
    }
  };

  const restart = () => {
    clearInterval(timerRef.current);
    clearTimeout(cheerTimeoutRef.current);
    setQuestionBank(createQuestionBank(difficulty, TOTAL_QUESTIONS, subject));
    setQuestionIndex(0); setP1Progress(0); setP2Progress(0);
    setP1Feedback(null); setP2Feedback(null);
    setP1Streak(0); setP2Streak(0);
    setP1Powerup(null); setP2Powerup(null);
    setP1Stats({ attempts: 0, maxStreak: 0, totalAnswerTimeMs: 0 });
    setP2Stats({ attempts: 0, maxStreak: 0, totalAnswerTimeMs: 0 });
    setP1Answered(false); setP2Answered(false);
    setCheer(null);
    setTimeLeft(TIMER_DURATION); setWinner(null); setGameStarted(false); setEndReason(null);
    setRoundKey(k => k + 1);
    questionStartTimeRef.current = null;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080818; overflow-x: hidden; }
        @keyframes twinkle  { from { opacity: 0.12; } to { opacity: 0.85; } }
        @keyframes fall     { 0% { transform: translateY(0) rotate(0deg); opacity:1; } 100% { transform: translateY(108vh) rotate(560deg); opacity:0; } }
        @keyframes floatUp  { from { transform: translateY(0); opacity: 1; } to { transform: translateY(-400px); opacity: 0; } }
        @keyframes fadeIn   { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popIn    { from { opacity:0; transform:scale(0.65); } to { opacity:1; transform:scale(1); } }
        @keyframes bounce   { from { transform: translateY(0); } to { transform: translateY(-12px); } }
        @keyframes shake    { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-5px)} 75%{transform:translateX(5px)} }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      <CheerToast cheer={cheer} />

      <div style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 25% 15%, #200840 0%, #080818 55%, #001530 100%)",
        fontFamily: "'Fredoka One', cursive",
        padding: "14px 18px",
        display: "flex", flexDirection: "column", gap: 14
      }}>

        {/* ── HEADER ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>

          {/* Title and Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{
              fontSize: "clamp(22px, 3.2vw, 36px)",
              backgroundImage: subject === "Math"
                ? "linear-gradient(135deg, #FF3D6E, #FF9A3C)"
                : "linear-gradient(135deg, #A78BFA, #60A5FA)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text", color: "transparent",
              filter: subject === "Math"
                ? "drop-shadow(0 2px 8px rgba(255,61,110,0.3))"
                : "drop-shadow(0 2px 8px rgba(167,139,250,0.3))"
            }}>🏎️ {subject} Race!</div>

            {!gameStarted && !gameOver && (
              <div style={{ display: "flex", gap: 10 }}>
                {/* Subject Selector */}
                <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 10, padding: 4, display: "flex", border: "1px solid rgba(255,255,255,0.13)" }}>
                  {["Math", "English"].map(s => (
                    <button key={s} onClick={() => { setSubject(s); setQuestionBank(createQuestionBank(difficulty, TOTAL_QUESTIONS, s)); }}
                      style={{
                        background: subject === s ? "rgba(255,255,255,0.15)" : "transparent",
                        border: "none", borderRadius: 8, padding: "6px 14px",
                        color: subject === s ? "white" : "rgba(255,255,255,0.5)",
                        fontFamily: "Nunito, sans-serif", fontWeight: 700, cursor: "pointer", transition: "all 0.2s"
                      }}>
                      {s === "Math" ? "🔢 " : "🔤 "}{s}
                    </button>
                  ))}
                </div>

                {/* Difficulty Selector */}
                <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 10, padding: 4, display: "flex", border: "1px solid rgba(255,255,255,0.13)" }}>
                  {["Easy", "Medium", "Hard"].map(d => (
                    <button key={d} onClick={() => { setDifficulty(d); setQuestionBank(createQuestionBank(d, TOTAL_QUESTIONS, subject)); }}
                      style={{
                        background: difficulty === d ? "rgba(255,255,255,0.15)" : "transparent",
                        border: "none", borderRadius: 8, padding: "6px 14px",
                        color: difficulty === d ? "white" : "rgba(255,255,255,0.5)",
                        fontFamily: "Nunito, sans-serif", fontWeight: 700, cursor: "pointer", transition: "all 0.2s"
                      }}>
                      {d}
                    </button>
                  ))}
                </div>

                {/* Mode Selector */}
                <button onClick={() => setIsSinglePlayer(v => !v)}
                  style={{
                    background: isSinglePlayer ? "rgba(167,139,250,0.2)" : "rgba(255,255,255,0.07)",
                    border: `1px solid ${isSinglePlayer ? "#A78BFA" : "rgba(255,255,255,0.13)"}`,
                    borderRadius: 10, padding: "6px 16px",
                    color: isSinglePlayer ? "#E7D7FF" : "rgba(255,255,255,0.7)",
                    fontFamily: "Nunito, sans-serif", fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
                    display: "flex", alignItems: "center", gap: 6
                  }}>
                  {isSinglePlayer ? "🤖 vs AI" : "👥 2-Player"}
                </button>
              </div>
            )}

            {!gameStarted && !gameOver && (
              <div style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap", justifyContent: "center" }}>
                <span style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Nunito, sans-serif", fontSize: 13, width: "100%", textAlign: "center", marginBottom: -4 }}>Track Theme</span>
                {Object.values(TRACK_THEMES).map(t => (
                  <button key={t.id} onClick={() => setTheme(t.id)}
                    style={{
                      background: theme === t.id ? "rgba(0,201,167,0.2)" : "rgba(255,255,255,0.07)",
                      border: `1px solid ${theme === t.id ? "#00C9A7" : "rgba(255,255,255,0.13)"}`,
                      borderRadius: 10, padding: "6px 14px",
                      color: theme === t.id ? "#4DFFDB" : "rgba(255,255,255,0.7)",
                      fontFamily: "Nunito, sans-serif", fontWeight: 700, cursor: "pointer", transition: "all 0.2s"
                    }}>
                    {t.icon} {t.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Question counter + timer */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{
              background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.13)",
              borderRadius: 18, padding: "8px 20px",
              display: "flex", alignItems: "center", gap: 10
            }}>
              <span style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Nunito, sans-serif", fontSize: 13 }}>Question</span>
              <span style={{ color: "white", fontFamily: "'Fredoka One', cursive", fontSize: 26 }}>
                {Math.min(questionIndex + 1, TOTAL_QUESTIONS)}
              </span>
              <span style={{ color: "rgba(255,255,255,0.28)", fontSize: 18 }}>/</span>
              <span style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Fredoka One', cursive", fontSize: 22 }}>
                {TOTAL_QUESTIONS}
              </span>
            </div>
            <TimerRing timeLeft={timeLeft} total={TIMER_DURATION} />
          </div>

          {!gameStarted && !gameOver && (
            <button onClick={() => {
              playStartSound();
              setGameStarted(true);
              showCheer("Let's race and solve!", "#60A5FA", "🚦");
            }}
              style={{
                background: "linear-gradient(135deg, #00C9A7, #4DFFDB)",
                border: "none",
                borderRadius: 14, padding: "11px 22px",
                fontFamily: "'Fredoka One', cursive", fontSize: 17, color: "#042520",
                cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
                boxShadow: "0 8px 20px rgba(0,201,167,0.35)",
                transition: "all 0.2s"
              }}
              onMouseOver={e => { e.currentTarget.style.transform = "scale(1.04)"; }}
              onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; }}>
              ▶ Start
            </button>
          )}

          {/* 🔄 Reset button */}
          <button onClick={restart}
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "2px solid rgba(255,255,255,0.18)",
              borderRadius: 14, padding: "11px 22px",
              fontFamily: "'Fredoka One', cursive", fontSize: 17, color: "white",
              cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
              transition: "all 0.2s", backdropFilter: "blur(8px)"
            }}
            onMouseOver={e => { e.currentTarget.style.background = "rgba(255,61,110,0.22)"; e.currentTarget.style.borderColor = "#FF3D6E"; }}
            onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; }}>
            🔄 Reset
          </button>
        </div>

        {/* ── MAIN GRID ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 255px 1fr",
          gap: 14, alignItems: "start", flex: 1
        }}>
          <PlayerPanel player={1} name={p1Name} onNameChange={setP1Name} question={p1Q}
            vehicle={p1Vehicle} onVehicleChange={gameStarted ? null : setP1VehicleId}
            canAnswer={gameStarted}
            streak={p1Streak}
            powerup={p1Powerup}
            resultBanner={p1ResultBanner}
            onAnswer={opt => handleAnswer(1, opt)}
            feedback={p1Feedback} answered={p1Answered} accent="#FF3D6E" />

          <RaceTrack
            p1Progress={p1Progress}
            p2Progress={p2Progress}
            p1Name={displayP1Name}
            p2Name={displayP2Name}
            total={TOTAL_QUESTIONS}
            p1Vehicle={p1Vehicle}
            p2Vehicle={p2Vehicle}
            theme={theme}
          />

          <PlayerPanel player={2} name={isSinglePlayer ? "Robot" : p2Name} onNameChange={setP2Name} question={p2Q}
            vehicle={p2Vehicle} onVehicleChange={gameStarted || isSinglePlayer ? null : setP2VehicleId}
            canAnswer={gameStarted && !isSinglePlayer}
            streak={p2Streak}
            powerup={p2Powerup}
            resultBanner={p2ResultBanner}
            onAnswer={opt => handleAnswer(2, opt)}
            feedback={p2Feedback} answered={p2Answered} accent="#00C9A7" />
        </div>

        {/* ── PROGRESS BARS ── */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          background: "rgba(255,255,255,0.05)", borderRadius: 14,
          padding: "10px 18px", border: "1px solid rgba(255,255,255,0.07)"
        }}>
          <span style={{ color: "#FF6B93", fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: 15, whiteSpace: "nowrap" }}>🚗 {displayP1Name}</span>
          <div style={{ flex: 1, height: 12, background: "rgba(255,255,255,0.07)", borderRadius: 8, overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 8,
              width: `${(p1Progress / TOTAL_QUESTIONS) * 100}%`,
              background: "linear-gradient(90deg, #FF3D6E, #FF8566)",
              transition: "width 0.65s cubic-bezier(0.34,1.56,0.64,1)",
              boxShadow: "0 0 10px #FF3D6E88"
            }} />
          </div>
          <div style={{ width: 2, height: 12, background: "rgba(255,255,255,0.12)", borderRadius: 2 }} />
          <div style={{ flex: 1, height: 12, background: "rgba(255,255,255,0.07)", borderRadius: 8, overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 8, float: "right",
              width: `${(p2Progress / TOTAL_QUESTIONS) * 100}%`,
              background: "linear-gradient(270deg, #00C9A7, #4DFFDB)",
              transition: "width 0.65s cubic-bezier(0.34,1.56,0.64,1)",
              boxShadow: "0 0 10px #00C9A788"
            }} />
          </div>
          <span style={{ color: "#4DFFDB", fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: 15, whiteSpace: "nowrap" }}>{displayP2Name} 🚙</span>
        </div>

        {/* Grade/Difficulty label */}
        <div style={{ textAlign: "center" }}>
          <span style={{
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 20, padding: "4px 18px",
            color: "rgba(255,255,255,0.35)", fontFamily: "Nunito, sans-serif", fontSize: 12
          }}>
            {subject === "Math" ? (
              <>
                {difficulty === "Easy" && "➕ Addition Numbers to 10"}
                {difficulty === "Medium" && "➕ ➖ ✖️ Numbers to 20"}
                {difficulty === "Hard" && "➕ ➖ ✖️ ➗ Numbers to 100"}
              </>
            ) : (
              <>
                {difficulty === "Easy" && "🔤 Basic Vocab & Rhymes"}
                {difficulty === "Medium" && "🔤 Colors, Shapes & Opposites"}
                {difficulty === "Hard" && "🔤 Occupations, Places & Grammar"}
              </>
            )}
          </span>
        </div>
      </div>

      {/* Winner Banner */}
      {winner && (endReason === "finish" || endReason === "questions") && (
        <WinnerBanner
          winner={winner}
          winnerName={winner === 1 ? displayP1Name : displayP2Name}
          mode={endReason}
          onRestart={restart}
          stats={winner === 1 ? {
            score: p1Progress, attempts: p1Stats.attempts, maxStreak: p1Stats.maxStreak,
            avgTime: p1Stats.attempts ? p1Stats.totalAnswerTimeMs / p1Stats.attempts : 0,
            p1Vehicle, p2Vehicle
          } : {
            score: p2Progress, attempts: p2Stats.attempts, maxStreak: p2Stats.maxStreak,
            avgTime: p2Stats.attempts ? p2Stats.totalAnswerTimeMs / p2Stats.attempts : 0,
            p1Vehicle, p2Vehicle
          }}
        />
      )}
      {isTie && (
        <TieBanner
          p1Name={displayP1Name}
          p2Name={displayP2Name}
          score={p1Progress}
          onRestart={restart}
        />
      )}
    </>
  );
}
