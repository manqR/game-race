// mathQuestions.js

export const mathQuestions = [
    // ═══════════════════════════════════════════════════════════════
    //  EASY  –  numbers 1–20
    // ═══════════════════════════════════════════════════════════════
    // Counting
    { type: "counting", level: "easy", image: "🌟🌟🌟🌟🌟🌟🌟", question: "Ada berapa bintang di atas?", options: ["7", "6", "8"], answer: "7" },
    { type: "counting", level: "easy", image: "🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎", question: "Ada berapa apel di atas?", options: ["10", "9", "11"], answer: "10" },
    { type: "counting", level: "easy", image: "🖍️🖍️🖍️🖍️🖍️🖍️🖍️🖍️🖍️🖍️🖍️🖍️", question: "Berapa jumlah krayon tersebut?", options: ["12", "11", "13"], answer: "12" },

    // Reading Numbers
    { type: "reading_number", level: "easy", image: "1️⃣5️⃣", question: "Nama bilangan '15' adalah ...", options: ["Lima belas", "Satu lima"], answer: "Lima belas" },
    { type: "reading_number", level: "easy", image: "1️⃣2️⃣", question: "Nama bilangan '12' adalah ...", options: ["Dua belas", "Satu dua"], answer: "Dua belas" },
    { type: "reading_number", level: "easy", image: "1️⃣8️⃣", question: "Nama bilangan '18' adalah ...", options: ["Delapan belas", "Satu delapan"], answer: "Delapan belas" },

    // Comparing
    { type: "comparing_numbers", level: "easy", question: "14 ... 19", options: ["<", ">", "="], answer: "<" },
    { type: "comparing_numbers", level: "easy", question: "20 ... 11", options: [">", "<", "="], answer: ">" },
    { type: "comparing_numbers", level: "easy", question: "15 ... 15", options: ["=", ">", "<"], answer: "=" },

    // Ordering
    { type: "ordering_numbers", level: "easy", question: "Urutkan dari yang terkecil: 9, 3, 15", options: ["3 - 9 - 15", "15 - 9 - 3"], answer: "3 - 9 - 15" },
    { type: "ordering_numbers", level: "easy", question: "Urutkan dari yang terbesar: 5, 18, 11", options: ["18 - 11 - 5", "5 - 11 - 18"], answer: "18 - 11 - 5" },
    { type: "ordering_numbers", level: "easy", question: "Urutkan dari yang terkecil: 8, 12, 17", options: ["8 - 12 - 17", "17 - 12 - 8"], answer: "8 - 12 - 17" },

    // Basic Math
    { type: "math", level: "easy", question: "Hasil dari 5 + 4 = ...", options: ["9", "8", "10"], answer: "9" },
    { type: "math", level: "easy", question: "Hasil dari 12 - 5 = ...", options: ["7", "6", "8"], answer: "7" },
    { type: "math", level: "easy", question: "Hasil dari 10 + 6 = ...", options: ["16", "15", "14"], answer: "16" },

    // ═══════════════════════════════════════════════════════════════
    //  MEDIUM  –  numbers 20–100
    // ═══════════════════════════════════════════════════════════════
    // Place Value
    { type: "place_value", level: "medium", image: "6️⃣8️⃣", question: "Bilangan 68 terdiri dari 6 puluhan dan ... satuan", options: ["8", "60", "68"], answer: "8" },
    { type: "place_value", level: "medium", image: "7️⃣3️⃣", question: "Bilangan 73 terdiri dari ... puluhan dan 3 satuan", options: ["7", "70", "3"], answer: "7" },
    { type: "place_value", level: "medium", question: "Nilai tempat untuk 92 yang tepat adalah ...", options: ["9 puluhan + 2 satuan", "9 satuan + 2 puluhan"], answer: "9 puluhan + 2 satuan" },
    { type: "place_value", level: "medium", question: "Angka 4 pada bilangan 45 bernilai ...", options: ["40", "4", "45"], answer: "40" },
    { type: "place_value", level: "medium", question: "Angka 8 pada bilangan 28 bernilai ...", options: ["8", "80", "28"], answer: "8" },

    // Reading & Writing 2-digit
    { type: "reading_number", level: "medium", question: "Lambang bilangan 'lima puluh tiga' adalah ...", options: ["53", "35"], answer: "53" },
    { type: "reading_number", level: "medium", question: "Lambang bilangan 'tujuh puluh tujuh' adalah ...", options: ["77", "70"], answer: "77" },
    { type: "reading_number", level: "medium", question: "Nama bilangan dari '84' adalah ...", options: ["Delapan puluh empat", "Empat puluh delapan"], answer: "Delapan puluh empat" },

    // Comparing Word Problems & Ordering
    { type: "comparing", level: "medium", question: "Nadhif punya 68 pensil dan 54 buku. Jumlah pensil ... jumlah buku.", options: ["Lebih banyak dari", "Lebih sedikit dari"], answer: "Lebih banyak dari" },
    { type: "comparing", level: "medium", question: "Di kebun ada 67 pohon mangga dan 59 pohon jambu. Pohon mangga ... pohon jambu.", options: ["Lebih dari", "Kurang dari"], answer: "Lebih dari" },
    { type: "comparing", level: "medium", question: "Malika punya 94 boneka, Alula punya 87 boneka. Siapa yang punya lebih banyak?", options: ["Malika", "Alula"], answer: "Malika" },
    { type: "ordering", level: "medium", question: "Urutkan dari terkecil: 61, 60, 59, 62, 63", options: ["59, 60, 61, 62, 63", "63, 62, 61, 60, 59"], answer: "59, 60, 61, 62, 63" },

    // Math (Addition & Subtraction without/with carry)
    { type: "math", level: "medium", question: "62 + 14 = ...", options: ["76", "75", "77"], answer: "76" },
    { type: "math", level: "medium", question: "87 - 21 = ...", options: ["66", "56", "76"], answer: "66" },
    { type: "math", level: "medium", question: "64 - 24 = ...", options: ["40", "50", "60"], answer: "40" },

    // ═══════════════════════════════════════════════════════════════
    //  HARD  –  numbers 100+ & Complex Word Problems
    // ═══════════════════════════════════════════════════════════════
    // Advanced Math Word Problems
    { type: "word_problem", level: "hard", question: "Ibu membuat 52 kue cokelat dan 16 kue keju. Jumlah seluruhnya adalah ...", options: ["68", "58", "48"], answer: "68" },
    { type: "word_problem", level: "hard", question: "Di keranjang ada 67 apel. Ibu mengambil 13 apel. Sisa apel adalah ...", options: ["54", "44", "64"], answer: "54" },
    { type: "word_problem", level: "hard", question: "Pedagang punya 67 semangka merah dan 12 kuning. Jumlah semuanya ...", options: ["79", "69", "89"], answer: "79" },
    { type: "word_problem", level: "hard", question: "Zaina punya 85 buah, diberikan ke adik 13 buah. Sisanya ...", options: ["72", "62", "82"], answer: "72" },
    { type: "word_problem", level: "hard", question: "77 - 41 = ...", options: ["36", "46", "26"], answer: "36" },

    // Place Value (Hundreds)
    { type: "place_value", level: "hard", image: "1️⃣2️⃣3️⃣", question: "Dalam bilangan 123, angka 1 bernilai ...", options: ["100", "10", "1"], answer: "100" },
    { type: "place_value", level: "hard", image: "4️⃣5️⃣6️⃣", question: "Bentuk panjang 456 adalah ...", options: ["400 + 50 + 6", "4 + 5 + 6", "40 + 50 + 60"], answer: "400 + 50 + 6" },
    { type: "place_value", level: "hard", question: "Bilangan dengan 3 ratusan, 2 puluhan, 7 satuan adalah ...", options: ["327", "237", "372"], answer: "327" },
    { type: "place_value", level: "hard", question: "Digit 5 pada bilangan 529 bernilai ...", options: ["500", "50", "5"], answer: "500" },

    // Patterning (Loncat)
    { type: "pattern", level: "hard", question: "Pola loncat 2: 55, ..., 59, ..., 63. Angka yang hilang adalah ...", options: ["57 dan 61", "56 dan 60", "58 dan 62"], answer: "57 dan 61" },
    { type: "pattern", level: "hard", question: "Pola loncat 3: 55, 58, ..., 64, .... Angka yang hilang adalah ...", options: ["61 dan 67", "60 dan 66"], answer: "61 dan 67" },
    { type: "pattern", level: "hard", question: "Deret 59, 61, 63, 65, 67 adalah pola bilangan loncat ...", options: ["2", "3", "4"], answer: "2" },
    { type: "pattern", level: "hard", question: "Pola bilangan: 100, 200, 300, ..., 500", options: ["400", "350", "450"], answer: "400" },

    // Ordering 3-digit
    { type: "ordering", level: "hard", question: "Urutkan dari terkecil: 250, 205, 520, 502", options: ["205 - 250 - 502 - 520", "520 - 502 - 250 - 205"], answer: "205 - 250 - 502 - 520" },
    { type: "ordering", level: "hard", question: "Urutkan dari terbesar: 134, 341, 143, 314", options: ["341 - 314 - 143 - 134", "134 - 143 - 314 - 341"], answer: "341 - 314 - 143 - 134" }
];
