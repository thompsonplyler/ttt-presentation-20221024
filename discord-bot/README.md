This is the actual bot and socket.io code from the presentation.

To install dependencies:

```bash
npm i discord.js dotenv express socket.io socket.io-client
```

> **N.b** - The Discord bot component of this will not work properly without a Discord bot loaded onto a server. The most up-to-date instructions for creating a Discord bot are on the Discord.js page [here.](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) If you use another site or tutorial to make a bot, keep in mind that due to the changing permission structure of Discord's bots, there's a very good chance that such a tutorial may be out of date.

- `/public` - This is where displayed media assets live. This is the folder where the "heckyeah" video from the presentation lives.
- `index.html` - This is the HTML page that is added to OBS Studio as a [Browser Source](https://obsproject.com/eu/kb/browser-source) while you run the bot via Node.js. In this example, if you use the same server, you would add `http://localhost:3131` to the browser source to display this HTML page.
- `index.js` - The bot and socket.io server, as well as the socket.io client that, from within the Discord bot, communicates emissions to the socket.io server.
- `main.js` - the code that, along with the html page's CDN script, allows the html page to act as a socket.io client.
