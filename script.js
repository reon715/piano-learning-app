console.log("script.js 読み込み成功");

// Audio
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playNote(frequency) {
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();

  osc.type = "sine";
  osc.frequency.value = frequency;
  gain.gain.value = 0.2;

  osc.connect(gain);
  gain.connect(audioContext.destination);

  osc.start();
  osc.stop(audioContext.currentTime + 0.3);
}

// 音階（白鍵＋黒鍵）
const noteFrequencies = {
  C: 261.63,
  "C#": 277.18,
  D: 293.66,
  "D#": 311.13,
  E: 329.63,
  F: 349.23,
  "F#": 369.99,
  G: 392.0,
  "G#": 415.3,
  A: 440.0,
  "A#": 466.16,
  B: 493.88,
};

// 練習モード
const practiceNotes = [
  "C","C#","D","D#","E","F","F#","G","G#","A","A#","B"
];

let currentNote = null;

// 言語設定
let currentLang = "ja";

const texts = {
  ja: {
    title: "ピアノ学習アプリ",
    description: "鍵盤をクリックすると音が鳴ります",
    start: "練習スタート",
    startMessage: "スタートを押してください",
    question: (note) => `「${note}」を押してください`,
    correct: "正解！🎉",
    wrong: "違います 😢"
  },
  en: {
    title: "Piano Learning App",
    description: "Click a key to play a sound",
    start: "Start Practice",
    startMessage: "Press start to begin",
    question: (note) => `Press "${note}"`,
    correct: "Correct! 🎉",
    wrong: "Wrong 😢"
  }
};

// 要素取得
const titleEl = document.querySelector("h1");
const descEl = document.getElementById("description");
const questionEl = document.getElementById("question");
const startBtn = document.getElementById("startBtn");
const langBtn = console.log("langBtn:", langBtn);
const keys = document.querySelectorAll(".key");

// 言語更新
function updateLanguage() {
  const t = texts[currentLang];
  titleEl.textContent = t.title;
  descEl.textContent = t.description;
  startBtn.textContent = t.start;
  if (!currentNote) questionEl.textContent = t.startMessage;
  langBtn.textContent = currentLang === "ja" ? "English" : "日本語";
}

// 次の問題
function nextQuestion() {
  const i = Math.floor(Math.random() * practiceNotes.length);
  currentNote = practiceNotes[i];
  questionEl.textContent = texts[currentLang].question(currentNote);
}

// ボタン操作
startBtn.addEventListener("click", nextQuestion);

langBtn.addEventListener("click", () => {
  currentLang = currentLang === "ja" ? "en" : "ja";
  updateLanguage();
});

// 鍵盤処理
keys.forEach((key) => {
  key.addEventListener("mousedown", () => {
    const note = key.dataset.note;
    const frequency = noteFrequencies[note];

    key.classList.add("active");
    if (frequency) playNote(frequency);

    if (currentNote) {
      if (note === currentNote) {
        key.classList.add("correct");
        questionEl.textContent = texts[currentLang].correct;
        setTimeout(() => {
          key.classList.remove("correct");
          nextQuestion();
        }, 500);
      } else {
        key.classList.add("wrong");
        questionEl.textContent = texts[currentLang].wrong;
        setTimeout(() => {
          key.classList.remove("wrong");
          questionEl.textContent =
            texts[currentLang].question(currentNote);
        }, 500);
      }
    }
  });

  key.addEventListener("mouseup", () => {
    key.classList.remove("active");
  });

  key.addEventListener("mouseleave", () => {
    key.classList.remove("active");
  });
});

// 初期表示
updateLanguage();
