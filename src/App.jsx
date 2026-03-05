import { useState, useEffect, useCallback, useRef } from "react";

// ─── Grade 1 Questions: + and − only, numbers 1–10 ───────────────────────────
const QUESTION_BANK = [
  // Player 1
  [
    { q: "3 + 4 = ?", options: ["6", "7"], answer: "7" },
    { q: "8 − 3 = ?", options: ["5", "6"], answer: "5" },
    { q: "2 + 5 = ?", options: ["7", "8"], answer: "7" },
    { q: "9 − 4 = ?", options: ["4", "5"], answer: "5" },
    { q: "1 + 6 = ?", options: ["6", "7"], answer: "7" },
    { q: "10 − 3 = ?", options: ["6", "7"], answer: "7" },
  ],
  // Player 2
  [
    { q: "5 + 2 = ?", options: ["6", "7"], answer: "7" },
    { q: "7 − 2 = ?", options: ["4", "5"], answer: "5" },
    { q: "4 + 3 = ?", options: ["6", "7"], answer: "7" },
    { q: "8 − 5 = ?", options: ["2", "3"], answer: "3" },
    { q: "3 + 5 = ?", options: ["7", "8"], answer: "8" },
    { q: "9 − 2 = ?", options: ["6", "7"], answer: "7" },
  ],
];

const TOTAL_QUESTIONS = 6;
const TIMER_DURATION = 10;
const getDisplayName = (name, player) => (name || "").trim() || `Player ${player}`;

// ─── SVG Cars ─────────────────────────────────────────────────────────────────
function Car1() {
  return (
    <svg viewBox="0 0 80 48" width="76" height="46"
      style={{ filter: "drop-shadow(0 4px 10px rgba(255,61,110,0.5))" }}>
      <ellipse cx="40" cy="40" rx="30" ry="5" fill="rgba(0,0,0,0.25)" />
      <rect x="8" y="20" width="64" height="18" rx="7" fill="#FF3D6E" />
      <rect x="16" y="10" width="44" height="16" rx="5" fill="#FF6B93" />
      <rect x="20" y="12" width="17" height="10" rx="3" fill="#CCF0FF" opacity="0.9" />
      <rect x="41" y="12" width="14" height="10" rx="3" fill="#CCF0FF" opacity="0.9" />
      <circle cx="21" cy="36" r="7" fill="#222" /><circle cx="21" cy="36" r="4" fill="#777" /><circle cx="21" cy="36" r="1.5" fill="#ddd" />
      <circle cx="59" cy="36" r="7" fill="#222" /><circle cx="59" cy="36" r="4" fill="#777" /><circle cx="59" cy="36" r="1.5" fill="#ddd" />
      <rect x="66" y="23" width="9" height="6" rx="2" fill="#FFE566" />
      <rect x="5" y="23" width="7" height="5" rx="2" fill="#FF9999" opacity="0.8" />
      <text x="32" y="33" fontSize="9" fill="white" fontWeight="bold" fontFamily="Arial">P1</text>
    </svg>
  );
}

function Car2() {
  return (
    <svg viewBox="0 0 80 48" width="76" height="46"
      style={{ filter: "drop-shadow(0 4px 10px rgba(0,201,167,0.5))" }}>
      <ellipse cx="40" cy="40" rx="30" ry="5" fill="rgba(0,0,0,0.25)" />
      <rect x="8" y="20" width="64" height="18" rx="7" fill="#00C9A7" />
      <rect x="16" y="10" width="44" height="16" rx="5" fill="#4DFFDB" />
      <rect x="20" y="12" width="17" height="10" rx="3" fill="#CCF0FF" opacity="0.9" />
      <rect x="41" y="12" width="14" height="10" rx="3" fill="#CCF0FF" opacity="0.9" />
      <circle cx="21" cy="36" r="7" fill="#222" /><circle cx="21" cy="36" r="4" fill="#777" /><circle cx="21" cy="36" r="1.5" fill="#ddd" />
      <circle cx="59" cy="36" r="7" fill="#222" /><circle cx="59" cy="36" r="4" fill="#777" /><circle cx="59" cy="36" r="1.5" fill="#ddd" />
      <rect x="66" y="23" width="9" height="6" rx="2" fill="#FFE566" />
      <rect x="5" y="23" width="7" height="5" rx="2" fill="#FF9999" opacity="0.8" />
      <text x="32" y="33" fontSize="9" fill="white" fontWeight="bold" fontFamily="Arial">P2</text>
    </svg>
  );
}

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

// ─── Race Track ───────────────────────────────────────────────────────────────
function RaceTrack({ p1Progress, p2Progress, p1Name, p2Name, total }) {
  const trackH = 400;
  const usable = trackH - 90;
  const p1Y = usable - (p1Progress / total) * usable;
  const p2Y = usable - (p2Progress / total) * usable;

  return (
    <div style={{
      width: "100%", height: trackH, position: "relative",
      background: "linear-gradient(180deg, #0d1b4b 0%, #112040 45%, #1a3a6b 100%)",
      borderRadius: 24, overflow: "hidden",
      border: "3px solid rgba(255,255,255,0.12)",
      boxShadow: "inset 0 0 50px rgba(0,0,0,0.4), 0 8px 28px rgba(0,0,0,0.4)"
    }}>
      {/* Stars */}
      {[...Array(18)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: i % 4 === 0 ? 3 : 2, height: i % 4 === 0 ? 3 : 2,
          borderRadius: "50%", background: "white",
          left: `${(i * 41 + 9) % 88 + 6}%`,
          top: `${(i * 57 + 5) % 70 + 8}%`,
          opacity: 0.25 + (i % 5) * 0.12,
          animation: `twinkle ${1.4 + (i % 3) * 0.6}s ease-in-out infinite alternate`,
          animationDelay: `${i * 0.18}s`
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
      <div style={{ position: "absolute", left: "50%", top: 58, bottom: 18, width: 2, transform: "translateX(-50%)", background: "repeating-linear-gradient(180deg,rgba(255,255,255,0.22) 0,rgba(255,255,255,0.22) 18px,transparent 18px,transparent 36px)" }} />

      {/* P1 Car */}
      <div style={{ position: "absolute", left: "12%", top: p1Y + 44, transition: "top 0.65s cubic-bezier(0.34,1.56,0.64,1)", zIndex: 5 }}>
        <Car1 />
      </div>

      {/* P2 Car */}
      <div style={{ position: "absolute", right: "12%", top: p2Y + 44, transition: "top 0.65s cubic-bezier(0.34,1.56,0.64,1)", zIndex: 5 }}>
        <Car2 />
      </div>

      {/* Bottom labels */}
      <div style={{ position: "absolute", bottom: 6, left: 0, right: 0, display: "flex", justifyContent: "space-around" }}>
        <span style={{ color: "#FF6B93", fontFamily: "'Fredoka One', cursive", fontSize: 13 }}>🚗 {p1Name}: {p1Progress}/{total}</span>
        <span style={{ color: "#4DFFDB", fontFamily: "'Fredoka One', cursive", fontSize: 13 }}>🚙 {p2Name}: {p2Progress}/{total}</span>
      </div>
    </div>
  );
}

// ─── Player Panel ─────────────────────────────────────────────────────────────
function PlayerPanel({ player, name, onNameChange, question, onAnswer, feedback, answered, canAnswer, resultBanner, accent, emoji }) {
  if (!question) return null;
  const labelColors = ["#FFB800", "#A78BFA"];

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
        }}>{emoji}</div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <input
            value={name}
            onChange={e => onNameChange(e.target.value)}
            placeholder={`Player ${player}`}
            maxLength={18}
            style={{
              width: "100%",
              color: accent,
              background: "rgba(255,255,255,0.07)",
              border: `1px solid ${accent}66`,
              borderRadius: 10,
              padding: "7px 10px",
              fontFamily: "'Fredoka One', cursive",
              fontSize: 18,
              lineHeight: 1.1,
              outline: "none"
            }}
          />
          <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, fontFamily: "Nunito, sans-serif" }}>
            {canAnswer ? "pick the right answer!" : "press start to begin!"}
          </div>
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
        <div style={{ color: "rgba(255,255,255,0.45)", fontFamily: "Nunito, sans-serif", fontSize: 12, marginBottom: 6 }}>What is…</div>
        <div style={{ color: "white", fontFamily: "'Fredoka One', cursive", fontSize: "clamp(32px,4.5vw,44px)", lineHeight: 1.1 }}>
          {question.q}
        </div>
      </div>

      {/* Buttons */}
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
                background: `${labelColors[i]}1a`, border: `2px solid ${labelColors[i]}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Fredoka One', cursive", fontSize: 17, color: labelColors[i]
              }}>{i === 0 ? "A" : "B"}</div>
              <span style={{ color: "white", fontFamily: "'Fredoka One', cursive", fontSize: "clamp(24px,3.5vw,34px)", flex: 1, textAlign: "center" }}>
                {opt}
              </span>
              {icon && <span style={{ fontSize: 22 }}>{icon}</span>}
            </button>
          );
        })}
      </div>

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

// ─── Winner Banner ────────────────────────────────────────────────────────────
function WinnerBanner({ winner, winnerName, onRestart, mode = "finish" }) {
  const isP1 = winner === 1;
  const color = isP1 ? "#FF3D6E" : "#00C9A7";
  const emoji = isP1 ? "🚗" : "🚙";
  const message = mode === "questions" ? "won with the highest score! 🌟" : "reached the finish line first! 🏁";

  const confetti = [...Array(55)].map((_, i) => ({
    x: Math.random() * 100,
    delay: Math.random() * 1.8,
    color: ["#FF3D6E","#FFB800","#00C9A7","#A78BFA","#60A5FA","#FFD700","#FF9A3C"][i % 7],
    size: 7 + Math.random() * 11,
    dur: 1.8 + Math.random() * 2
  }));

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 999,
      background: "rgba(4,4,18,0.9)", backdropFilter: "blur(12px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      animation: "fadeIn 0.35s ease"
    }}>
      {/* Confetti pieces */}
      {confetti.map((c, i) => (
        <div key={i} style={{
          position: "absolute", left: `${c.x}%`, top: -18,
          width: c.size, height: c.size,
          borderRadius: i % 3 === 0 ? "50%" : 3,
          background: c.color,
          animation: `fall ${c.dur}s ${c.delay}s ease-in infinite`
        }} />
      ))}

      {/* Card */}
      <div style={{
        position: "relative", zIndex: 1,
        background: "linear-gradient(145deg, #13132e, #0c0c20)",
        border: `4px solid ${color}`,
        borderRadius: 36, padding: "44px 56px",
        textAlign: "center", maxWidth: 460, width: "90%",
        boxShadow: `0 0 90px ${color}55, 0 32px 64px rgba(0,0,0,0.75)`,
        animation: "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1)"
      }}>
        {/* Trophy */}
        <div style={{ fontSize: 80, marginBottom: 6, display: "inline-block", animation: "bounce 0.7s ease infinite alternate" }}>🏆</div>

        <div style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Fredoka One', cursive", fontSize: 20, marginBottom: 6 }}>
          🎉 Winner! 🎉
        </div>

        <div style={{
          fontFamily: "'Fredoka One', cursive",
          fontSize: "clamp(50px,8vw,72px)",
          background: `linear-gradient(135deg, ${color}, #FFD700)`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          lineHeight: 1, marginBottom: 10
        }}>
          {winnerName}
        </div>

        <div style={{ fontSize: 60, marginBottom: 14, display: "inline-block", animation: "bounce 0.6s 0.1s ease infinite alternate" }}>
          {emoji}
        </div>

        <div style={{
          color: "rgba(255,255,255,0.6)", fontFamily: "Nunito, sans-serif",
          fontWeight: 700, fontSize: "clamp(16px,2vw,20px)", marginBottom: 36
        }}>
          {message}
        </div>

        {/* Play Again button */}
        <button onClick={onRestart}
          style={{
            background: `linear-gradient(135deg, ${color}, ${color}99)`,
            border: "none", borderRadius: 20,
            padding: "16px 48px",
            fontFamily: "'Fredoka One', cursive", fontSize: 24, color: "white",
            cursor: "pointer",
            boxShadow: `0 8px 24px ${color}55`,
            transition: "transform 0.2s, box-shadow 0.2s",
            display: "inline-flex", alignItems: "center", gap: 10
          }}
          onMouseOver={e => { e.currentTarget.style.transform = "scale(1.07)"; }}
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
  const [questionIndex, setQuestionIndex] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [endReason, setEndReason] = useState(null);
  const [p1Name, setP1Name] = useState("Player 1");
  const [p2Name, setP2Name] = useState("Player 2");
  const [p1Progress, setP1Progress] = useState(0);
  const [p2Progress, setP2Progress] = useState(0);
  const [p1Feedback, setP1Feedback] = useState(null);
  const [p2Feedback, setP2Feedback] = useState(null);
  const [p1Answered, setP1Answered] = useState(false);
  const [p2Answered, setP2Answered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [winner, setWinner] = useState(null);
  const [roundKey, setRoundKey] = useState(0);
  const timerRef = useRef(null);

  const p1Q = QUESTION_BANK[0][questionIndex] || null;
  const p2Q = QUESTION_BANK[1][questionIndex] || null;
  const displayP1Name = getDisplayName(p1Name, 1);
  const displayP2Name = getDisplayName(p2Name, 2);
  const isTie = endReason === "tie";
  const gameOver = winner !== null || isTie;
  const p1ResultBanner = endReason === "questions" && winner ? (winner === 1 ? "winner" : "loser") : null;
  const p2ResultBanner = endReason === "questions" && winner ? (winner === 2 ? "winner" : "loser") : null;

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
        }
        setGameStarted(false);
        return;
      }
      setQuestionIndex(next);
      setP1Feedback(null); setP2Feedback(null);
      setP1Answered(false); setP2Answered(false);
      setTimeLeft(TIMER_DURATION);
      setRoundKey(k => k + 1);
    }, 1400);
  }, [questionIndex, p1Progress, p2Progress]);

  // Timer countdown
  useEffect(() => {
    if (winner || !gameStarted) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setP1Answered(true);
          setP2Answered(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [roundKey, winner, gameStarted]);

  // Advance when both answered
  useEffect(() => {
    if (gameStarted && p1Answered && p2Answered && !winner) advanceRound();
  }, [gameStarted, p1Answered, p2Answered, winner, advanceRound]);

  const handleAnswer = (player, opt) => {
    if (!gameStarted || winner) return;
    const q = player === 1 ? p1Q : p2Q;
    const correct = opt === q.answer;
    if (player === 1) {
      setP1Feedback(opt); setP1Answered(true);
      if (correct) {
        const np = p1Progress + 1;
        setP1Progress(np);
        if (np >= TOTAL_QUESTIONS) {
          clearInterval(timerRef.current);
          setWinner(1);
          setEndReason("finish");
        }
      }
    } else {
      setP2Feedback(opt); setP2Answered(true);
      if (correct) {
        const np = p2Progress + 1;
        setP2Progress(np);
        if (np >= TOTAL_QUESTIONS) {
          clearInterval(timerRef.current);
          setWinner(2);
          setEndReason("finish");
        }
      }
    }
  };

  const restart = () => {
    clearInterval(timerRef.current);
    setQuestionIndex(0); setP1Progress(0); setP2Progress(0);
    setP1Feedback(null); setP2Feedback(null);
    setP1Answered(false); setP2Answered(false);
    setTimeLeft(TIMER_DURATION); setWinner(null); setGameStarted(false); setEndReason(null);
    setRoundKey(k => k + 1);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080818; overflow-x: hidden; }
        @keyframes twinkle  { from { opacity: 0.12; } to { opacity: 0.85; } }
        @keyframes fall     { 0% { transform: translateY(0) rotate(0deg); opacity:1; } 100% { transform: translateY(108vh) rotate(560deg); opacity:0; } }
        @keyframes fadeIn   { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popIn    { from { opacity:0; transform:scale(0.65); } to { opacity:1; transform:scale(1); } }
        @keyframes bounce   { from { transform: translateY(0); } to { transform: translateY(-12px); } }
        @keyframes shake    { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-5px)} 75%{transform:translateX(5px)} }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 25% 15%, #200840 0%, #080818 55%, #001530 100%)",
        fontFamily: "'Fredoka One', cursive",
        padding: "14px 18px",
        display: "flex", flexDirection: "column", gap: 14
      }}>

        {/* ── HEADER ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>

          {/* Title */}
          <div style={{
            fontSize: "clamp(22px, 3.2vw, 36px)",
            background: "linear-gradient(135deg, #FF3D6E, #FF9A3C)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 2px 8px rgba(255,61,110,0.3))"
          }}>🏎️ Math Race!</div>

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
            <button onClick={() => setGameStarted(true)}
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
          <PlayerPanel player={1} name={p1Name} onNameChange={setP1Name} question={p1Q} emoji="🚗"
            canAnswer={gameStarted}
            resultBanner={p1ResultBanner}
            onAnswer={opt => handleAnswer(1, opt)}
            feedback={p1Feedback} answered={p1Answered} accent="#FF3D6E" />

          <RaceTrack
            p1Progress={p1Progress}
            p2Progress={p2Progress}
            p1Name={displayP1Name}
            p2Name={displayP2Name}
            total={TOTAL_QUESTIONS}
          />

          <PlayerPanel player={2} name={p2Name} onNameChange={setP2Name} question={p2Q} emoji="🚙"
            canAnswer={gameStarted}
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

        {/* Grade label */}
        <div style={{ textAlign: "center" }}>
          <span style={{
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 20, padding: "4px 18px",
            color: "rgba(255,255,255,0.35)", fontFamily: "Nunito, sans-serif", fontSize: 12
          }}>
            ➕ Addition &nbsp;·&nbsp; ➖ Subtraction &nbsp;·&nbsp; Grade 1 Level
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
