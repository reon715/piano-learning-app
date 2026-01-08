console.log("script.js 読み込み成功");

// メッセージボタン部分
const message = document.getElementById("message");
const button = document.getElementById("change-btn");

if (button && message) {
  button.addEventListener("click", () => {
    message.textContent = "ボタンがクリックされました！";
  });
}

// 鍵盤部分
const keys = document.querySelectorAll(".key");
console.log("keyの数:", keys.length);

keys.forEach((key) => {
  key.addEventListener("click", () => {
    const note = key.dataset.note;
    console.log("押された音:", note);
  });
});
