// playerHistory.js
// Handles saving and loading player history from localStorage
// to adapt future questions to their weakness and answer speed.

const HISTORY_KEY_PREFIX = "mathrace_history_";

/**
 * Load history for a specific player and subject from localStorage.
 */
export const getPlayerHistory = (playerName, subject) => {
  if (!playerName) return null;
  const key = `${HISTORY_KEY_PREFIX}${playerName.trim().toLowerCase()}_${subject.toLowerCase()}`;
  try {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Failed to load player history:", e);
  }
  return { playerName, subject, history: [] };
};

/**
 * Save a game session to the player's history in localStorage.
 */
export const saveGameHistory = (playerName, subject, sessionData) => {
  if (!playerName || !subject) return;
  const key = `${HISTORY_KEY_PREFIX}${playerName.trim().toLowerCase()}_${subject.toLowerCase()}`;

  try {
    const current = getPlayerHistory(playerName, subject) || { playerName, subject, history: [] };
    
    // Add new session to history
    const newSession = {
      playedAt: new Date().toISOString(),
      difficulty: sessionData.difficulty || "easy",
      weakTypes: sessionData.weakTypes || [],
      usedNumbers: sessionData.usedNumbers || [],
      avgAnswerTimeMs: sessionData.avgAnswerTimeMs || 0,
      totalQuestions: sessionData.totalQuestions || 10,
      correctCount: sessionData.correctCount || 0
    };

    current.history.push(newSession);

    // Limit to last 5 sessions to save space
    if (current.history.length > 5) {
      current.history.shift();
    }

    localStorage.setItem(key, JSON.stringify(current));
  } catch (e) {
    console.error("Failed to save player history:", e);
  }
};

/**
 * Formulate a plain English context block to inject into the AI prompt.
 * Instructs the AI on focus areas and speed-based difficulty adjustments.
 */
export const buildHistoryContext = (playerHistory) => {
  if (!playerHistory || !playerHistory.history || playerHistory.history.length === 0) {
    return "";
  }

  const history = playerHistory.history;
  const lastSession = history[history.length - 1];

  // 1. Gather all weak types (anything they got wrong in the last 3 sessions)
  const weakTypesMap = {};
  history.slice(-3).forEach(session => {
    session.weakTypes.forEach(type => {
      weakTypesMap[type] = (weakTypesMap[type] || 0) + 1;
    });
  });
  const weakTypes = Object.keys(weakTypesMap);

  // 2. Gather used numbers/words from the last session to ensure uniqueness
  const usedNumbers = lastSession.usedNumbers || [];

  // 3. Determine speed profile and dynamic difficulty adjustment
  // Fast is average < 4 seconds, slow is average > 12 seconds
  const totalMs = history.reduce((sum, s) => sum + s.avgAnswerTimeMs, 0);
  const avgMs = totalMs / history.length;
  const avgSec = avgMs / 1000;

  let speedInstruction = "";
  if (avgSec > 0 && avgSec < 4) {
    speedInstruction = "The player is answering questions very quickly! Make the questions slightly MORE challenging and advanced for this level (e.g. use larger numbers, more complex words, or trickier patterns).";
  } else if (avgSec > 12) {
    speedInstruction = "The player is answering slowly. Keep the questions simple, clear, and direct.";
  } else {
    speedInstruction = "The player has a standard response speed. Keep difficulty balanced.";
  }

  let context = `\n\n=== PLAYER ADAPTIVE HISTORY CONTEXT ===\n`;
  context += `You are generating questions for a player named "${playerHistory.playerName}".\n`;
  
  if (weakTypes.length > 0) {
    context += `- Weak Areas: The player struggled with these question types recently: ${weakTypes.join(", ")}. Please include MORE questions of these types to help them practice.\n`;
  }
  
  if (usedNumbers.length > 0) {
    context += `- Uniqueness Rule: The player recently saw questions with these numbers/words: ${usedNumbers.join(", ")}. Do NOT repeat these specific numbers or words in your questions. Use different ones.\n`;
  }

  context += `- Speed Adjustment: ${speedInstruction}\n`;
  context += `=======================================\n`;

  return context;
};
