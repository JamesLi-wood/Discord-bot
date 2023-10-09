// Require the necessary discord.js classes
const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
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

const roles = [
  {
    id: "1160783330913046528",
    label: "Red",
  },
  {
    id: "1160783378593873961",
    label: "Blue",
  },
  {
    id: "1160783361632129025",
    label: "Green",
  },
];

client.on("ready", async (c) => {
  try {
    // Gets the channel we want the bot to message at.
    const channel = await client.channels.cache.get("1159388897747410987");
    // In case channel doesn't exist.
    if (!channel) return;

    const row = new ActionRowBuilder();

    // Puts the roles into a row component.
    roles.forEach((role) => {
      row.components.push(
        new ButtonBuilder()
          .setCustomId(role.id)
          .setLabel(role.label)
          .setStyle(ButtonStyle.Primary)
      );
    });

    // Prints the message to the channel
    await channel.send({
      content: "Claim or remove a role.",
      components: [row],
    });

    process.exit();
  } catch (error) {
    console.log(error);
  }
});

// Log in to Discord with your client's token
client.login(process.env.TOKEN);
