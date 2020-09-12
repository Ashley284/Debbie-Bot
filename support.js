module.exports = {
    name: 'support',
    category: 'Misc',
    aliases:['server', 's'],
    cooldown:5,
    execute(message) {
        const Discord = require("discord.js");
        const MessageEmbed = new Discord.MessageEmbed()
            .setURL(`https://discord.gg/yDr2QN7`)
            .setTitle('My support server')
            .setFooter(`${message.author.username}`)
            .setColor('RANDOM');
        message.channel.send(MessageEmbed);
    }
};