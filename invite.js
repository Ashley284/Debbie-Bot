const Discord = require("discord.js");
module.exports = {
    name: 'invite',
    category:'info',
    async execute(message, args, client) {
        const messageEmbed = new Discord.MessageEmbed()
            .setURL("https://discord.com/oauth2/authorize?client_id=746228910743879782&scope=bot&permissions=272690311")
            .setTitle(`click here to invite Debbie`)
            .setColor('RANDOM')
            .setTimestamp()
        message.channel.send(messageEmbed);
    }
}