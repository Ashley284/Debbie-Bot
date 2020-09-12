const Discord = require("discord.js");

module.exports = {
  name: "ping",
  category: "info",
  description: "Returns latency of bot & API ping.",

  async execute(message, args, client) {
    let response = await message.channel.send("**Pinging . . .**");

    function tps() {
      let tps = 0, s = Date.now();
      while (Date.now() - s <= 1) tps++;
      tps *= 1000;
      return tps;
    }

    const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .addFields({
      name: "Client Latency:",
      value: `${Math.round(response.createdTimestamp - message.createdTimestamp)}ms`,
      inline: false,
    }, {
      name: "API Latency:",
      value: `${Math.round(client.ws.ping)}ms`,
      inline: false,
    }, {
      name: "Server TPS:",
      value: `${tps().toLocaleString()}`,
      inline: false,
    });

    response.edit("", { embed });
    
  }
};