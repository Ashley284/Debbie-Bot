module.exports = {
  name: 'kick',
  category: 'Moderation',
  description: '',
  async execute(message, args, client) {
    if (!message.member.hasPermission("KICK_MEMBERS"))
      return message.reply("Sorry, you don't have permissions to use this! This command requires the *KICK_MEMBERS* permission.");

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member)
      return message.reply("Please mention a valid member of this server to kick");
    if (!member.kickable)
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

    let reason = args.slice(1).join(' ');
    if (!reason) reason = "No reason provided";

    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));

    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
  }
}