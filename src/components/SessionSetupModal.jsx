import React, { useState } from "react";

// This component receives:
// - onConfirm(maxMinutes, maxGames, pin) → called when parent clicks Start
// - existingPin → if a PIN was saved before, show a PIN entry first
export default function SessionSetupModal({ onConfirm, existingPin }) {
  const [minutes, setMinutes] = useState(60);      // default 60 min
  const [maxGames, setMaxGames] = useState(10);    // default 10 games
  const [pin, setPin] = useState("");              // new PIN to set
  const [enteredPin, setEnteredPin] = useState(""); // PIN the parent types to unlock
  const [pinError, setPinError] = useState(false); // show error if wrong PIN

  // If there is an existing PIN, show a PIN unlock screen first
  if (existingPin && enteredPin !== existingPin) {
    return (
      <div style={overlayStyle}>
        <div style={cardStyle}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🔑</div>
          <div style={titleStyle}>Enter PIN to Change Settings</div>
          <input
            type="password"
            maxLength={4}
            value={enteredPin}
            onChange={e => { setEnteredPin(e.target.value); setPinError(false); }}
            placeholder="4-digit PIN"
            style={inputStyle}
          />
          {pinError && (
            <div style={{ color: "#FF3D6E", fontFamily: "Nunito", fontSize: 14, marginTop: 4 }}>
              ❌ Wrong PIN. Try again.
            </div>
          )}
          <button
            onClick={() => { if (enteredPin !== existingPin) setPinError(true); }}
            style={buttonStyle}
          >
            Unlock ✅
          </button>
        </div>
      </div>
    );
  }

  // Main setup form
  return (
    <div style={overlayStyle}>
      <div style={cardStyle}>
        <div style={{ fontSize: 48, marginBottom: 4 }}>⏱️</div>
        <div style={titleStyle}>Set Playtime Limits</div>
        <div style={{ color: "rgba(255,255,255,0.55)", fontFamily: "Nunito", fontSize: 14, marginBottom: 20 }}>
          Configure how long and how many games kids can play today.
        </div>

        {/* Time Limit */}
        <label style={labelStyle}>Max Playtime (minutes)</label>
        <input
          type="number"
          min={5} max={480}
          value={minutes}
          onChange={e => setMinutes(Number(e.target.value))}
          style={inputStyle}
        />

        {/* Game Count Limit */}
        <label style={labelStyle}>Max Games Allowed</label>
        <input
          type="number"
          min={1} max={50}
          value={maxGames}
          onChange={e => setMaxGames(Number(e.target.value))}
          style={inputStyle}
        />

        {/* Optional PIN */}
        <label style={labelStyle}>Set PIN to protect these settings (optional)</label>
        <input
          type="password"
          maxLength={4}
          value={pin}
          onChange={e => setPin(e.target.value)}
          placeholder="Leave blank for no PIN"
          style={inputStyle}
        />

        <button
          onClick={() => onConfirm(minutes, maxGames, pin)}
          style={{ ...buttonStyle, marginTop: 16 }}
        >
          ▶ Start Session
        </button>
      </div>
    </div>
  );
}

// --- Styles (copy from App.jsx style patterns) ---
const overlayStyle = {
  position: "fixed", inset: 0, zIndex: 9998,
  background: "rgba(4,4,20,0.97)", backdropFilter: "blur(12px)",
  display: "flex", alignItems: "center", justifyContent: "center",
};
const cardStyle = {
  background: "linear-gradient(145deg, #1a1b3b, #0f0f24)",
  border: "3px solid #A78BFA", borderRadius: 28,
  padding: "36px 32px", width: "90%", maxWidth: 420,
  display: "flex", flexDirection: "column", alignItems: "center",
  boxShadow: "0 20px 50px rgba(0,0,0,0.6), 0 0 60px rgba(167,139,250,0.2)",
  animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)",
};
const titleStyle = {
  fontFamily: "'Fredoka One', cursive", fontSize: 26, color: "white",
  marginBottom: 8, textAlign: "center",
};
const labelStyle = {
  fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: 13,
  color: "rgba(255,255,255,0.6)", alignSelf: "flex-start", marginBottom: 4, marginTop: 12,
};
const inputStyle = {
  width: "100%", padding: "12px 16px",
  background: "rgba(255,255,255,0.07)", border: "1px solid rgba(167,139,250,0.4)",
  borderRadius: 12, color: "white", fontFamily: "Nunito, sans-serif",
  fontSize: 18, outline: "none",
};
const buttonStyle = {
  width: "100%", padding: "14px",
  background: "linear-gradient(135deg, #A78BFA, #60A5FA)",
  border: "none", borderRadius: 16,
  fontFamily: "'Fredoka One', cursive", fontSize: 20, color: "white",
  cursor: "pointer", boxShadow: "0 8px 24px rgba(167,139,250,0.4)",
};
