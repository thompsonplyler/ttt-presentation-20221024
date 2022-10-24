require("dotenv").config();

// import env
const { DISCORD_BOT_TOKEN, BOT_CLIENT_ID, GUILD_ID } = process.env;

// import discord.js -- used to create bots
const Discord = require("discord.js");

// what we actually want from discord.js
const {
  Client,
  GatewayIntentBits,
  REST,
  SlashCommandBuilder,
  Routes,
} = require("discord.js");

// express as socket.io listener server
const express = require("express");
const app = express();
let server = app.listen(3131);

// socket io SERVER -- client is below
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// socket.io CLIENT -- this
const io_client = require("socket.io-client");

// the html file where any overlay elements related to the socket
// will be displayed:
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use(express.static(__dirname));

// socket server listens for connection
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("heckyeah", () => {
    console.log("Command 'heckyeah' got to the server.");
    io.emit("heckyeah");
  });

  socket.on("question", () => {
    console.log("Command 'question' got to the server.");
    io.emit("question");
  });
});

// Get the Discord bot up and running.
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

// every command needs an entry here
// descriptions show up with hint text on server where bot lives
const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!"),
  new SlashCommandBuilder()
    .setName("heckyeah")
    .setDescription("Enthusiastic video!"),
].map((command) => command.toJSON());

// console go go go
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log("Bot is online!");
});

// authorize with token
const rest = new REST({ version: "10" }).setToken(DISCORD_BOT_TOKEN);

rest
  .put(Routes.applicationGuildCommands(BOT_CLIENT_ID, GUILD_ID), {
    body: commands,
  })
  .then((data) =>
    console.log(`Successfully registered ${data.length} application commands.`)
  )
  .catch(console.error);

// socket client creation
const socket_client = io_client("http://localhost:3131");

// where the commands actually live
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === "ping") {
    await interaction.reply("Pong!");
  }
  if (commandName === "heckyeah") {
    socket_client.emit("heckyeah");
    await interaction.reply("Heck yeah indeed!");
  }
});

// authorize with token
client.login(DISCORD_BOT_TOKEN);
