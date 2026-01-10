console.log("script.js 読み込み成功");

// 音の準備
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
  D: 293.66,
  E: 329.63,
  F: 349.23,
  G: 392.0,
  A: 440.0,
  B: 493.88,
};

// ★ ここで一度だけ宣言
const keys = document.querySelectorAll(".key");
console.log("keyの数:", keys.length);

// 鍵盤クリック処理
keys.forEach((key) => {
  key.addEventListener("click", () => {
    const note = key.dataset.note;
    const frequency = noteFrequencies[note];

    if (frequency) {
      playNote(frequency);
      console.log("鳴らした音:", note);
    }
  });
});

