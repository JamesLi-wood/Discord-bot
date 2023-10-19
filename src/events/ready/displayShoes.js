const { EmbedBuilder } = require("discord.js");

module.exports = async (client) => {
  // Gets the channel we want the bot to message at.
  const channel = await client.channels.cache.get("1162247722460516382");
  // In case channel doesn't exist.
  if (!channel) return;
  
  let prevShoe = null;

  setInterval(() => {
    fetch(process.env.NIKE_API)
      .then((res) => res.json())
      .then((data) => {
        const currShoe = data.data.products.products;

        if (prevShoe == currShoe[0].title) return;

        prevShoe = currShoe[0].title;
        const embed = new EmbedBuilder()
          .setImage(currShoe[0].images.portraitURL)
          .setTitle(currShoe[0].title)
          .addFields({
            name: "Price",
            value: `${currShoe[0].price.currentPrice}`,
          })
          .setColor("Green");

        channel.send({ embeds: [embed] });
      });
  }, 2000);
};
