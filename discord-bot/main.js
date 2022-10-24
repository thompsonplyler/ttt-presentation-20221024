document.addEventListener("DOMContentLoaded", () => {
  let socket = io("http://localhost:3131");

  socket.on("connected", () => {
    console.log("Successfully connected to Socket/IO.");
  });

  socket.on("heckyeah", () => {
    let video = "./public/heckyeah.webm";
    playVideo(video, 3000);
  });
});

const playVideo = (url, time) => {
  const videoDiv = document.getElementById("video-div");
  const video = document.getElementById("video");
  video.setAttribute("src", url);
  video.setAttribute("style", "width:100vw");
  videoDiv.classList.remove("hidden-video");
  videoDiv.classList.add("shown-video");
  console.log(video.duration);

  setTimeout(replaceClass, time);
};

// hides the video in question and unloads it.
const replaceClass = () => {
  videoDiv = document.getElementById("video-div");
  video = document.getElementById("video");
  video.pause();
  video.removeAttribute("src");
  video.load();
  videoDiv.classList.remove("shown-video");
  videoDiv.classList.add("hidden-video");
  return;
};
