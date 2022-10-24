let socket = io("http://localhost:3131");
const button = document.getElementById("button");
button.addEventListener("click", () => {
  socket.emit("question");
});
