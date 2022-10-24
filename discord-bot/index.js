require("dotenv").config();
const { DISCORD_BOT_TOKEN, BOT_CLIENT_ID, GUILD_ID } = process.env;
const Discord = require("discord.js");
const {
  Client,
  GatewayIntentBits,
  REST,
  SlashCommandBuilder,
  Routes,
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!"),
  new SlashCommandBuilder()
    .setName("server")
    .setDescription("Replies with server info!"),
  new SlashCommandBuilder()
    .setName("user")
    .setDescription("Replies with user info!"),
].map((command) => command.toJSON());

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log("Bot is online!");
});

const rest = new REST({ version: "10" }).setToken(DISCORD_BOT_TOKEN);

rest
  .put(Routes.applicationGuildCommands(BOT_CLIENT_ID, GUILD_ID), {
    body: commands,
  })
  .then((data) =>
    console.log(`Successfully registered ${data.length} application commands.`)
  )
  .catch(console.error);

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === "ping") {
    await interaction.reply("Pong!");
  } else if (commandName === "server") {
    await interaction.reply("Server info.");
  } else if (commandName === "user") {
    await interaction.reply("User info.");
  }
});

client.login(DISCORD_BOT_TOKEN);
