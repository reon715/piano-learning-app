const message = document.getElementById("message");
const button = document.getElementById("change-btn");

button.addEventListener("click", () => {
  message.textContent = "ボタンがクリックされました！";
});
