// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require("discord.js");
const eventHandler = require("./handlers/eventHandler");
require("dotenv").config();

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

eventHandler(client);

// Log in to Discord with your client's token
client.login(process.env.TOKEN);
