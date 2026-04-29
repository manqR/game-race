import React, { useState } from "react";

// Props:
// - reason: "time" | "games"   → why the session ended
// - pin: string                → stored PIN (empty = no PIN)
// - onUnlock()                 → called when parent enters correct PIN to reset session
export default function SessionExpiredModal({ reason, pin, onUnlock }) {
  const [enteredPin, setEnteredPin] = useState("");
  const [showPinInput, setShowPinInput] = useState(false);
  const [pinError, setPinError] = useState(false);

  const handleUnlockAttempt = () => {
    if (!pin || enteredPin === pin) {
      onUnlock(); // correct or no PIN
    } else {
      setPinError(true);
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={cardStyle}>
        <div style={{ fontSize: 72, marginBottom: 8 }}>⛔</div>

        <div style={titleStyle}>
          {reason === "time" ? "Time's Up!" : "Game Limit Reached!"}
        </div>

        <div style={{ color: "rgba(255,255,255,0.65)", fontFamily: "Nunito", fontSize: 16, textAlign: "center", marginBottom: 24 }}>
          {reason === "time"
            ? "Your playtime for today is finished. Come back tomorrow! 🌙"
            : "You've played all your games for today. See you tomorrow! 🌙"}
        </div>

        {/* Show unlock option */}
        {!showPinInput ? (
          <button onClick={() => setShowPinInput(true)} style={unlockBtnStyle}>
            🔑 Parent Unlock
          </button>
        ) : (
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
            <input
              type="password"
              maxLength={4}
              value={enteredPin}
              onChange={e => { setEnteredPin(e.target.value); setPinError(false); }}
              placeholder={pin ? "Enter PIN" : "No PIN set — click Unlock"}
              style={inputStyle}
            />
            {pinError && <div style={{ color: "#FF3D6E", fontFamily: "Nunito", fontSize: 13 }}>Wrong PIN ❌</div>}
            <button onClick={handleUnlockAttempt} style={unlockBtnStyle}>✅ Unlock & Reset</button>
          </div>
        )}
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed", inset: 0, zIndex: 9999,
  background: "rgba(4,4,20,0.98)", backdropFilter: "blur(16px)",
  display: "flex", alignItems: "center", justifyContent: "center",
};
const cardStyle = {
  background: "linear-gradient(145deg, #2a0a1a, #1a0808)",
  border: "3px solid #FF3D6E", borderRadius: 28,
  padding: "40px 32px", width: "90%", maxWidth: 400,
  display: "flex", flexDirection: "column", alignItems: "center",
  boxShadow: "0 20px 50px rgba(0,0,0,0.7), 0 0 60px rgba(255,61,110,0.3)",
  animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)",
};
const titleStyle = {
  fontFamily: "'Fredoka One', cursive", fontSize: 32, color: "#FF6B93",
  marginBottom: 12, textAlign: "center",
};
const inputStyle = {
  width: "100%", padding: "12px 16px",
  background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,61,110,0.4)",
  borderRadius: 12, color: "white", fontFamily: "Nunito, sans-serif",
  fontSize: 18, outline: "none",
};
const unlockBtnStyle = {
  width: "100%", padding: "12px",
  background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
  borderRadius: 12, color: "white", fontFamily: "Nunito, sans-serif",
  fontSize: 16, fontWeight: 800, cursor: "pointer",
};
