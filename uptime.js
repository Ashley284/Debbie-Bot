const Discord = require("discord.js");
module.exports = {
    name: 'uptime',
    category: 'Info',
    description: '',
    async execute(message, args, client, member, user) {
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        let uptime = `${days} days, ${hours} hours, ${minutes} minutes`;
        const messageEmbed = new Discord.MessageEmbed()

            .setDescription(`${uptime}`)
            .setColor('RANDOM')
        message.channel.send(messageEmbed)
    }
}