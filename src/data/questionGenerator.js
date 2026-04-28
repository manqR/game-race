// questionGenerator.js
// Calls the Grok (xAI) API to generate dynamic questions each game session.
// Falls back to the local static question banks if the API is unavailable.

import { mathQuestions } from "./mathQuestions";
import { englishQuestions } from "./englishQuestions";

const GROK_API_URL = "https://api.x.ai/v1/chat/completions";
const GROK_MODEL = "grok-3-mini";
const API_KEY = import.meta.env.VITE_GROK_API_KEY;

// ─── Prompt Templates ────────────────────────────────────────────────────────

const MATH_PROMPTS = {
  easy: `Kamu adalah generator soal matematika untuk anak SD kelas 1 (usia 6-7 tahun).
Buat tepat 30 soal pilihan ganda matematika UNIK dalam Bahasa Indonesia, level EASY.

Aturan:
- Topik: berhitung (1-20), membaca bilangan, membandingkan bilangan, mengurutkan, penjumlahan dan pengurangan sederhana.
- Angka yang digunakan: 1 sampai 20.
- Setiap soal harus berbeda, jangan ulangi angka yang sama.
- Untuk soal berhitung, gunakan emoji yang berbeda-beda (misal: 🌟 🍎 🐶 🐱 🍓 🌸 🎈 dll).
- Balikan HANYA array JSON yang valid, tanpa penjelasan apapun.
- Setiap objek harus memiliki field: "type", "level", "question", "options" (array 2-3 string), "answer".
- "answer" HARUS salah satu dari "options" yang persis sama.
- "level" selalu "easy".

Tipe soal yang harus ada (masing-masing minimal 5 soal):
1. type: "counting" — image berisi emoji, question: "Ada berapa [emoji] di atas?"
2. type: "reading_number" — image berisi emoji angka, question tentang nama bilangan
3. type: "comparing_numbers" — question berisi "X ... Y" dengan options: ["<", ">", "="]
4. type: "ordering_numbers" — question tentang mengurutkan 3 bilangan
5. type: "math" — question: "Hasil dari X + Y = ..." atau "Hasil dari X - Y = ..."

Contoh format:
[
  {"type":"counting","level":"easy","image":"🌟🌟🌟🌟🌟","question":"Ada berapa bintang di atas?","options":["5","4","6"],"answer":"5"},
  {"type":"math","level":"easy","question":"Hasil dari 3 + 7 = ...","options":["10","9","11"],"answer":"10"}
]`,

  medium: `Kamu adalah generator soal matematika untuk anak SD kelas 1 (usia 6-7 tahun).
Buat tepat 30 soal pilihan ganda matematika UNIK dalam Bahasa Indonesia, level MEDIUM.

Aturan:
- Topik: nilai tempat (puluhan & satuan), membaca/menulis bilangan 2 angka, membandingkan dengan soal cerita, penjumlahan & pengurangan 2 digit.
- Angka yang digunakan: 20 sampai 100.
- Setiap soal harus berbeda, gunakan angka dan konteks yang bervariasi.
- Balikan HANYA array JSON yang valid, tanpa penjelasan apapun.
- Setiap objek: "type", "level", "question", "options" (array 2-3 string), "answer".
- "answer" HARUS salah satu dari "options" yang persis sama.
- "level" selalu "medium".

Tipe soal yang harus ada (masing-masing minimal 5 soal):
1. type: "place_value" — soal tentang nilai tempat puluhan dan satuan
2. type: "reading_number" — soal membaca/menulis lambang bilangan 2 angka
3. type: "comparing" — soal cerita perbandingan menggunakan nama anak Indonesia (Arka, Malika, Nadhif, Zaina, Alula, Raffa, dll)
4. type: "ordering" — soal mengurutkan 4-5 bilangan 2 digit
5. type: "math" — penjumlahan dan pengurangan 2 digit

Contoh format:
[
  {"type":"place_value","level":"medium","question":"Bilangan 47 terdiri dari 4 puluhan dan ... satuan","options":["7","4","47"],"answer":"7"},
  {"type":"math","level":"medium","question":"45 + 32 = ...","options":["77","67","87"],"answer":"77"}
]`,

  hard: `Kamu adalah generator soal matematika untuk anak SD kelas 1 (usia 6-7 tahun).
Buat tepat 30 soal pilihan ganda matematika UNIK dalam Bahasa Indonesia, level HARD.

Aturan:
- Topik: nilai tempat ratusan, soal cerita kompleks, pola bilangan (loncat), mengurutkan bilangan 3 digit.
- Angka yang digunakan: 100 sampai 999.
- Setiap soal harus berbeda, gunakan konteks dan angka yang bervariasi.
- Balikan HANYA array JSON yang valid, tanpa penjelasan apapun.
- Setiap objek: "type", "level", "question", "options" (array 2-3 string), "answer".
- "answer" HARUS salah satu dari "options" yang persis sama.
- "level" selalu "hard".

Tipe soal yang harus ada (masing-masing minimal 5 soal):
1. type: "place_value" — nilai tempat ratusan, bentuk panjang bilangan 3 digit
2. type: "word_problem" — soal cerita penjumlahan/pengurangan dengan nama anak Indonesia
3. type: "pattern" — pola loncat bilangan (loncat 2, 3, 5, 10, 100)
4. type: "ordering" — mengurutkan 4 bilangan 3 digit dari terkecil/terbesar
5. type: "math" — operasi campuran dengan bilangan 3 digit

Contoh format:
[
  {"type":"place_value","level":"hard","question":"Bentuk panjang 325 adalah ...","options":["300 + 20 + 5","3 + 2 + 5","30 + 20 + 5"],"answer":"300 + 20 + 5"},
  {"type":"pattern","level":"hard","question":"Pola loncat 5: 500, 505, ..., 515. Angka yang hilang adalah ...","options":["510","508","512"],"answer":"510"}
]`,
};

const ENGLISH_PROMPTS = {
  easy: `You are a question generator for a children's English game (Grade 1 SD Indonesia, age 6-7).
Generate exactly 30 UNIQUE multiple-choice English questions at EASY difficulty.
Return ONLY a valid JSON array, no explanation whatsoever.

Topics: classroom objects (pencil, eraser, ruler, crayons, scissors, glue, sharpener), farm animals (cow, chicken, horse, duck, pig, sheep), action verbs (run, sleep, read, dance, jump, walk, sit), basic grammar (have got / has got).

Rules:
- Each object: "type", "level", "question", "options" (2-3 strings), "answer"
- "answer" MUST be exactly one of the "options"
- "level" is always "easy"
- Questions should use bilingual style: Indonesian context, English answers
- Use DIFFERENT emojis for image fields
- Make each question unique — vary the context, objects, and names

Question types needed (at least 5 each):
1. type: "vocab" — image: emoji, question: "Gambar apakah ini?" or "Apa bahasa Inggrisnya [Indonesian word]?"
2. type: "act_match" — image: action emoji, question about action verb in English
3. type: "grammar" — fill in: "I/She/They ..... a [object]." with have got / has got

Example format:
[
  {"type":"vocab","level":"easy","image":"🐮","question":"Gambar apakah ini?","options":["Cow","Duck"],"answer":"Cow"},
  {"type":"grammar","level":"easy","question":"We ..... a big farm.","options":["have got","has got"],"answer":"have got"}
]`,

  medium: `You are a question generator for a children's English game (Grade 1 SD Indonesia, age 6-7).
Generate exactly 30 UNIQUE multiple-choice English questions at MEDIUM difficulty.
Return ONLY a valid JSON array, no explanation whatsoever.

Topics: there is / there are, animal characteristics & comparisons, simple reading comprehension, spelling of simple words (3-5 letters), sentence completion.

Rules:
- Each object: "type", "level", "question", "options" (2-3 strings), "answer"
- "answer" MUST be exactly one of the "options"
- "level" is always "medium"
- Use different Indonesian names (Arka, Malika, Nadhif, Zaina, Alula, Raffa, Kara, Adist, Raqila)
- Use varied contexts, animals, classroom items
- For spelling_tap: "options" must be individual letters that spell the answer (may include shuffled extra letter)

Question types needed (at least 5 each):
1. type: "grammar" — "..... [number] [noun] [location]." with There is / There are
2. type: "reading" — reading comprehension about animals or classroom
3. type: "spelling_tap" — image: emoji, question: "Eja bahasa Inggrisnya [Indonesian word]!", options: individual letters, answer: English word (lowercase)
4. type: "completion" — sentence completion based on a short scenario

Example format:
[
  {"type":"grammar","level":"medium","question":"..... five students in the class.","options":["There are","There is"],"answer":"There are"},
  {"type":"spelling_tap","level":"medium","image":"🐱","question":"Eja bahasa Inggrisnya kucing!","options":["c","a","t"],"answer":"cat"}
]`,

  hard: `You are a question generator for a children's English game (Grade 1 SD Indonesia, age 6-7).
Generate exactly 30 UNIQUE multiple-choice English questions at HARD difficulty.
Return ONLY a valid JSON array, no explanation whatsoever.

Topics: sentence rearranging, English-Indonesian translation, complex spelling (5-9 letters), reading comprehension with inference.

Rules:
- Each object: "type", "level", "question", "options" (2-3 strings), "answer"
- "answer" MUST be exactly one of the "options"  
- "level" is always "hard"
- Use varied Indonesian names and contexts
- For spelling_tap: options are individual letters (may repeat), answer is the English word lowercase
- Wrong options for rearrange must be grammatically plausible but incorrect

Question types needed (at least 6 each):
1. type: "rearrange" — "Rearrange: [scrambled words]" — options are full sentence strings
2. type: "translation" — translate Indonesian to English or vice versa
3. type: "spelling_tap" — image: emoji, question in Indonesian, options: individual letters, answer: English word

Example format:
[
  {"type":"rearrange","level":"hard","question":"Rearrange: has – he – got – new – bag – a","options":["He has got a new bag","He got has a new bag"],"answer":"He has got a new bag"},
  {"type":"translation","level":"hard","question":"Apa arti dari: 'There are four chickens'?","options":["Ada empat ayam","Ada satu ayam"],"answer":"Ada empat ayam"},
  {"type":"spelling_tap","level":"hard","image":"✏️","question":"Eja bahasa Inggrisnya pensil!","options":["p","e","n","c","i","l"],"answer":"pencil"}
]`,
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const shuffleArray = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/**
 * Validates that a parsed question array has the correct shape.
 * Returns filtered array of valid questions only.
 */
const validateQuestions = (arr, expectedLevel) => {
  if (!Array.isArray(arr)) return [];
  return arr.filter((q) => {
    if (typeof q !== "object" || q === null) return false;
    if (typeof q.question !== "string" || q.question.trim() === "") return false;
    if (!Array.isArray(q.options) || q.options.length < 2) return false;
    if (typeof q.answer !== "string") return false;
    if (!q.options.includes(q.answer)) return false;
    // Ensure level is set correctly
    q.level = expectedLevel;
    // Ensure q field mirrors question for app compatibility
    q.q = q.question;
    return true;
  });
};

// ─── Local Fallback ───────────────────────────────────────────────────────────

const getLocalFallback = (subject, difficulty) => {
  const pool = subject === "English" ? englishQuestions : mathQuestions;
  const level = difficulty.toLowerCase();
  let filtered = pool.filter((q) => q.level === level);
  if (filtered.length === 0) filtered = pool.filter((q) => q.level === "easy");
  if (filtered.length === 0) filtered = pool;

  // Add q field for app compatibility
  return filtered.map((q) => ({ ...q, q: q.question }));
};

// ─── Main Generator ───────────────────────────────────────────────────────────

/**
 * Calls Grok API to generate questions.
 * @param {string} subject  "Math" | "English"
 * @param {string} difficulty "Easy" | "Medium" | "Hard"
 * @param {number} count  how many questions needed per player
 * @returns {Promise<{ questions: object[], usedAI: boolean }>}
 */
export const generateQuestionsWithAI = async (subject, difficulty, count = 10) => {
  const level = difficulty.toLowerCase();

  // No API key → immediate fallback
  if (!API_KEY) {
    console.warn("[QuestionGenerator] No VITE_GROK_API_KEY found. Using local fallback.");
    return { questions: getLocalFallback(subject, difficulty), usedAI: false };
  }

  const prompts = subject === "English" ? ENGLISH_PROMPTS : MATH_PROMPTS;
  const systemPrompt = prompts[level] || prompts.easy;

  try {
    const response = await fetch(GROK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: GROK_MODEL,
        messages: [
          {
            role: "system",
            content:
              "You are a JSON-only question generator. Always respond with a valid JSON array only. Never include markdown, explanation, or commentary of any kind.",
          },
          {
            role: "user",
            content: systemPrompt,
          },
        ],
        temperature: 0.9,
        max_tokens: 8000,
      }),
    });

    if (!response.ok) {
      throw new Error(`Grok API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const rawContent = data?.choices?.[0]?.message?.content ?? "";

    // Strip any markdown code fences if model wraps in ```json ... ```
    const cleaned = rawContent
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```\s*$/, "")
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      throw new Error("Grok returned invalid JSON");
    }

    const valid = validateQuestions(parsed, level);

    if (valid.length < count) {
      // Supplement with local questions if AI didn't generate enough
      const local = getLocalFallback(subject, difficulty);
      const supplement = shuffleArray(local).slice(0, count - valid.length);
      return { questions: shuffleArray([...valid, ...supplement]), usedAI: true };
    }

    return { questions: shuffleArray(valid), usedAI: true };
  } catch (err) {
    console.error("[QuestionGenerator] Grok API failed, using local fallback:", err.message);
    return { questions: getLocalFallback(subject, difficulty), usedAI: false };
  }
};

/**
 * Builds a 2-player question bank from the AI-generated pool.
 * Each player gets a shuffled slice of `count` questions.
 * @returns {Promise<[object[], object[]]>}
 */
export const buildAIQuestionBank = async (subject, difficulty, count = 10) => {
  const { questions, usedAI } = await generateQuestionsWithAI(subject, difficulty, count * 2);

  // Give each player their own shuffled set
  const p1 = shuffleArray([...questions]).slice(0, count).map((q) => ({
    ...q,
    options: shuffleArray([...q.options]),
  }));
  const p2 = shuffleArray([...questions]).slice(0, count).map((q) => ({
    ...q,
    options: shuffleArray([...q.options]),
  }));

  return { bank: [p1, p2], usedAI };
};
