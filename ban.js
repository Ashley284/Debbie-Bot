module.exports = {
    name: 'ban',
    category: 'Moderation',
    description: '',
    async execute(message, args, client) {
        if (!message.member.hasPermission("BAN_MEMBERS"))
            return message.reply("Sorry, you don't have permissions to use this! This command requires the *BAN_MEMBERS* permission.");

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member)
            return message.reply("Please mention a valid member of this server to ban");
        if (!member.banable)
            return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

        let reason = args.slice(1).join(' ');
        if (!reason) reason = "No reason provided";

        await member.ban(reason)
            .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));

        message.reply(`${member.user.tag} has been ban by ${message.author.tag} because: ${reason}`);
    }
}