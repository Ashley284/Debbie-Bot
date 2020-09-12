const moment = require('moment');

module.exports = {
    name: 'userinfo',
    category: 'Info',
async execute(message, args) {
        let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first()
        let user = ""

        if (member) {
            user = member.user
        } else if (!args[0]) {
            user = message.author
            member = message.member
        } else if (!member) {
            return message.channel.send("Pleaae use a valid id of a user who belongs in this server. To view your information, simply say ``//userinfo``.")
        }

        function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " day" : " days") + " ago";
        };

        let muser = member.user
        const Discord = require('discord.js');
        const messageEmbed = new Discord.MessageEmbed()
            .addFields(
                { name: 'userinfo for', value: `${user.tag} \n(<@${muser.id}>)`, inline: true },
                { name: 'ID', value: `${user.id}`, inline: true },
                { name: 'Created on a', value: `${user.createdAt.toUTCString().substr(0, 16)} (${checkDays(user.createdAt).toString()})`, inline: true },
                { name: 'Custom Status', value: `${user.presence.activities[0] ? user.presence.activities[0].name === "Custom Status" ? `**Custom Status:** \`${user.presence.activities[0].state}\`` : `**Currently playing:** \`${user.presence.activities[0].name}\`` : "**Currently playing:** nothing"}`, inline: true },
                { name: 'Status', value: `${user.presence.status}`, inline: true },
            )
            .setColor('RANDOM')
            .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        message.channel.send(messageEmbed)
    }
}