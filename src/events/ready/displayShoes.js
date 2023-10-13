const { EmbedBuilder } = require("discord.js");

module.exports = async (client) => {
  // Gets the channel we want the bot to message at.
  const channel = await client.channels.cache.get("1159388897747410987");
  // In case channel doesn't exist.
  if (!channel) return;

  setInterval(() => {
    fetch(process.env.NIKE_API)
      .then((res) => res.json())
      .then((data) => {
        const shoes = data.data.products.products;

        const embed = new EmbedBuilder()
          .setImage(shoes[0].images.portraitURL)
          .setTitle(shoes[0].title)
          .addFields({
            name: "Price",
            value: `${shoes[0].price.currentPrice}`,
          })
          .setColor("Green");

        channel.send({ embeds: [embed] });
      });
  }, 2000);
};
