// englishQuestions.js
// We use emojis as the "pictures" for simplicity and immediate visual feedback.

export const englishQuestions = [
    // Picture Word Race
    {
        type: "picture_word",
        image: "🍎",
        question: "Gambar apakah ini?",
        options: ["apple", "banana"],
        answer: "apple"
    },
    {
        type: "picture_word",
        image: "🐱",
        question: "Gambar apakah ini?",
        options: ["dog", "cat"],
        answer: "cat"
    },
    {
        type: "picture_word",
        image: "☀️",
        question: "Gambar apakah ini?",
        options: ["sun", "moon"],
        answer: "sun"
    },
    {
        type: "picture_word",
        image: "🚗",
        question: "Gambar apakah ini?",
        options: ["car", "bus"],
        answer: "car"
    },
    {
        type: "picture_word",
        image: "🌲",
        question: "Gambar apakah ini?",
        options: ["tree", "flower"],
        answer: "tree"
    },

    // Rhyme Racer
    {
        type: "rhyme_racer",
        question: 'Kata apa yang berima (bunyinya mirip) dengan "cat"?',
        options: ["bat", "dog"],
        answer: "bat"
    },
    {
        type: "rhyme_racer",
        question: 'Kata apa yang berima (bunyinya mirip) dengan "sun"?',
        options: ["fun", "sad"],
        answer: "fun"
    },
    {
        type: "rhyme_racer",
        question: 'Kata apa yang berima (bunyinya mirip) dengan "red"?',
        options: ["bed", "box"],
        answer: "bed"
    },
    {
        type: "rhyme_racer",
        question: 'Kata apa yang berima (bunyinya mirip) dengan "pig"?',
        options: ["big", "pen"],
        answer: "big"
    },
    {
        type: "rhyme_racer",
        question: 'Kata apa yang berima (bunyinya mirip) dengan "book"?',
        options: ["look", "read"],
        answer: "look"
    },

    // Act & Match (Verbs)
    {
        type: "act_match",
        image: "🏃‍♂️",
        question: "Apa bahasa Inggrisnya berlari?",
        options: ["run", "eat"],
        answer: "run"
    },
    {
        type: "act_match",
        image: "😴",
        question: "Apa bahasa Inggrisnya tidur?",
        options: ["sleep", "jump"],
        answer: "sleep"
    },
    {
        type: "act_match",
        image: "🏊‍♀️",
        question: "Apa bahasa Inggrisnya berenang?",
        options: ["swim", "fly"],
        answer: "swim"
    },
    {
        type: "act_match",
        image: "📖",
        question: "Apa bahasa Inggrisnya membaca?",
        options: ["read", "sing"],
        answer: "read"
    },
    {
        type: "act_match",
        image: "✍️",
        question: "Apa bahasa Inggrisnya menulis?",
        options: ["write", "walk"],
        answer: "write"
    },

    // Spelling Tap
    {
        type: "spelling_tap",
        image: "🐶",
        question: "Eja bahasa Inggrisnya anjing!",
        options: ["d", "o", "g"], // letters to tap
        answer: "dog"
    },
    {
        type: "spelling_tap",
        image: "🐄",
        question: "Eja bahasa Inggrisnya sapi!",
        options: ["c", "o", "w"],
        answer: "cow"
    },
    {
        type: "spelling_tap",
        image: "🚌",
        question: "Eja bahasa Inggrisnya bus!",
        options: ["b", "u", "s"],
        answer: "bus"
    },
    {
        type: "spelling_tap",
        image: "🐜",
        question: "Eja bahasa Inggrisnya semut!",
        options: ["a", "n", "t"],
        answer: "ant"
    },
    {
        type: "spelling_tap",
        image: "🐸",
        question: "Eja bahasa Inggrisnya katak!",
        options: ["f", "r", "o", "g"],
        answer: "frog"
    },

    // Grammar: Have vs Has
    {
        type: "grammar_have_has",
        question: "I ..... finished my homework.",
        options: ["Have", "Has"],
        answer: "Have"
    },
    {
        type: "grammar_have_has",
        question: "She ..... beautiful voice.",
        options: ["Have", "Has"],
        answer: "Has"
    },
    {
        type: "grammar_have_has",
        question: "They ..... a big house.",
        options: ["Have", "Has"],
        answer: "Have"
    },
    {
        type: "grammar_have_has",
        question: "He ..... a new car.",
        options: ["Have", "Has"],
        answer: "Has"
    },
    {
        type: "grammar_have_has",
        question: "We ..... two dogs.",
        options: ["Have", "Has"],
        answer: "Have"
    },
    {
        type: "grammar_have_has",
        question: "It ..... a long tail.",
        options: ["Have", "Has"],
        answer: "Has"
    },
    {
        type: "grammar_have_has",
        question: "You ..... a nice smile.",
        options: ["Have", "Has"],
        answer: "Have"
    },
    {
        type: "grammar_have_has",
        question: "My brother ..... a red bicycle.",
        options: ["Have", "Has"],
        answer: "Has"
    },
    {
        type: "grammar_have_has",
        question: "The children ..... many toys.",
        options: ["Have", "Has"],
        answer: "Have"
    },
    {
        type: "grammar_have_has",
        question: "The cat ..... green eyes.",
        options: ["Have", "Has"],
        answer: "Has"
    }
];
