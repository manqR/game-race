import React from "react";

// Props:
// - secondsLeft: number    → seconds remaining in the session
export default function SessionTimerBadge({ secondsLeft }) {
  if (secondsLeft === null) return null; // no limit set

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const display = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  const isUrgent = secondsLeft <= 300; // last 5 minutes

  return (
    <div style={{
      position: "fixed", top: 16, right: 16, zIndex: 990,
      background: isUrgent ? "rgba(255,61,110,0.2)" : "rgba(0,0,0,0.5)",
      border: `1px solid ${isUrgent ? "#FF3D6E" : "rgba(255,255,255,0.2)"}`,
      borderRadius: 12, padding: "6px 14px",
      display: "flex", alignItems: "center", gap: 8,
      backdropFilter: "blur(8px)",
      animation: isUrgent ? "shake 0.4s ease infinite" : "none",
    }}>
      <span style={{ fontSize: 16 }}>{isUrgent ? "⚠️" : "⏱️"}</span>
      <span style={{
        fontFamily: "'Fredoka One', cursive",
        fontSize: 18,
        color: isUrgent ? "#FF6B93" : "white",
      }}>
        {display}
      </span>
    </div>
  );
}
