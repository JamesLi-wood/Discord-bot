// Require the necessary discord.js classes
const {
  Client,
  Events,
  GatewayIntentBits,
  EmbedBuilder,
} = require("discord.js");
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

  if (message.content === "hello") {
    message.reply("hello");
  }

  if (message.content === "embed") {
    const embed = new EmbedBuilder()
      .setTitle("Embed Title")
      .setDescription("This is an embed description")
      .setColor("Green")
      .addFields(
        {
          name: "Field Title",
          value: "Some random value",
          inline: true,
        },
        {
          name: "2nd Field Title",
          value: "Some random value",
          inline: true,
        }
      );

    message.channel.send({ embeds: [embed] });
  }

  if (message.content === "shoes") {
    fetch(process.env.NIKE_API)
      .then((res) => res.json())
      .then((data) => {
        const shoes = data.data.products.products;

        for (let i = 0; i < 3; i++) {
          const embed = new EmbedBuilder()
            .setImage(shoes[i].images.portraitURL)
            .setTitle(shoes[i].title)
            .addFields({
              name: "Price",
              value: `${shoes[i].price.currentPrice}`,
            })
            .setColor("Green");

          message.channel.send({ embeds: [embed] });
        }
      });
  }

  console.log(message.content);
});

client.on("interactionCreate", (interaction) => {
  // Will only run if it is a slash command.
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "add") {
    const num1 = interaction.options.get("first-number")?.value;
    const num2 = interaction.options.get("second-number")?.value;

    interaction.reply(`Sum is ${num1 + num2}`);
  }

  if (interaction.commandName === "embed") {
    const embed = new EmbedBuilder()
      .setTitle("Embed Title")
      .setDescription("This is an embed description")
      .setColor("Green")
      .addFields({
        name: "Field title",
        value: "Some random value",
        inline: true,
      });

    interaction.reply({ embeds: [embed] });
  }

  console.log(interaction.commandName);
});

// Log in to Discord with your client's token
client.login(process.env.TOKEN);
