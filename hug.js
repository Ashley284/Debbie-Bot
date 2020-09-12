const superagent = require('superagent');
const Discord = require('discord.js');
module.exports = {
    name: 'hug',
    category: 'Fun',
    description: '',
    async execute(message, args, client) {
        if (!args[0]) return message.reply("You did not mention a user to hug!")
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!member) return message.reply("The user given is not a member of this server!")

        let muser = member.user

        const { body } = await superagent.get("https://some-random-api.ml/animu/hug");

        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setImage(`${body.link}`)

        if (muser === message.author) {
            message.channel.send(`${message.author} I see you are a part of the lone wolf group. Here, take a hug <3`, { embed })
        } else {
            message.channel.send(`<@${muser.id}>, you have received a hug from ${message.author.username} Awwwwww`, { embed });
        }
    }
}