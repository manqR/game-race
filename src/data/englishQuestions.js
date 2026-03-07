// englishQuestions.js
// We use emojis as the "pictures" for simplicity and immediate visual feedback.
// Every question has a `level` property: "easy", "medium", or "hard".

export const englishQuestions = [
    // ─── EASY LEVEL ──────────────────────────────────────────────────────────────
    // Picture Word Race (Easy)
    { type: "picture_word", level: "easy", image: "🍎", question: "Gambar apakah ini?", options: ["apple", "banana"], answer: "apple" },
    { type: "picture_word", level: "easy", image: "🐱", question: "Gambar apakah ini?", options: ["dog", "cat"], answer: "cat" },
    { type: "picture_word", level: "easy", image: "☀️", question: "Gambar apakah ini?", options: ["sun", "moon"], answer: "sun" },
    { type: "picture_word", level: "easy", image: "🚗", question: "Gambar apakah ini?", options: ["car", "bus"], answer: "car" },
    { type: "picture_word", level: "easy", image: "🌲", question: "Gambar apakah ini?", options: ["tree", "flower"], answer: "tree" },
    { type: "picture_word", level: "easy", image: "🍌", question: "Gambar apakah ini?", options: ["banana", "grape"], answer: "banana" },
    { type: "picture_word", level: "easy", image: "🏠", question: "Gambar apakah ini?", options: ["house", "school"], answer: "house" },

    // Rhyme Racer (Easy)
    { type: "rhyme_racer", level: "easy", question: 'Kata apa yang berima dengan "cat"?', options: ["bat", "dog"], answer: "bat" },
    { type: "rhyme_racer", level: "easy", question: 'Kata apa yang berima dengan "sun"?', options: ["fun", "sad"], answer: "fun" },
    { type: "rhyme_racer", level: "easy", question: 'Kata apa yang berima dengan "red"?', options: ["bed", "box"], answer: "bed" },
    { type: "rhyme_racer", level: "easy", question: 'Kata apa yang berima dengan "pig"?', options: ["big", "pen"], answer: "big" },
    { type: "rhyme_racer", level: "easy", question: 'Kata apa yang berima dengan "book"?', options: ["look", "read"], answer: "look" },

    // Act & Match (Verbs) (Easy)
    { type: "act_match", level: "easy", image: "🏃‍♂️", question: "Apa bahasa Inggrisnya berlari?", options: ["run", "eat"], answer: "run" },
    { type: "act_match", level: "easy", image: "😴", question: "Apa bahasa Inggrisnya tidur?", options: ["sleep", "jump"], answer: "sleep" },
    { type: "act_match", level: "easy", image: "🏊‍♀️", question: "Apa bahasa Inggrisnya berenang?", options: ["swim", "fly"], answer: "swim" },
    { type: "act_match", level: "easy", image: "📖", question: "Apa bahasa Inggrisnya membaca?", options: ["read", "sing"], answer: "read" },
    { type: "act_match", level: "easy", image: "✍️", question: "Apa bahasa Inggrisnya menulis?", options: ["write", "walk"], answer: "write" },

    // Spelling Tap (Easy)
    { type: "spelling_tap", level: "easy", image: "🐶", question: "Eja bahasa Inggrisnya anjing!", options: ["d", "o", "g"], answer: "dog" },
    { type: "spelling_tap", level: "easy", image: "🐄", question: "Eja bahasa Inggrisnya sapi!", options: ["c", "o", "w"], answer: "cow" },
    { type: "spelling_tap", level: "easy", image: "🚌", question: "Eja bahasa Inggrisnya bus!", options: ["b", "u", "s"], answer: "bus" },
    { type: "spelling_tap", level: "easy", image: "🐜", question: "Eja bahasa Inggrisnya semut!", options: ["a", "n", "t"], answer: "ant" },
    { type: "spelling_tap", level: "easy", image: "🐸", question: "Eja bahasa Inggrisnya katak!", options: ["f", "r", "o", "g"], answer: "frog" },

    // Grammar: Have vs Has (Easy)
    { type: "grammar_have_has", level: "easy", question: "I ..... finished my homework.", options: ["Have", "Has"], answer: "Have" },
    { type: "grammar_have_has", level: "easy", question: "She ..... beautiful voice.", options: ["Have", "Has"], answer: "Has" },
    { type: "grammar_have_has", level: "easy", question: "They ..... a big house.", options: ["Have", "Has"], answer: "Have" },
    { type: "grammar_have_has", level: "easy", question: "He ..... a new car.", options: ["Have", "Has"], answer: "Has" },
    { type: "grammar_have_has", level: "easy", question: "We ..... two dogs.", options: ["Have", "Has"], answer: "Have" },
    { type: "grammar_have_has", level: "easy", question: "It ..... a long tail.", options: ["Have", "Has"], answer: "Has" },
    { type: "grammar_have_has", level: "easy", question: "You ..... a nice smile.", options: ["Have", "Has"], answer: "Have" },


    // ─── MEDIUM LEVEL ────────────────────────────────────────────────────────────
    // Vocabulary: Colors & Shapes (Medium)
    { type: "vocab", level: "medium", image: "🔵", question: "Apa bahasa Inggrisnya biru?", options: ["blue", "red"], answer: "blue" },
    { type: "vocab", level: "medium", image: "🟡", question: "Apa bahasa Inggrisnya kuning?", options: ["yellow", "green"], answer: "yellow" },
    { type: "vocab", level: "medium", image: "⬛", question: "Apa bahasa Inggrisnya hitam?", options: ["black", "white"], answer: "black" },
    { type: "vocab", level: "medium", image: "⭐", question: "Bentuk apakah ini dalam bahasa Inggris?", options: ["star", "circle"], answer: "star" },
    { type: "vocab", level: "medium", image: "🔺", question: "Bentuk apakah ini dalam bahasa Inggris?", options: ["triangle", "square"], answer: "triangle" },

    // Opposites (Antonyms) (Medium)
    { type: "opposite", level: "medium", question: "Lawan kata dari 'Big' adalah...", options: ["Small", "Tall"], answer: "Small" },
    { type: "opposite", level: "medium", question: "Lawan kata dari 'Hot' adalah...", options: ["Cold", "Warm"], answer: "Cold" },
    { type: "opposite", level: "medium", question: "Lawan kata dari 'Happy' adalah...", options: ["Sad", "Angry"], answer: "Sad" },
    { type: "opposite", level: "medium", question: "Lawan kata dari 'Fast' adalah...", options: ["Slow", "Quick"], answer: "Slow" },
    { type: "opposite", level: "medium", question: "Lawan kata dari 'Up' adalah...", options: ["Down", "Left"], answer: "Down" },

    // Grammar: To Be (Is/Am/Are) (Medium)
    { type: "grammar_to_be", level: "medium", question: "I ..... a student.", options: ["am", "is", "are"], answer: "am" },
    { type: "grammar_to_be", level: "medium", question: "She ..... my best friend.", options: ["is", "are"], answer: "is" },
    { type: "grammar_to_be", level: "medium", question: "They ..... playing soccer.", options: ["are", "is"], answer: "are" },
    { type: "grammar_to_be", level: "medium", question: "We ..... going to the zoo.", options: ["are", "am"], answer: "are" },
    { type: "grammar_to_be", level: "medium", question: "The dog ..... sleeping.", options: ["is", "are"], answer: "is" },

    // Spelling Tap (Medium)
    { type: "spelling_tap", level: "medium", image: "🍎", question: "Eja bahasa Inggrisnya apel!", options: ["a", "p", "p", "l", "e"], answer: "apple" },
    { type: "spelling_tap", level: "medium", image: "🐅", question: "Eja bahasa Inggrisnya harimau!", options: ["t", "i", "g", "e", "r"], answer: "tiger" },
    { type: "spelling_tap", level: "medium", image: "💧", question: "Eja bahasa Inggrisnya air!", options: ["w", "a", "t", "e", "r"], answer: "water" },
    { type: "spelling_tap", level: "medium", image: "☀️", question: "Eja bahasa Inggrisnya matahari!", options: ["s", "u", "n"], answer: "sun" },
    { type: "spelling_tap", level: "medium", image: "🌕", question: "Eja bahasa Inggrisnya bulan!", options: ["m", "o", "o", "n"], answer: "moon" },


    // ─── HARD LEVEL ──────────────────────────────────────────────────────────────
    // Vocabulary: Occupations & Places (Hard)
    { type: "vocab", level: "hard", image: "👨‍🏫", question: "Apa bahasa Inggrisnya Guru?", options: ["Teacher", "Doctor", "Driver"], answer: "Teacher" },
    { type: "vocab", level: "hard", image: "👩‍⚕️", question: "Apa bahasa Inggrisnya Dokter?", options: ["Doctor", "Nurse", "Pilot"], answer: "Doctor" },
    { type: "vocab", level: "hard", image: "👮", question: "Apa bahasa Inggrisnya Polisi?", options: ["Police", "Farmer", "Chef"], answer: "Police" },
    { type: "vocab", level: "hard", image: "🏥", question: "Apa bahasa Inggrisnya Rumah Sakit?", options: ["Hospital", "School", "Market"], answer: "Hospital" },
    { type: "vocab", level: "hard", image: "🏫", question: "Apa bahasa Inggrisnya Sekolah?", options: ["School", "Library", "Park"], answer: "School" },

    // Grammar: Do vs Does (Hard)
    { type: "grammar_do_does", level: "hard", question: "..... you like ice cream?", options: ["Do", "Does"], answer: "Do" },
    { type: "grammar_do_does", level: "hard", question: "..... she play tennis?", options: ["Does", "Do"], answer: "Does" },
    { type: "grammar_do_does", level: "hard", question: "..... they go to school by bus?", options: ["Do", "Does"], answer: "Do" },
    { type: "grammar_do_does", level: "hard", question: "..... he live in Jakarta?", options: ["Does", "Do"], answer: "Does" },
    { type: "grammar_do_does", level: "hard", question: "..... we need a ticket?", options: ["Do", "Does"], answer: "Do" },

    // Plurals (Hard)
    { type: "plural", level: "hard", question: "Bentuk jamak (lebih dari satu) dari 'Child' adalah...", options: ["Children", "Childs"], answer: "Children" },
    { type: "plural", level: "hard", question: "Bentuk jamak (lebih dari satu) dari 'Mouse' adalah...", options: ["Mice", "Mouses"], answer: "Mice" },
    { type: "plural", level: "hard", question: "Bentuk jamak (lebih dari satu) dari 'Tooth' adalah...", options: ["Teeth", "Tooths"], answer: "Teeth" },
    { type: "plural", level: "hard", question: "Bentuk jamak (lebih dari satu) dari 'Foot' adalah...", options: ["Feet", "Foots"], answer: "Feet" },
    { type: "plural", level: "hard", question: "Bentuk jamak (lebih dari satu) dari 'Person' adalah...", options: ["People", "Persons"], answer: "People" },

    // Translation (Hard)
    { type: "translation", level: "hard", question: "Apa arti dari kalimat: 'I go to school'?", options: ["Saya pergi ke sekolah", "Saya sedang belajar"], answer: "Saya pergi ke sekolah" },
    { type: "translation", level: "hard", question: "Apa arti dari kalimat: 'She is reading a book'?", options: ["Dia sedang membaca buku", "Dia sedang menulis buku"], answer: "Dia sedang membaca buku" },
    { type: "translation", level: "hard", question: "Apa arti dari kalimat: 'They are playing football'?", options: ["Mereka sedang bermain sepak bola", "Mereka sedang menonton bola"], answer: "Mereka sedang bermain sepak bola" },
    { type: "translation", level: "hard", question: "Apa bahasa Inggris dari 'Kucing itu tidur'?", options: ["The cat is sleeping", "The dog is running"], answer: "The cat is sleeping" },
    { type: "translation", level: "hard", question: "Apa bahasa Inggris dari 'Selamat pagi'?", options: ["Good morning", "Good night"], answer: "Good morning" },
    
    // Spelling Tap (Hard)
    { type: "spelling_tap", level: "hard", image: "🦋", question: "Eja bahasa Inggrisnya kupu-kupu!", options: ["b", "u", "t", "t", "e", "r", "f", "l", "y"], answer: "butterfly" },
    { type: "spelling_tap", level: "hard", image: "🐘", question: "Eja bahasa Inggrisnya gajah!", options: ["e", "l", "e", "p", "h", "a", "n", "t"], answer: "elephant" },
    { type: "spelling_tap", level: "hard", image: "⛱️", question: "Eja bahasa Inggrisnya payung!", options: ["u", "m", "b", "r", "e", "l", "l", "a"], answer: "umbrella" },
    { type: "spelling_tap", level: "hard", image: "👨‍🏫", question: "Eja bahasa Inggrisnya guru!", options: ["t", "e", "a", "c", "h", "e", "r"], answer: "teacher" },
    { type: "spelling_tap", level: "hard", image: "🏥", question: "Eja bahasa Inggrisnya rumah sakit!", options: ["h", "o", "s", "p", "i", "t", "a", "l"], answer: "hospital" }
];
