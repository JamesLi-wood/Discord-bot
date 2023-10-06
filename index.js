// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on("messageCreate", (message) => {
  /* Prevents an infinite loop if message content
  is a certain phrase. */
  if (message.author.bot) {
    return;
  }

  if (message.content == "hello") {
    message.reply("hello");
  }

  console.log(message.content);
});

client.on("interactionCreate", (interaction) => {
  // Will only run if it is a slash command.
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "hey") {
    interaction.reply("hey!");
  }

  if (interaction.commandName === "ping") {
    interaction.reply("pong");
  }

  console.log(interaction.commandName);
});

// Log in to Discord with your client's token
client.login(process.env.TOKEN);
