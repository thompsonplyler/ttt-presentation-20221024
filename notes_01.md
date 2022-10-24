# OBS Studio w/ Video Interaction Presentation Notes

Tour of OBS Studio:

- Scenes
- Sources
- Virtual Camera
- Recording
- Studio Mode

## 1. Create Main Overlay

It's possible to use vanilla JS and CSS to make anything we're going to make in this main overlay, but since I enjoy working with React and I don't like working in Vanilla JS, I am making this overlay a React site.

- Create overlay folder & `npm create vite@latest`
- Create server/bot folder for Discord.js & socket.io
- Guide for Discord.js https://discordjs.guide/#before-you-begin

- discord-bot (actual bot and information)
  - public (where displayed media, etc. live)
  - .env
  - index.html (socket client-- displayed as source in OBS)
  - index.js (Node.js Express/Discord.js/Socket.io server)
  - main.js (the JS handling the socket interaction for index.html)
- main-overlay (website to showcase any thing)
- presentation
