module.exports = {
  name: "ping",
  description: "pong",
  // devOnly: Boolean,
  // testOnly: Boolean,
  // options: Object[],
  // deleted: Boolean

  callback: (client, interaction) => {
    interaction.reply(`My ping is ${client.ws.ping}ms`);
  },
};
