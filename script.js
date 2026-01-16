console.log("script.js 読み込み成功");


// AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// 音を鳴らす
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

// 音階テーブル
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


// 練習モード用
const practiceNotes = [
  "C", "C#",
  "D", "D#",
  "E",
  "F", "F#",
  "G", "G#",
  "A", "A#",
  "B"
];

let currentNote = null;

const questionEl = document.getElementById("question");
const startBtn = document.getElementById("startBtn");

// 次の問題
function nextQuestion() {
  const index = Math.floor(Math.random() * practiceNotes.length);
  currentNote = practiceNotes[index];
  questionEl.textContent = `「${currentNote}」を押してください`;
}

// スタート
startBtn.addEventListener("click", () => {
  nextQuestion();
});

// 鍵盤処理
const keys = document.querySelectorAll(".key");
console.log("keyの数:", keys.length);

keys.forEach((key) => {
  key.addEventListener("mousedown", () => {
    const note = key.dataset.note;
    const frequency = noteFrequencies[note];

    key.classList.add("active");

    if (frequency) {
      playNote(frequency);
    }

    // 練習モード判定
    if (currentNote) {
      if (note === currentNote) {
        key.classList.add("correct");
        questionEl.textContent = "正解！🎉";

        setTimeout(() => {
          key.classList.remove("correct");
          nextQuestion();
        }, 500);
      } else {
        key.classList.add("wrong");
        questionEl.textContent = "違います 😢";

        setTimeout(() => {
          key.classList.remove("wrong");
          questionEl.textContent = `「${currentNote}」を押してください`;
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

