require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

/* Everytime a command is added / updated, you need to run
this file to register the commands to the bot. */
const commands = [
  {
    name: "add",
    description: "Adds two numbers.",
    options: [
      {
        name: "first-number",
        description: "The first number",
        type: ApplicationCommandOptionType.Number,
        choices: [
          {
            name: "one",
            value: 1,
          },
        ],
        required: true,
      },
      {
        name: "second-number",
        description: "The second number",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },
  {
    name: "embed",
    description: "Sends an embed",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

// Registers the slash commands.
(async () => {
  try {
    console.log("Registering slash commands...");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log("Slash command were registered successfully");
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();
