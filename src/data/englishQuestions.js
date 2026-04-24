// englishQuestions.js

export const englishQuestions = [
    // ─── EASY LEVEL ──────────────────────────────────────────────────────────────
    // Animals and Objects (Vocab)
    { type: "vocab", level: "easy", image: "🐄", question: "Gambar apakah ini?", options: ["Cow", "Chicken"], answer: "Cow" },
    { type: "vocab", level: "easy", image: "🐓", question: "Gambar apakah ini?", options: ["Horse", "Chicken"], answer: "Chicken" },
    { type: "vocab", level: "easy", image: "🐎", question: "Gambar apakah ini?", options: ["Horse", "Cat"], answer: "Horse" },
    { type: "vocab", level: "easy", image: "✏️", question: "Gambar apakah ini?", options: ["Pencil", "Eraser"], answer: "Pencil" },
    { type: "vocab", level: "easy", image: "🧽", question: "Gambar apakah ini?", options: ["Ruler", "Eraser"], answer: "Eraser" },
    { type: "vocab", level: "easy", image: "🖍️", question: "Gambar apakah ini?", options: ["Crayons", "Scissors"], answer: "Crayons" },
    { type: "vocab", level: "easy", image: "✂️", question: "Gambar apakah ini?", options: ["Glue", "Scissors"], answer: "Scissors" },

    // Action verbs
    { type: "act_match", level: "easy", image: "🏃", question: "Apa bahasa Inggrisnya berlari?", options: ["Run", "Walk"], answer: "Run" },
    { type: "act_match", level: "easy", image: "😴", question: "Apa bahasa Inggrisnya tidur?", options: ["Sleep", "Read"], answer: "Sleep" },
    { type: "act_match", level: "easy", image: "📖", question: "Apa bahasa Inggrisnya membaca?", options: ["Read", "Dance"], answer: "Read" },
    { type: "act_match", level: "easy", image: "💃", question: "Apa bahasa Inggrisnya menari?", options: ["Dance", "Jump"], answer: "Dance" },
    { type: "act_match", level: "easy", image: "🦘", question: "Apa bahasa Inggrisnya melompat?", options: ["Jump", "Sit"], answer: "Jump" },

    // Simple Grammar (Have got)
    { type: "grammar", level: "easy", question: "I ..... a pencil.", options: ["have got", "has got"], answer: "have got" },
    { type: "grammar", level: "easy", question: "She ..... a new bag.", options: ["have got", "has got"], answer: "has got" },
    { type: "grammar", level: "easy", question: "They ..... a big farm.", options: ["have got", "has got"], answer: "have got" },

    // ─── MEDIUM LEVEL ────────────────────────────────────────────────────────────
    // There is / There are
    { type: "grammar", level: "medium", question: "..... two chickens on the farm.", options: ["There are", "There is"], answer: "There are" },
    { type: "grammar", level: "medium", question: "..... one cow in the field.", options: ["There is", "There are"], answer: "There is" },
    { type: "grammar", level: "medium", question: "..... three cats in the house.", options: ["There are", "There is"], answer: "There are" },
    { type: "grammar", level: "medium", question: "..... twenty students in the class.", options: ["There are", "There is"], answer: "There are" },
    { type: "grammar", level: "medium", question: "..... a sandwich on the table.", options: ["There is", "There are"], answer: "There is" },

    // Animal Characteristics & Comparisons
    { type: "reading", level: "medium", question: "Horse, cow and sheep have four legs meanwhile chicken has ... legs.", options: ["two", "four"], answer: "two" },
    { type: "reading", level: "medium", question: "A horse is big and strong. A chicken is small. The bigger animal is the ....", options: ["Horse", "Chicken"], answer: "Horse" },
    { type: "reading", level: "medium", question: "Farmers get milk from this animal. It is black and white. What is it?", options: ["Cow", "Horse"], answer: "Cow" },
    { type: "reading", level: "medium", question: "This animal says 'cluck cluck' and lays eggs. What is it?", options: ["Chicken", "Pig"], answer: "Chicken" },

    // Spelling Tap (Medium)
    { type: "spelling_tap", level: "medium", image: "🐎", question: "Eja bahasa Inggrisnya kuda!", options: ["h", "o", "r", "s", "e"], answer: "horse" },
    { type: "spelling_tap", level: "medium", image: "🦆", question: "Eja bahasa Inggrisnya bebek!", options: ["d", "u", "c", "k"], answer: "duck" },
    { type: "spelling_tap", level: "medium", image: "🐈", question: "Eja bahasa Inggrisnya kucing!", options: ["c", "a", "t"], answer: "cat" },
    { type: "spelling_tap", level: "medium", image: "🖊️", question: "Eja bahasa Inggrisnya pulpen!", options: ["p", "e", "n"], answer: "pen" },
    { type: "spelling_tap", level: "medium", image: "🐄", question: "Eja bahasa Inggrisnya sapi!", options: ["c", "o", "w"], answer: "cow" },

    // Short phrase completion
    { type: "completion", level: "medium", question: "The teacher says, 'Clap your hands'. The students ....", options: ["Clap", "Run"], answer: "Clap" },


    // ─── HARD LEVEL ──────────────────────────────────────────────────────────────
    // Rearranging Sentences (Multiple Choice)
    { type: "rearrange", level: "hard", question: "Rearrange: I – got – have – new – toy – a", options: ["I have got a new toy", "I have got a toy new"], answer: "I have got a new toy" },
    { type: "rearrange", level: "hard", question: "Rearrange: has – She – got – cake – pink - a", options: ["She has got a pink cake", "She has pink got a cake"], answer: "She has got a pink cake" },
    { type: "rearrange", level: "hard", question: "Rearrange: are – there – three – cows", options: ["There are three cows", "Are there cows three"], answer: "There are three cows" },
    { type: "rearrange", level: "hard", question: "Rearrange: is – horse – a – in – the - field", options: ["A horse is in the field", "A is horse in the field"], answer: "A horse is in the field" },
    { type: "rearrange", level: "hard", question: "Rearrange: boy – run – fast - The", options: ["The boy run fast", "Fast run the boy"], answer: "The boy run fast" },
    { type: "rearrange", level: "hard", question: "Rearrange: sings – she – song – a", options: ["She sings a song", "A song she sings"], answer: "She sings a song" },

    // Translation
    { type: "translation", level: "hard", question: "Apa arti dari kalimat: 'There are two pencils'?", options: ["Ada dua pensil", "Itu adalah pensil"], answer: "Ada dua pensil" },
    { type: "translation", level: "hard", question: "Apa arti dari kalimat: 'I have got a ruler'?", options: ["Saya punya penggaris", "Saya melihat penggaris"], answer: "Saya punya penggaris" },
    { type: "translation", level: "hard", question: "Apa bahasa Inggris dari 'Ada seekor kucing'?", options: ["There is a cat", "There are a cat"], answer: "There is a cat" },
    
    // Complex Spelling Tap
    { type: "spelling_tap", level: "hard", image: "✂️", question: "Eja bahasa Inggrisnya gunting!", options: ["s", "c", "i", "s", "s", "o", "r", "s"], answer: "scissors" },
    { type: "spelling_tap", level: "hard", image: "✏️", question: "Eja bahasa Inggrisnya rautan!", options: ["s", "h", "a", "r", "p", "e", "n", "e", "r"], answer: "sharpener" },
    { type: "spelling_tap", level: "hard", image: "👩‍🏫", question: "Eja bahasa Inggrisnya guru!", options: ["t", "e", "a", "c", "h", "e", "r"], answer: "teacher" },
    { type: "spelling_tap", level: "hard", image: "🏫", question: "Eja bahasa Inggrisnya sekolah!", options: ["s", "c", "h", "o", "o", "l"], answer: "school" },
    { type: "spelling_tap", level: "hard", image: "🧽", question: "Eja bahasa Inggrisnya penghapus!", options: ["e", "r", "a", "s", "e", "r"], answer: "eraser" }
];
