require("dotenv").config();
const { REST, Routes } = require("discord.js");

/* Everytime a command is added / updated, you need to run
this file to register the commands to the bot. */
const commands = [
  {
    name: "hey",
    description: "Replies with hey!",
  },
  {
    name: "ping",
    description: "Pong!",
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
