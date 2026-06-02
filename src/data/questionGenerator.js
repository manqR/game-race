// questionGenerator.js
// Calls the Groq API to generate dynamic questions each game session.
// Falls back to the local static question banks if the API is unavailable.

import { mathQuestions } from "./mathQuestions";
import { englishQuestions } from "./englishQuestions";

const GEMINI_MODEL = "gemini-3.1-flash-lite";
// Feel free to swap to Gemma 2 by uncommenting the line below:
// const GEMINI_MODEL = "gemma-2-9b-it";

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

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
  easy: `You are an English exam question creator for Grade 1 SD Indonesia (age 6-7), following the PASAT Grade 1 Summative Assessment format.
Generate exactly 30 UNIQUE multiple-choice English questions at EASY difficulty.
Return ONLY a valid JSON array, no explanation whatsoever.

Story-based context style: Start each question with 1-2 short story sentences in Indonesian/bilingual, then ask in English.
Use Indonesian children's names: Mika, Rani, Budi, Sari, Dito, Ayu, Rafi, Lina.

Rules:
- Each object must have: "type", "level", "question", "options" (exactly 3 strings: A, B, C), "answer"
- "answer" MUST be exactly one of the "options"
- "level" is always "easy"
- Use emoji in "image" field for visual questions
- ALWAYS provide exactly 3 options (never 2)
- Make wrong options plausible but clearly incorrect for Grade 1

Question types needed (at least 5 each):

1. type: "grammar" — Have got / Has got / Haven't got
   - Story intro: "Mika is at school. She ..... a new pencil."
   - Options always: ["have got", "has got", "haven't got"] or similar variations
   - Subject must vary: I, She, He, We, They

2. type: "vocab" — Classroom objects & farm animals with image emoji
   - image: emoji of the object/animal
   - question: "Mika wants to cut paper. She needs a ....."
   - Options: tool names in English (Scissors, Ruler, Glue)
   - OR: "Gambar apakah ini?" with animal/object emoji

3. type: "act_match" — Action verbs with story context
   - image: action emoji (📖 🏃 💃 🛌 ✏️)
   - question short story then: "What is he/she doing?"
   - Options: action verbs (Read, Run, Sleep, Dance, Jump, Walk)

Example format:
[
  {"type":"grammar","level":"easy","question":"Mika is at school. She ..... a new pencil case.","options":["have got","has got","haven't got"],"answer":"has got"},
  {"type":"vocab","level":"easy","image":"✂️","question":"Budi wants to cut paper. He needs a .....","options":["Scissors","Ruler","Eraser"],"answer":"Scissors"},
  {"type":"act_match","level":"easy","image":"📖","question":"Rani is sitting quietly at her desk. She likes to .....","options":["Sleep","Read","Run"],"answer":"Read"}
]`,

  medium: `You are an English exam question creator for Grade 1 SD Indonesia (age 6-7), following the PASAT Grade 1 Summative Assessment format.
Generate exactly 30 UNIQUE multiple-choice English questions at MEDIUM difficulty.
Return ONLY a valid JSON array, no explanation whatsoever.

Story-based context style: Begin each question with a 1-2 sentence story scenario, then pose the question.
Use Indonesian children's names: Arka, Malika, Nadhif, Zaina, Alula, Raffa, Kara, Adist, Raqila.

Rules:
- Each object must have: "type", "level", "question", "options" (exactly 3 strings), "answer"
- "answer" MUST be exactly one of the "options"
- "level" is always "medium"
- ALWAYS provide exactly 3 options
- For "spelling_tap": options are individual LETTERS (may include 1 shuffled extra), answer is the word (lowercase)
- Story/scenario MUST be inside the "question" field itself

Question types needed (at least 6 each):

1. type: "grammar" — There is / There are / There isn't
   - Story: "My uncle has a farm. ..... three cows in the barn."
   - Options: ["There is", "There are", "There isn't"]
   - Vary: singular animals (1 horse → There is), plural (3 ducks → There are)

2. type: "reading" — Short reading comprehension with inference
   - Story (1-2 sentences) embedded IN the question field
   - Ask: What does he/she have? What animal is it? What is the correct tool?
   - Options: 3 choices

3. type: "completion" — Descriptive logic / guessing animal or object
   - Clue in question: "It has four legs. It gives us milk. It says 'Moo'. It is a ....."
   - Options: animal/object names (Cow, Horse, Goat)
   - OR tool clue: "We use it to draw colorful pictures. It is a ....."

4. type: "spelling_tap" — Spell the English word letter-by-letter
   - image: emoji of the word
   - question in Indonesian: "Eja bahasa Inggrisnya [word]!"
   - options: individual letters (3-5 letters), answer: the English word lowercase

Example format:
[
  {"type":"grammar","level":"medium","question":"Malika's uncle has a big farm. ..... five chickens near the barn.","options":["There is","There are","There isn't"],"answer":"There are"},
  {"type":"reading","level":"medium","question":"Nadhif sees an animal with a long neck eating leaves from tall trees. What animal is it?","options":["Giraffe","Elephant","Horse"],"answer":"Giraffe"},
  {"type":"completion","level":"medium","question":"It has four legs. It gives us milk. It says Moo. It is a .....","options":["Cow","Duck","Sheep"],"answer":"Cow"},
  {"type":"spelling_tap","level":"medium","image":"🐑","question":"Eja bahasa Inggrisnya domba!","options":["s","h","e","e","p"],"answer":"sheep"}
]`,

  hard: `You are an English exam question creator for Grade 1 SD Indonesia (age 6-7), following the PASAT Grade 1 Summative Assessment format.
Generate exactly 30 UNIQUE multiple-choice English questions at HARD difficulty.
Return ONLY a valid JSON array, no explanation whatsoever.

Story-based context style: All questions must begin with a 1-2 sentence story or scenario. Questions test deeper comprehension and grammar.
Use varied Indonesian names and farm/classroom/daily-life contexts.

Rules:
- Each object must have: "type", "level", "question", "options" (exactly 3 strings), "answer"
- "answer" MUST be exactly one of the "options"
- "level" is always "hard"
- ALWAYS exactly 3 options
- For rearrange: options are full grammatically plausible sentences, wrong options must look believable
- Story context MUST be embedded in the "question" field itself

Question types needed (at least 6 each):

1. type: "rearrange" — Reorder jumbled words into a correct sentence
   - question: "Rearrange: I – got – have – new – toy – a"
   - options: 3 full sentence strings (1 correct, 2 plausible but wrong)
   - Focus on: have got / has got / haven't got / there is / there are structures

2. type: "grammar" — Complex possession & quantity structures
   - Story intro (1-2 sentences) then a fill-in gap
   - Topics: haven't got, hasn't got, negative possession, or combined there is/are + have got
   - Options: 3 grammatical choices

3. type: "reading" — Reading comprehension with inference (requires thinking)
   - Include a short story (2-3 sentences) inside the "question" field
   - Ask inferential questions: Why? What does it mean? Which animal is bigger?
   - Comparison questions: "Zaina has a horse. Raffa has a goat. Which animal is bigger?"

4. type: "completion" — Sentence completion requiring grammar + vocabulary knowledge
   - Story scenario then a gap: "Alula ..... got a red crayon. She uses it to color her drawing."
   - Options: ["has", "have", "haven't"] — choose the correct form

Example format:
[
  {"type":"rearrange","level":"hard","question":"Rearrange: has – she – got – new – bag – a","options":["She has got a new bag","She got has a new bag","Has she got new a bag"],"answer":"She has got a new bag"},
  {"type":"grammar","level":"hard","question":"Dito has a dog but no cat. He ..... got a cat.","options":["has","haven't","hasn't"],"answer":"hasn't"},
  {"type":"reading","level":"hard","question":"Zaina has a horse on her farm. Raffa has a goat. Which animal is bigger?","options":["Horse","Goat","Duck"],"answer":"Horse"},
  {"type":"completion","level":"hard","question":"Kara wants to write her name. She ..... got a pencil in her bag.","options":["has","have","hasn't"],"answer":"has"}
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
 * Calls Gemini/Gemma API to generate questions.
 * @param {string} subject  "Math" | "English"
 * @param {string} difficulty "Easy" | "Medium" | "Hard"
 * @param {number} count  how many questions needed per player
 * @param {string} historyContext adaptive player history instructions
 * @returns {Promise<{ questions: object[], usedAI: boolean }>}
 */
export const generateQuestionsWithAI = async (subject, difficulty, count = 10, historyContext = "") => {
  const level = difficulty.toLowerCase();

  // No API key → immediate fallback
  if (!API_KEY) {
    console.warn("[QuestionGenerator] No VITE_GEMINI_API_KEY found. Using local fallback.");
    return { questions: getLocalFallback(subject, difficulty), usedAI: false };
  }

  const prompts = subject === "English" ? ENGLISH_PROMPTS : MATH_PROMPTS;
  const basePrompt = prompts[level] || prompts.easy;
  const finalPrompt = historyContext ? `${basePrompt}\n\n${historyContext}` : basePrompt;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: finalPrompt
              }
            ]
          }
        ],
        systemInstruction: {
          parts: [
            {
              text: "You are a JSON-only question generator. Always respond with a valid JSON array only. Never include markdown, explanation, or commentary of any kind."
            }
          ]
        },
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.9
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const rawContent = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    // Step 1: Strip <think>...</think> blocks (some reasoning models)
    let cleaned = rawContent.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

    // Step 2: Strip markdown code fences (```json ... ``` or ``` ... ```)
    cleaned = cleaned.replace(/^```(?:json)?\s*/im, "").replace(/\s*```\s*$/im, "").trim();

    // Step 3: Extract the JSON array — find the first '[' to the last ']'
    const arrayStart = cleaned.indexOf("[");
    const arrayEnd = cleaned.lastIndexOf("]");
    if (arrayStart === -1 || arrayEnd === -1 || arrayEnd <= arrayStart) {
      throw new Error("Gemini response contains no JSON array");
    }
    cleaned = cleaned.slice(arrayStart, arrayEnd + 1);

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      throw new Error("Gemini returned invalid JSON");
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
    console.error("[QuestionGenerator] Gemini API failed, using local fallback:", err.message);
    return { questions: getLocalFallback(subject, difficulty), usedAI: false };
  }
};

/**
 * Builds a 2-player question bank from the AI-generated pool.
 * Each player gets a shuffled slice of `count` questions.
 * @returns {Promise<[object[], object[]]>}
 */
export const buildAIQuestionBank = async (subject, difficulty, count = 10, historyContext = "") => {
  const { questions, usedAI } = await generateQuestionsWithAI(subject, difficulty, count * 2, historyContext);

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
