// mathQuestions.js
// Questions use the image-based pattern: counting, comparing quantities,
// ordering numbers, place value, and number patterns. Emojis are used as visuals.
//
// EASY:   numbers 1–20, simple counting, basic comparisons, 2-term ordering
// MEDIUM: numbers 20–100, place value (tens/ones), 3-5 term ordering, +2/+4 patterns
// HARD:   numbers 100+, hundreds place value, longer patterns, multi-step comparison

export const mathQuestions = [

    // ═══════════════════════════════════════════════════════════════
    //  EASY  –  numbers 1–20
    // ═══════════════════════════════════════════════════════════════

    // — Counting —
    {
        type: "counting", level: "easy",
        image: "⭐⭐⭐⭐⭐⭐⭐",
        question: "Ada berapa bintang di atas?",
        options: ["7", "6", "8"],
        answer: "7"
    },
    {
        type: "counting", level: "easy",
        image: "🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎",
        question: "Ada berapa apel di atas?",
        options: ["10", "9", "11"],
        answer: "10"
    },
    {
        type: "counting", level: "easy",
        image: "🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟",
        question: "Ada berapa ikan di atas?",
        options: ["13", "12", "14"],
        answer: "13"
    },
    {
        type: "counting", level: "easy",
        image: "🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸",
        question: "Ada berapa bunga di atas?",
        options: ["15", "14", "16"],
        answer: "15"
    },
    {
        type: "counting", level: "easy",
        image: "🖍️🖍️🖍️🖍️🖍️🖍️🖍️🖍️🖍️🖍️🖍️🖍️🖍️🖍️🖍️🖍️🖍️🖍️🖍️",
        question: "Berapa jumlah pensil warna Nabila?",
        options: ["19", "18", "20"],
        answer: "19"
    },

    // — Reading Numbers —
    {
        type: "reading_number", level: "easy",
        image: "1️⃣5️⃣",
        question: "Nama bilangan '15' adalah ...",
        options: ["Lima belas", "Lima satu", "Satu lima"],
        answer: "Lima belas"
    },
    {
        type: "reading_number", level: "easy",
        image: "2️⃣1️⃣",
        question: "Nama bilangan '21' adalah ...",
        options: ["Dua puluh satu", "Dua satu", "Dua belas"],
        answer: "Dua puluh satu"
    },
    {
        type: "reading_number", level: "easy",
        image: "1️⃣2️⃣",
        question: "Nama bilangan '12' adalah ...",
        options: ["Dua belas", "Satu dua", "Dua puluh satu"],
        answer: "Dua belas"
    },

    // — Comparing (visual) —
    {
        type: "comparing_visual", level: "easy",
        image: "🍊🍊🍊🍊🍊  ⟷  🍎🍎🍎🍎🍎🍎🍎",
        question: "Jumlah buah jeruk (5) ... buah apel (7).",
        options: ["Lebih sedikit dari", "Lebih banyak dari", "Sama dengan"],
        answer: "Lebih sedikit dari"
    },
    {
        type: "comparing_visual", level: "easy",
        image: "⚽⚽⚽⚽⚽⚽⚽⚽  ⟷  🏀🏀🏀🏀",
        question: "Jumlah bola sepak (8) ... bola basket (4).",
        options: ["Lebih banyak dari", "Lebih sedikit dari", "Sama dengan"],
        answer: "Lebih banyak dari"
    },
    {
        type: "comparing_visual", level: "easy",
        image: "🌟🌟🌟🌟🌟🌟  ⟷  🌟🌟🌟🌟🌟🌟",
        question: "Jumlah bintang kiri (6) ... bintang kanan (6).",
        options: ["Sama dengan", "Lebih sedikit dari", "Lebih banyak dari"],
        answer: "Sama dengan"
    },

    // — Comparing (text / symbols) —
    {
        type: "comparing_numbers", level: "easy",
        question: "9 ... 16",
        options: ["<", ">", "="],
        answer: "<"
    },
    {
        type: "comparing_numbers", level: "easy",
        question: "20 ... 14",
        options: [">", "<", "="],
        answer: ">"
    },
    {
        type: "comparing_text", level: "easy",
        question: "Hafidz punya 15 kelereng, Nino punya 13 kelereng. Siapa yang punya lebih banyak?",
        options: ["Hafidz", "Nino", "Sama banyak"],
        answer: "Hafidz"
    },
    {
        type: "comparing_text", level: "easy",
        question: "Di tas Senna ada 18 pensil dan 10 buku. Pensil ... buku.",
        options: ["Lebih dari", "Kurang dari", "Sama dengan"],
        answer: "Lebih dari"
    },

    // — Ordering (2–3 numbers) —
    {
        type: "ordering_numbers", level: "easy",
        question: "Urutkan dari yang terkecil: 9, 3, 15",
        options: ["3 - 9 - 15", "15 - 9 - 3", "9 - 3 - 15"],
        answer: "3 - 9 - 15"
    },
    {
        type: "ordering_numbers", level: "easy",
        question: "Urutkan dari yang terbesar: 5, 18, 11",
        options: ["18 - 11 - 5", "5 - 11 - 18", "11 - 18 - 5"],
        answer: "18 - 11 - 5"
    },

    // — Number Pattern (simple +1 / +2) —
    {
        type: "number_pattern", level: "easy",
        question: "Lanjutkan pola: 2, 4, 6, 8, ...",
        options: ["10", "9", "11"],
        answer: "10"
    },
    {
        type: "number_pattern", level: "easy",
        question: "Lanjutkan pola: 1, 2, 3, 4, ...",
        options: ["5", "6", "4"],
        answer: "5"
    },
    {
        type: "number_pattern", level: "easy",
        question: "Pola bilangan: 5, 10, ..., 20",
        options: ["15", "12", "18"],
        answer: "15"
    },

    // ═══════════════════════════════════════════════════════════════
    //  MEDIUM  –  numbers 20–100
    // ═══════════════════════════════════════════════════════════════

    // — Counting (larger groups) —
    {
        type: "counting", level: "medium",
        image: "💎💎💎💎💎💎💎💎💎💎 💎💎💎💎💎💎💎💎💎💎 💎💎💎💎",
        question: "Ada berapa berlian seluruhnya?",
        options: ["24", "23", "25"],
        answer: "24"
    },
    {
        type: "counting", level: "medium",
        image: "🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳 🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳 🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳",
        question: "Ada berapa pohon seluruhnya?",
        options: ["30", "29", "31"],
        answer: "30"
    },

    // — Place Value (tens & ones) —
    {
        type: "place_value", level: "medium",
        question: "Bentuk panjang bilangan 12 yang tepat adalah ...",
        options: ["1 puluhan + 2 satuan", "2 puluhan + 1 satuan", "10 puluhan + 2 satuan"],
        answer: "1 puluhan + 2 satuan"
    },
    {
        type: "place_value", level: "medium",
        image: "3️⃣5️⃣",
        question: "Nilai 35 = ... puluhan + ... satuan",
        options: ["3 puluhan + 5 satuan", "5 puluhan + 3 satuan", "35 puluhan + 0 satuan"],
        answer: "3 puluhan + 5 satuan"
    },
    {
        type: "place_value", level: "medium",
        image: "4️⃣8️⃣",
        question: "Digit 4 pada bilangan 48 memiliki nilai ...",
        options: ["40", "4", "48"],
        answer: "40"
    },
    {
        type: "place_value", level: "medium",
        question: "Nilai tempat untuk angka 15: ada berapa puluhan dan satuan?",
        options: ["1 puluhan (10) dan 5 satuan (5)", "5 puluhan (50) dan 1 satuan (1)", "0 puluhan dan 15 satuan"],
        answer: "1 puluhan (10) dan 5 satuan (5)"
    },

    // — Comparing (larger numbers) —
    {
        type: "comparing_numbers", level: "medium",
        question: "45 ... 54",
        options: ["<", ">", "="],
        answer: "<"
    },
    {
        type: "comparing_numbers", level: "medium",
        question: "72 ... 27",
        options: [">", "<", "="],
        answer: ">"
    },
    {
        type: "comparing_visual", level: "medium",
        image: "A: 🌺🌺🌺  |  B: 📚📚📚📚",
        question: "Berdasarkan gambar, manakah pernyataan yang benar?",
        options: ["Bunga (3) lebih sedikit dari buku (4)", "Buku (4) lebih sedikit dari bunga (3)", "Bunga dan buku sama banyak"],
        answer: "Bunga (3) lebih sedikit dari buku (4)"
    },

    // — Ordering (3–5 numbers, 20–100) —
    {
        type: "ordering_numbers", level: "medium",
        question: "Urutkan dari terkecil: 36, 63, 28, 81",
        options: ["28 - 36 - 63 - 81", "81 - 63 - 36 - 28", "36 - 28 - 63 - 81"],
        answer: "28 - 36 - 63 - 81"
    },
    {
        type: "ordering_numbers", level: "medium",
        question: "Urutkan dari terbesar: 9, 6, 12, 18, 15",
        options: ["18 - 15 - 12 - 9 - 6", "15 - 18 - 12 - 6 - 9", "9 - 6 - 12 - 18 - 15"],
        answer: "18 - 15 - 12 - 9 - 6"
    },
    {
        type: "ordering_visual", level: "medium",
        image: "A: 🥚🥚🥚🥚  |  B: 🥚🥚🥚🥚🥚🥚  |  C: 🥚🥚",
        question: "Urutan telur dari yang paling sedikit (A=4, B=6, C=2):",
        options: ["C - A - B", "B - A - C", "A - C - B"],
        answer: "C - A - B"
    },
    {
        type: "ordering_number_sets", level: "medium",
        question: "Manakah deret yang urutannya dari terbesar ke terkecil?\nA: 32, 31, 30, 29, 28\nB: 16, 17, 18, 19, 20\nC: 14, 13, 12, 11, 10",
        options: ["A dan C", "Hanya B", "Hanya A"],
        answer: "A dan C"
    },

    // — Number Pattern (+2, +4, +5) —
    {
        type: "number_pattern", level: "medium",
        question: "Pola bilangan: 6, ..., 14, ..., 22",
        options: ["10 dan 18", "4 dan 10", "12 dan 20"],
        answer: "10 dan 18"
    },
    {
        type: "number_pattern", level: "medium",
        question: "Pola bilangan: 27, ..., 29, ..., 31",
        options: ["28 dan 30", "26 dan 30", "28 dan 32"],
        answer: "28 dan 30"
    },
    {
        type: "number_pattern", level: "medium",
        question: "Pola bilangan: 36, 38, ..., 42, ..., ...",
        options: ["40, 44, 46", "39, 41, 43", "40, 41, 44"],
        answer: "40, 44, 46"
    },
    {
        type: "number_pattern", level: "medium",
        question: "Lanjutkan: 10, 20, 30, ..., 50",
        options: ["40", "35", "45"],
        answer: "40"
    },

    // ═══════════════════════════════════════════════════════════════
    //  HARD  –  numbers 100+, multi-step, complex patterns
    // ═══════════════════════════════════════════════════════════════

    // — Place Value (hundreds) —
    {
        type: "place_value", level: "hard",
        image: "1️⃣2️⃣3️⃣",
        question: "Dalam bilangan 123, nilai digit 1 adalah ...",
        options: ["100", "10", "1"],
        answer: "100"
    },
    {
        type: "place_value", level: "hard",
        image: "4️⃣5️⃣6️⃣",
        question: "Bentuk panjang 456 adalah ...",
        options: ["400 + 50 + 6", "4 + 5 + 6", "40 + 50 + 60"],
        answer: "400 + 50 + 6"
    },
    {
        type: "place_value", level: "hard",
        question: "Bilangan yang memiliki 3 ratusan, 2 puluhan, dan 7 satuan adalah ...",
        options: ["327", "237", "372"],
        answer: "327"
    },
    {
        type: "place_value", level: "hard",
        question: "Digit 5 pada bilangan 529 memiliki nilai ...",
        options: ["500", "5", "50"],
        answer: "500"
    },

    // — Reading large numbers —
    {
        type: "reading_number", level: "hard",
        image: "3️⃣0️⃣0️⃣",
        question: "Nama bilangan 300 adalah ...",
        options: ["Tiga ratus", "Tiga puluh", "Tiga ratus puluh"],
        answer: "Tiga ratus"
    },
    {
        type: "reading_number", level: "hard",
        image: "5️⃣4️⃣5️⃣",
        question: "Nama bilangan 545 adalah ...",
        options: ["Lima ratus empat puluh lima", "Lima empat lima", "Lima puluh empat lima"],
        answer: "Lima ratus empat puluh lima"
    },

    // — Comparing (3-digit numbers) —
    {
        type: "comparing_numbers", level: "hard",
        question: "357 ... 375",
        options: ["<", ">", "="],
        answer: "<"
    },
    {
        type: "comparing_numbers", level: "hard",
        question: "892 ... 289",
        options: [">", "<", "="],
        answer: ">"
    },
    {
        type: "comparing_text", level: "hard",
        question: "Perpustakaan A punya 312 buku, perpustakaan B punya 231 buku. Mana yang lebih banyak?",
        options: ["Perpustakaan A", "Perpustakaan B", "Sama banyak"],
        answer: "Perpustakaan A"
    },

    // — Ordering (multi-number, 3-digit) —
    {
        type: "ordering_numbers", level: "hard",
        question: "Urutkan dari terkecil: 250, 205, 520, 502",
        options: ["205 - 250 - 502 - 520", "520 - 502 - 250 - 205", "205 - 502 - 250 - 520"],
        answer: "205 - 250 - 502 - 520"
    },
    {
        type: "ordering_numbers", level: "hard",
        question: "Urutkan dari terbesar: 134, 341, 143, 314",
        options: ["341 - 314 - 143 - 134", "134 - 143 - 314 - 341", "314 - 341 - 143 - 134"],
        answer: "341 - 314 - 143 - 134"
    },
    {
        type: "ordering_visual", level: "hard",
        image: "🖍️(3 kelompok x 10 = 30)  🍅(6 x 10 = 60)  📚(4 x 10 = 40)",
        question: "Urutan benda dari yang paling banyak (pensil=30, tomat=60, buku=40):",
        options: ["Tomat - Buku - Pensil", "Pensil - Buku - Tomat", "Buku - Tomat - Pensil"],
        answer: "Tomat - Buku - Pensil"
    },

    // — Number Pattern (larger gaps, mixed step) —
    {
        type: "number_pattern", level: "hard",
        question: "Pola bilangan: 100, 200, 300, ..., 500",
        options: ["400", "350", "450"],
        answer: "400"
    },
    {
        type: "number_pattern", level: "hard",
        question: "Pola bilangan: 150, 200, 250, ..., 350",
        options: ["300", "275", "325"],
        answer: "300"
    },
    {
        type: "number_pattern", level: "hard",
        question: "Pola bilangan: 5, 10, 20, 40, ...",
        options: ["80", "60", "70"],
        answer: "80"
    },
    {
        type: "number_pattern", level: "hard",
        question: "Pola bilangan: 1000, 900, 800, ..., 600",
        options: ["700", "650", "750"],
        answer: "700"
    }
];
