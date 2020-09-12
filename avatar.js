const Discord = require("discord.js")
module.exports = {
    name: 'avatar',
    category: 'Info',
    aliases:['av'],
    cooldown:5,
    async execute(message, args, client) {

        let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first()
        let c = ""

        if (member) {
            c = member.user
        } else if (!args[0]) {
            member = message.author
            c = message.author
        } else if (!member) {
            return message.channel.send("Mention a valid user or a user's id who belongs in this server. To view your avatar, simply say ``//avatar``.")
        }
        const avatarEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`${c.username}'s avatar`)
            .setImage(`${c.displayAvatarURL({ format: "png", dynamic: true, size: 2048 })}`)
            .setTimestamp()
        message.channel.send(avatarEmbed);
    }
}