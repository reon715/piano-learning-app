const message = document.getElementById("message");
const button = document.getElementById("change-btn");

button.addEventListener("click", () => {
  message.textContent = "ボタンがクリックされました！";
});
const keys = document.querySelectorAll(".key");

keys.forEach((key) => {
  key.addEventListener("click", () => {
    const note = key.dataset.note;
    console.log("押された音:", note);
  });
});

