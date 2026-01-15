console.log("script.js 読み込み成功");

// AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// 音を鳴らす関数
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

// 鍵盤取得
const keys = document.querySelectorAll(".key");
console.log("keyの数:", keys.length);

// 鍵盤イベント
keys.forEach((key) => {
  key.addEventListener("mousedown", () => {
    const note = key.dataset.note;
    const frequency = noteFrequencies[note];

    key.classList.add("active");

    if (frequency) {
      playNote(frequency);
      console.log("鳴らした音:", note);
    }
  });

  key.addEventListener("mouseup", () => {
    key.classList.remove("active");
  });

  key.addEventListener("mouseleave", () => {
    key.classList.remove("active");
  });
});

