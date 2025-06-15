// Inisialisasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCIJdO2xVLkFCFxJTX3v4iiVoRPGBbh2_M",
  authDomain: "sasarasabanua.firebaseapp.com",
  databaseURL: "https://sasarasabanua-default-rtdb.firebaseio.com",
  projectId: "sasarasabanua",
  storageBucket: "sasarasabanua.firebasestorage.app",
  messagingSenderId: "1053878236014",
  appId: "1:1053878236014:web:4029e4bd9e3a31b73e077f",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const quizRef = database.ref("quiz");

// Data Quiz dengan gambar
const quizData = [
  {
    question: "Apa nama makanan khas Banjar ini?",
    image: "img/soal1.jpg",
    options: ["Soto Banjar", "Nasi Kuning", "Nasi Sop", "Ketupat Kandangan"],
    correctAnswer: 0,
    explanation:
      "Soto Banjar adalah sup khas Banjarmasin yang kuahnya berwarna kuning cerah karena rempah kunyit. Biasanya memakai ayam yang disuwir maupun telur rebus, disajikan dengan lontong, bawang goreng, dan jeruk nipis. Rasanya seimbang antara gurih, segar, dan ringan, hingga menjadi comfort food warga Banjar.",
  },
  {
    question: "Bahan utama apa yang digunakan untuk membuat makanan ini?",
    image: "img/soal2.jpg",
    options: ["Mangga", "Ketela", "Beras Ketan", "Singkong"],
    correctAnswer: 2,
    explanation:
      "Amparan Tatak adalah kue khas Banjar yang terbuat dari beras ketan, dimasak bersamaan dengan santan dan gula merah, kemudian dipadatkan dalam loyang dan dipotong-persegi. Teksturnya lembut dan legit, serta manis gurih karena sentuhan santan dan gula palem yang berpadu sempurna.",
  },
  {
    question:
      "Apa nama hidangan khas Banjarmasin yang dibuat dari nasi padat dalam anyaman janur kelapa dan disajikan dengan kuah santan?",
    image: "img/soal3.jpg",
    options: [
      "Nasi Kuning",
      "Nasi Itik Gambut",
      "Lontong",
      "Ketupat Kandangan",
    ],
    correctAnswer: 3,
    explanation:
      "Ketupat Kandangan adalah nasi ketan atau nasi putih yang dimasak di dalam anyaman janur kelapa muda. Hidangan ini populer di daerah Kandangan, Hulu Sungai, dan biasanya disajikan dengan sayur nangka santan kental dan lauk ikan asap. Rasa dan aromanya kaya, mewakili cita rasa asli Banjar.",
  },
  {
    question: "Apa nama minuman khas Banjar yang terlihat pada gambar?",
    image: "img/soal4.jpg",
    options: ["Es Dawet", "Es Pisang Ijo", "Es Jahe Santan", "Es Kacang Merah"],
    correctAnswer: 2,
    explanation:
      "Es Jahe Santan adalah minuman segar Banjar yang menyegarkan. Kombinasi jahe hangat rempah, santan gurih, dan gula merah manis menciptakan sensasi unik hangat di lidah sekaligus dingin menyegarkan, sangat cocok untuk iklim tropis.",
  },
  {
    question:
      "Kue tradisional khas Banjar apa yang biasanya hanya disajikan saat bulan Ramadan dan memiliki rasa manis legit dengan tekstur lembut seperti puding?",
    image: "img/soal5.jpg",
    options: ["Wajik", "Bingka", "Kue Lumpur", "Kue Talam"],
    correctAnswer: 1,
    explanation:
      "Bingka adalah kue tradisional khas Banjarmasin yang terbuat dari campuran tepung, santan, telur, dan gula. Teksturnya sangat lembut dan legit, hampir seperti puding panggang. Kue ini sangat populer saat bulan Ramadan dan biasanya hanya dibuat dalam jumlah banyak menjelang buka puasa.",
  },
  {
    question:
      "Apa nama kue khas Banjar yang terbuat dari kelapa muda dan tepung ketan, bertekstur kenyal, dan biasanya dibungkus daun pisang berbentuk persegi panjang?",
    image: "img/soal6.jpg",
    options: ["Wadai Rangai", "Amparan Tatak", "Kue Lupis", "Kue Nagasari"],
    correctAnswer: 0,
    explanation:
      "Wadai Rangai adalah kue tradisional khas Banjar yang berbahan dasar kelapa parut muda dan tepung ketan, dimasak hingga menjadi adonan kenyal manis. Kue ini biasanya dibungkus daun pisang dan berbentuk persegi panjang pipih. Rasanya manis legit dan aromanya harum khas daun pisang.",
  },
  {
    question:
      "Apa nama sayur khas Banjar yang terbuat dari bagian dalam batang kelapa muda dan dimasak dengan santan serta rempah-rempah?",
    image: "img/soal7.jpg",
    options: ["Sayur Lodeh", "Gangan Asam", "Gangan Humbut", "Gulai Nangka"],
    correctAnswer: 2,
    explanation:
      "Gangan Humbut adalah masakan tradisional Banjar yang menggunakan bagian dalam (umbut) batang kelapa muda sebagai bahan utama. Umbut ini dimasak dengan santan dan bumbu khas seperti bawang merah, bawang putih, kunyit, dan serai. Hidangan ini biasa disajikan pada acara adat atau pesta pernikahan di Kalimantan Selatan.",
  },
  {
    question: "Apa nama makanan ringan khas Banjar yang terlihat pada gambar?",
    image: "img/soal8.jpg",
    options: ["Kue Lapis", "Kue Cucur", "Kue Putu", "Kue Amparan Tatak"],
    correctAnswer: 1,
    explanation:
      "Kue Cucur Banjar memiliki tekstur kenyal dan manis, berbeda dengan cucur dari daerah lain karena menggunakan gula merah khas Kalimantan.",
  },
  {
    question:
      "Apa nama masakan khas Banjar berupa sup asam segar dengan irisan ikan haruan (gabus) dan potongan nanas?",
    image: "img/soal9.jpg",
    options: ["Pindang Ikan", "Gangan Asam", "Sayur Asem", "Sup Ikan Haruan"],
    correctAnswer: 1,
    explanation:
      "Gangan Asam adalah sup khas Kalimantan Selatan berbahan dasar ikan haruan (ikan gabus) yang dimasak dengan bumbu asam dari asam jawa dan potongan nanas. Rasanya segar, asam, dan sedikit pedas. Ini adalah salah satu hidangan favorit masyarakat Banjar, terutama untuk makan siang.",
  },
  {
    question:
      "Apa nama hidangan khas Banjar yang berbahan dasar ketan putih dan disajikan dengan selai srikaya dari telur dan santan?",
    image: "img/soal10.jpg",
    options: ["Lemper", "Wajik", "Amparan Tatak", "Ketan Srikaya"],
    correctAnswer: 3,
    explanation:
      "Ketan Srikaya adalah makanan tradisional khas Banjar yang terdiri dari lapisan ketan putih pulen di bagian bawah dan selai srikaya berwarna kuning kehijauan di atasnya. Selai ini dibuat dari telur, santan, dan gula. Rasanya manis, lembut, dan sangat cocok untuk sajian penutup atau kudapan sore hari.",
  },
];

// Variabel Quiz
let currentQuestionIndex = 0;
let score = 0;
let playerName = "";
let playerEmail = "";
let playerBirthdate = "";
let playerBirthplace = "";
let selectedOption = null;
let startTime = 0;
let timerInterval = null;
let timeTaken = 0;
let userAnswers = [];
let hasParticipated = false;
let autoNextTimer = null;

// Elemen DOM
const welcomeScreen = document.getElementById("welcomeScreen");
const quizScreen = document.getElementById("quizScreen");
const resultsScreen = document.getElementById("resultsScreen");
const reviewScreen = document.getElementById("reviewScreen");
const certificateScreen = document.getElementById("certificateScreen");
const playerNameInput = document.getElementById("playerName");
const playerEmailInput = document.getElementById("playerEmail");
const playerBirthdateInput = document.getElementById("playerBirthdate");
const playerBirthplaceInput = document.getElementById("playerBirthplace");
const quizPlayerName = document.getElementById("playerNameDisplay");
const playerAvatar = document.getElementById("playerAvatar");
const questionCountElement = document.getElementById("questionCount");
const currentScoreElement = document.getElementById("currentScore");
const questionTextElement = document.getElementById("questionText");
const questionImageElement = document.getElementById("questionImage");
const optionsContainer = document.getElementById("optionsContainer");
const finalScoreElement = document.getElementById("finalScore");
const scoreTextElement = document.getElementById("scoreText");
const scoreMessageElement = document.getElementById("scoreMessage");
const correctAnswersElement = document.getElementById("correctAnswers");
const wrongAnswersElement = document.getElementById("wrongAnswers");
const percentageScoreElement = document.getElementById("percentageScore");
const progressBar = document.getElementById("progressBar");
const avatarInitials = document.getElementById("avatarInitials");
const startQuizBtn = document.getElementById("startQuizBtn");
const reviewBtn = document.getElementById("reviewBtn");
const certificateBtn = document.getElementById("certificateBtn");
const restartQuizBtn = document.getElementById("restartQuizBtn");
const feedbackModal = document.getElementById("feedbackModal");
const feedbackContent = document.getElementById("feedbackContent");
const feedbackIcon = document.getElementById("feedbackIcon");
const feedbackTitle = document.getElementById("feedbackTitle");
const feedbackText = document.getElementById("feedbackText");
const reviewQuestionsContainer = document.getElementById(
  "reviewQuestionsContainer"
);
const certificateName = document.getElementById("certificateName");
const certificateScoreDisplay = document.getElementById(
  "certificateScoreDisplay"
);
const certificateMessage = document.getElementById("certificateMessage");
const certificateDate = document.getElementById("certificateDate");
const downloadCertificateBtn = document.getElementById(
  "downloadCertificateBtn"
);
const certificateContent = document.getElementById("certificateContent");
const certificateFromReviewBtn = document.getElementById(
  "certificateFromReviewBtn"
);
const backToResultsFromReviewBtn = document.getElementById(
  "backToResultsFromReviewBtn"
);
const backToResultsFromCertificateBtn = document.getElementById(
  "backToResultsFromCertificateBtn"
);
const leaderboardScreen = document.getElementById("leaderboardScreen");
const leaderboardBtn = document.getElementById("leaderboardBtn");
const leaderboardContainer = document.getElementById("leaderboardContainer");
const dailyLeaderboardBtn = document.getElementById("dailyLeaderboardBtn");
const allTimeLeaderboardBtn = document.getElementById("allTimeLeaderboardBtn");
const refreshLeaderboard = document.getElementById("refreshLeaderboard");
const leaderboardLastUpdated = document.getElementById(
  "leaderboardLastUpdated"
);
const backToResultsFromLeaderboardBtn = document.getElementById(
  "backToResultsFromLeaderboardBtn"
);
const yourRank = document.getElementById("yourRank");
const yourLeaderboardAvatar = document.getElementById("yourLeaderboardAvatar");
const yourLeaderboardName = document.getElementById("yourLeaderboardName");
const yourScore = document.getElementById("yourScore");
const yourTime = document.getElementById("yourTime");
const yourScoreContainer = document.getElementById("yourScoreContainer");

// Event Listeners
startQuizBtn.addEventListener("click", startQuiz);
reviewBtn.addEventListener("click", showReview);
certificateBtn.addEventListener("click", showCertificate);
restartQuizBtn.addEventListener("click", restartQuiz);
certificateFromReviewBtn.addEventListener("click", showCertificate);
backToResultsFromReviewBtn.addEventListener("click", showResults);
backToResultsFromCertificateBtn.addEventListener("click", showResults);
downloadCertificateBtn.addEventListener("click", downloadCertificate);
leaderboardBtn.addEventListener("click", showLeaderboard);
dailyLeaderboardBtn.addEventListener("click", () => loadLeaderboard(true));
allTimeLeaderboardBtn.addEventListener("click", () => loadLeaderboard(false));
refreshLeaderboard.addEventListener("click", () =>
  loadLeaderboard(dailyLeaderboardBtn.classList.contains("active"))
);
backToResultsFromLeaderboardBtn.addEventListener("click", showResults);

// Fungsi untuk memulai quiz
function startQuiz() {
  if (!playerNameInput.value.trim()) {
    alert("Silakan masukkan nama Anda terlebih dahulu!");
    return;
  }

  if (!playerEmailInput.value.trim()) {
    alert("Silakan masukkan email Anda terlebih dahulu!");
    return;
  }

  if (!playerBirthdateInput.value) {
    alert("Silakan masukkan tanggal lahir Anda terlebih dahulu!");
    return;
  }

  if (!playerBirthplaceInput.value.trim()) {
    alert("Silakan masukkan tempat lahir Anda terlebih dahulu!");
    return;
  }

  playerName = playerNameInput.value.trim();
  playerEmail = playerEmailInput.value.trim();
  playerBirthdate = playerBirthdateInput.value;
  playerBirthplace = playerBirthplaceInput.value.trim();

  seconds = 0;
  updateTimerDisplay();

  checkUserParticipation(playerEmail)
    .then((hasParticipated) => {
      if (hasParticipated) {
        loadUserResults(playerEmail);
        return;
      }

      quizPlayerName.textContent = playerName;

      const initials = getInitials(playerName);
      playerAvatar.textContent = initials;
      avatarInitials.textContent = initials;
      yourLeaderboardAvatar.textContent = initials;

      welcomeScreen.style.display = "none";
      quizScreen.style.display = "block";

      startTime = Date.now();
      quizTimer = setInterval(() => {
        seconds++;
        updateTimerDisplay();
      }, 1000);
      loadQuestion();
    })
    .catch((error) => {
      console.error("Error checking user participation:", error);
      alert("Terjadi kesalahan saat memeriksa partisipasi. Silakan coba lagi.");
    });
}

function updateTimerDisplay() {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  document.getElementById("quizTimer").textContent = `${minutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}

// Fungsi untuk mengecek partisipasi user
function checkUserParticipation(email) {
  return quizRef
    .orderByChild("email")
    .equalTo(email)
    .once("value")
    .then((snapshot) => {
      return snapshot.exists();
    });
}

// Fungsi untuk memuat hasil user yang sudah pernah mengikuti quiz
function loadUserResults(email) {
  quizRef
    .orderByChild("email")
    .equalTo(email)
    .once("value")
    .then((snapshot) => {
      snapshot.forEach((child) => {
        const data = child.val();
        playerName = data.name;
        playerEmail = data.email;
        playerBirthdate = data.birthdate;
        playerBirthplace = data.birthplace || "";

        quizPlayerName.textContent = playerName;
        const initials = getInitials(playerName);
        playerAvatar.textContent = initials;
        avatarInitials.textContent = initials;

        score = data.score;
        timeTaken = data.time;

        const correct = score;
        const wrong = quizData.length - score;
        const percentage = Math.round((score / quizData.length) * 100);

        finalScoreElement.textContent = score;
        scoreTextElement.textContent = `Kamu mendapatkan ${score} dari ${quizData.length} pertanyaan benar!`;
        correctAnswersElement.textContent = correct;
        wrongAnswersElement.textContent = wrong;
        percentageScoreElement.textContent = `${percentage}%`;
        progressBar.style.width = `${percentage}%`;

        setScoreMessage(percentage);

        certificateName.textContent = playerName;
        certificateScoreDisplay.textContent = `${score}/${quizData.length}`;
        setCertificateMessage(percentage);
        const today = new Date();
        certificateDate.textContent = `Tanggal: ${today.getDate()} ${getMonthName(
          today.getMonth()
        )} ${today.getFullYear()}`;

        welcomeScreen.style.display = "none";
        resultsScreen.style.display = "block";
      });
    });
}

// Fungsi untuk mendapatkan inisial nama
function getInitials(name) {
  const names = name.split(" ");
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }

  return initials;
}

// Fungsi untuk memuat pertanyaan
function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];

  selectedOption = null;

  questionCountElement.textContent = `${currentQuestionIndex + 1}/${
    quizData.length
  }`;
  currentScoreElement.textContent = score;

  questionTextElement.textContent = currentQuestion.question;

  questionImageElement.src = currentQuestion.image;
  questionImageElement.alt = "Gambar soal: " + currentQuestion.question;

  optionsContainer.innerHTML = "";

  // Add options
  currentQuestion.options.forEach((option, index) => {
    const optionBtn = document.createElement("button");
    optionBtn.className = "option-btn";
    optionBtn.innerHTML = `
                    <div class="option-letter">${String.fromCharCode(
                      65 + index
                    )}</div>
                    <div class="option-text">${option}</div>
                `;

    optionBtn.addEventListener("click", () => selectOption(optionBtn, index));
    optionsContainer.appendChild(optionBtn);
  });
}

// Fungsi untuk memilih opsi jawaban
function selectOption(optionBtn, optionIndex) {
  if (selectedOption !== null) return;

  const currentQuestion = quizData[currentQuestionIndex];
  const allOptions = document.querySelectorAll(".option-btn");

  selectedOption = optionIndex;
  optionBtn.classList.add("selected");

  userAnswers[currentQuestionIndex] = {
    question: currentQuestion.question,
    image: currentQuestion.image,
    selectedOption: optionIndex,
    isCorrect: optionIndex === currentQuestion.correctAnswer,
    correctAnswer: currentQuestion.correctAnswer,
    options: currentQuestion.options,
    explanation: currentQuestion.explanation,
  };

  allOptions.forEach((opt, idx) => {
    if (idx === currentQuestion.correctAnswer) {
      opt.classList.add("correct");
    } else if (idx === optionIndex && idx !== currentQuestion.correctAnswer) {
      opt.classList.add("wrong");
    }
    opt.style.pointerEvents = "none";
  });

  if (optionIndex === currentQuestion.correctAnswer) {
    score++;
    currentScoreElement.textContent = score;

    showFeedback(true, currentQuestion.explanation);
  } else {
    showFeedback(false, currentQuestion.explanation);
  }

  autoNextTimer = setTimeout(() => {
    closeFeedbackModal();
    nextQuestion();
  }, 3000);
}

// Fungsi untuk menampilkan feedback
function showFeedback(isCorrect, explanation) {
  if (isCorrect) {
    feedbackContent.className = "feedback-content correct";
    feedbackIcon.innerHTML = '<i class="fas fa-check"></i>';
    feedbackTitle.textContent = "Jawaban Benar!";
    feedbackTitle.style.color = "var(--correct-color)";
  } else {
    feedbackContent.className = "feedback-content wrong";
    feedbackIcon.innerHTML = '<i class="fas fa-times"></i>';
    feedbackTitle.textContent = "Jawaban Salah!";
    feedbackTitle.style.color = "var(--wrong-color)";
  }

  feedbackText.textContent = explanation;
  feedbackModal.style.display = "flex";
}

// Fungsi untuk menutup feedback modal
function closeFeedbackModal() {
  feedbackModal.style.display = "none";
  if (autoNextTimer) {
    clearTimeout(autoNextTimer);
    autoNextTimer = null;
  }
}

// Fungsi untuk pindah ke pertanyaan berikutnya
function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    finishQuiz();
  }
}

// Fungsi untuk menyelesaikan quiz
function finishQuiz() {
  clearInterval(quizTimer);
  timeTaken = seconds;

  const percentage = Math.round((score / quizData.length) * 100);
  const correct = score;
  const wrong = quizData.length - score;

  finalScoreElement.textContent = score;
  scoreTextElement.textContent = `Kamu mendapatkan ${score} dari ${
    quizData.length
  } pertanyaan benar dalam ${formatTime(timeTaken)}!`;
  correctAnswersElement.textContent = correct;
  wrongAnswersElement.textContent = wrong;
  percentageScoreElement.textContent = `${percentage}%`;
  progressBar.style.width = `${percentage}%`;

  setScoreMessage(percentage);

  certificateName.textContent = playerName;
  certificateScoreDisplay.textContent = `${score}/${quizData.length}`;
  setCertificateMessage(percentage);
  const today = new Date();
  certificateDate.textContent = `Tanggal: ${today.getDate()} ${getMonthName(
    today.getMonth()
  )} ${today.getFullYear()}`;

  quizScreen.style.display = "none";
  resultsScreen.style.display = "block";

  saveScoreToDatabase();

  updateYourScoreInLeaderboard();
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes > 0) {
    return `${minutes} menit ${remainingSeconds} detik`;
  }
  return `${remainingSeconds} detik`;
}

function showLeaderboard() {
  resultsScreen.style.display = "none";
  reviewScreen.style.display = "none";
  certificateScreen.style.display = "none";
  leaderboardScreen.style.display = "block";
  loadLeaderboard(true);
}

// Fungsi untuk mengatur pesan berdasarkan skor
function setScoreMessage(percentage) {
  let message = "";
  if (percentage === 100) {
    message = "SEMPURNA! Pengetahuan Anda tentang kuliner Banjar luar biasa!";
  } else if (percentage >= 80) {
    message = "Hebat! Anda benar-benar memahami kuliner Banjar!";
  } else if (percentage >= 60) {
    message = "Bagus! Pengetahuan Anda tentang kuliner Banjar cukup baik.";
  } else if (percentage >= 40) {
    message =
      "Cukup baik. Anda bisa belajar lebih banyak tentang kuliner Banjar.";
  } else {
    message = "Jangan menyerah! Pelajari lagi kuliner Banjar dan coba lagi!";
  }
  scoreMessageElement.textContent = message;
}

// Fungsi untuk mengatur pesan sertifikat berdasarkan skor
function setCertificateMessage(percentage) {
  let message = "";
  if (percentage === 100) {
    message = "Dengan predikat: LUAR BIASA (Sempurna)";
  } else if (percentage >= 80) {
    message = "Dengan predikat: SANGAT BAIK";
  } else if (percentage >= 60) {
    message = "Dengan predikat: BAIK";
  } else if (percentage >= 40) {
    message = "Dengan predikat: CUKUP";
  } else {
    message = "Dengan predikat: BELAJAR LAGI";
  }
  certificateMessage.textContent = message;
}

// Fungsi untuk mendapatkan nama bulan
function getMonthName(monthIndex) {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  return months[monthIndex];
}

// Fungsi untuk menyimpan skor ke database
function saveScoreToDatabase() {
  const today = new Date();
  const scoreData = {
    name: playerName,
    email: playerEmail,
    birthdate: playerBirthdate,
    birthplace: playerBirthplace,
    score: score,
    time: timeTaken,
    date: today.toISOString(),
    initials: getInitials(playerName),
  };

  quizRef.push(scoreData).catch((error) => {
    console.error("Error saving score:", error);
  });
}

// Fungsi untuk menampilkan review jawaban
function showReview() {
  reviewQuestionsContainer.innerHTML = "";

  userAnswers.forEach((answer, index) => {
    const reviewItem = document.createElement("div");
    reviewItem.className = "review-item";

    let optionsHTML = "";
    answer.options.forEach((option, i) => {
      let optionClass = "";
      if (i === answer.selectedOption && i === answer.correctAnswer) {
        optionClass = "correct";
      } else if (i === answer.selectedOption) {
        optionClass = "wrong";
      } else if (i === answer.correctAnswer) {
        optionClass = "correct";
      }

      optionsHTML += `
              <div class="review-option ${optionClass}">
                ${String.fromCharCode(65 + i)}. ${option}
                ${
                  i === answer.correctAnswer
                    ? ' <i class="fas fa-check"></i>'
                    : ""
                }
                ${
                  i === answer.selectedOption && !answer.isCorrect
                    ? ' <i class="fas fa-times"></i>'
                    : ""
                }
              </div>
            `;
    });

    reviewItem.innerHTML = `
            <div class="review-question">${index + 1}. ${answer.question}</div>
            <img src="${answer.image}" alt="Gambar soal" class="review-image">
            <div class="review-options">${optionsHTML}</div>
            <div class="review-explanation">
              <strong>Penjelasan:</strong> ${answer.explanation}
            </div>
          `;

    reviewQuestionsContainer.appendChild(reviewItem);
  });

  resultsScreen.style.display = "none";
  certificateScreen.style.display = "none";
  reviewScreen.style.display = "block";
}

// Fungsi untuk menampilkan sertifikat
function showCertificate() {
  resultsScreen.style.display = "none";
  reviewScreen.style.display = "none";
  certificateScreen.style.display = "block";
}

// Fungsi untuk menampilkan hasil
function showResults() {
  reviewScreen.style.display = "none";
  certificateScreen.style.display = "none";
  resultsScreen.style.display = "block";
}

// Fungsi untuk mendownload sertifikat
function downloadCertificate() {
  html2canvas(certificateContent, {
    scale: 2,
    logging: false,
    useCORS: true,
  }).then((canvas) => {
    const link = document.createElement("a");
    link.download = `Sertifikat-Quiz-Kuliner-Banjar-${playerName}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}

// Add function to load leaderboard data
function loadLeaderboard(dailyOnly = true) {
  dailyLeaderboardBtn.classList.toggle("active", dailyOnly);
  allTimeLeaderboardBtn.classList.toggle("active", !dailyOnly);

  let query = quizRef.orderByChild("score");

  if (dailyOnly) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    query = quizRef.orderByChild("date").startAt(today.toISOString());
  }

  query
    .once("value")
    .then((snapshot) => {
      const leaderboardData = [];
      snapshot.forEach((child) => {
        const data = child.val();
        leaderboardData.push({
          key: child.key,
          name: data.name,
          email: data.email,
          score: data.score || 0,
          time: data.time || 0,
          date: data.date,
          initials: data.initials || getInitials(data.name),
        });
      });

      leaderboardData.sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return a.time - b.time;
      });

      displayLeaderboard(leaderboardData);

      leaderboardLastUpdated.textContent = `Diperbarui: ${new Date().toLocaleTimeString()}`;
    })
    .catch((error) => {
      console.error("Error loading leaderboard:", error);
    });
}

function displayLeaderboard(data) {
  leaderboardContainer.innerHTML = "";

  if (data.length === 0) {
    leaderboardContainer.innerHTML =
      '<div class="no-scores">Belum ada skor yang tercatat</div>';
    yourScoreContainer.style.display = "none";
    return;
  }

  yourScoreContainer.style.display = "block";

  data.forEach((item, index) => {
    const leaderboardItem = document.createElement("div");
    leaderboardItem.className = "leaderboard-item";

    const rankClass = index < 3 ? `rank-${index + 1}` : "rank-other";

    leaderboardItem.innerHTML = `
      <div class="leaderboard-rank ${rankClass}">${index + 1}</div>
      <div class="leaderboard-avatar">${item.initials}</div>
      <div class="leaderboard-details">
        <div class="leaderboard-name">${item.name}</div>
        <div class="leaderboard-email">${item.email}</div>
      </div>
      <div class="leaderboard-score">
        <div class="leaderboard-points">${item.score} poin</div>
        <div class="leaderboard-time">${formatTime(item.time)}</div>
      </div>
    `;

    leaderboardContainer.appendChild(leaderboardItem);

    if (item.email === playerEmail) {
      leaderboardItem.style.border = "2px solid var(--primary-color)";
      leaderboardItem.style.boxShadow = "0 0 0 2px rgba(30, 17, 209, 0.2)";

      yourRank.textContent = `#${index + 1}`;
      yourLeaderboardName.textContent = item.name;
      yourScore.textContent = item.score;
      yourTime.textContent = item.time;
    }
  });

  if (!data.some((item) => item.email === playerEmail)) {
    yourScoreContainer.style.display = "none";
  }
}

function updateYourScoreInLeaderboard() {
  yourLeaderboardName.textContent = playerName;
  yourScore.textContent = score;
  yourTime.textContent = timeTaken;
}

function resetDailyLeaderboard() {
  const now = new Date();
  const today = now.toISOString().split("T")[0];
  const lastReset = localStorage.getItem("lastReset");

  if (!lastReset || lastReset !== today) {
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const timeUntilReset = midnight - now;

    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);

    quizRef
      .orderByChild("date")
      .startAt(todayStart.toISOString())
      .once("value")
      .then((snapshot) => {
        const updates = {};
        snapshot.forEach((child) => {
          updates[child.key] = null;
        });
        return quizRef.update(updates);
      })
      .then(() => {
        localStorage.setItem("lastReset", today);
        setTimeout(resetDailyLeaderboard, timeUntilReset);
      })
      .catch(console.error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  resetDailyLeaderboard();
  setInterval(resetDailyLeaderboard, 3600000);
});

backToResultsFromLeaderboardBtn.addEventListener("click", () => {
  leaderboardScreen.style.display = "none";
  resultsScreen.style.display = "block";
});

dailyLeaderboardBtn.addEventListener("click", () => loadLeaderboard(true));
allTimeLeaderboardBtn.addEventListener("click", () => loadLeaderboard(false));
refreshLeaderboard.addEventListener("click", () =>
  loadLeaderboard(dailyLeaderboardBtn.classList.contains("active"))
);

// Fungsi untuk memulai ulang quiz
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  selectedOption = null;
  timeTaken = 0;
  userAnswers = [];

  resultsScreen.style.display = "none";
  reviewScreen.style.display = "none";
  certificateScreen.style.display = "none";
  welcomeScreen.style.display = "block";

  playerNameInput.value = "";
  playerEmailInput.value = "";
  playerBirthdateInput.value = "";
  playerBirthplaceInput.value = "";
  playerNameInput.focus();
}
