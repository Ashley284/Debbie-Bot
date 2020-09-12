const Discord = require("discord.js");
module.exports = {
    name: 'vote',
    category:'Misc',
    async execute(message, args, client) {
        const messageEmbed = new Discord.MessageEmbed()
            .setURL("https://space-bot-list.xyz/bots/746228910743879782/vote")
            .setTitle(`vote for ${client.user.username}`)
            .setColor('RANDOM')
            .setTimestamp()
        message.channel.send(messageEmbed);
    }
}