module.exports = {
    name: 'serverinfo',
    category: 'Info',
    description: '',
    execute(message) {
      const Discord = require('discord.js');
  
      function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
      };
      let verifLevels = {
        "NONE": "None",
        "LOW": "Low",
        "MEDIUM": "Medium",
        "HIGH": "(╯°□°）╯︵  ┻━┻",
        "VERY_HIGH": "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"
      };
      let region = {
        "brazil": ":flag_br: Brazil",
        "europe": ":flag_eu: Europe",
        "singapore": ":flag_sg: Singapore",
        "us-central": ":flag_us: U.S. Central",
        "sydney": ":flag_au: Sydney",
        "us-east": ":flag_us: U.S. East",
        "us-south": ":flag_us: U.S. South",
        "us-west": ":flag_us: U.S. West",
        "eu-west": ":flag_eu: Western Europe",
        "vip-us-east": ":flag_us: VIP U.S. East",
        "london": ":flag_gb: London",
        "amsterdam": ":flag_nl: Amsterdam",
        "hongkong": ":flag_hk: Hong Kong",
        "russia": ":flag_ru: Russia",
        "southafrica": ":flag_za:  South Africa",
        "india": ":flag_in: India",
        "japan": ":flag_jp: Japan"
      };
          var emojis;
      if (message.guild.emojis.cache.size === 0) {
          emojis = 'None';
      } else {
          emojis = message.guild.emojis.cache.size;
      }
      const messageEmbed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`GuildInfo for ${message.guild.name}`)
        .setTimestamp()
        .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
        .addField("Name", message.guild.name, true)
        .addField("ID", message.guild.id, true)
        .addField("Owner", `${message.guild.owner.user.tag}`, true)
        .addField("Region", region[message.guild.region], true)
        .addField("Total | Humans | Bots", `${message.guild.memberCount} | ${message.guild.members.cache.filter(member => !member.user.bot).size} | ${message.guild.members.cache.filter(member => member.user.bot).size}`, true)
        .addField("Verification Level", verifLevels[message.guild.verificationLevel], true)
        .addField("Channels", message.guild.channels.cache.size, true)
        .addField("Roles", message.guild.roles.cache.size, true)
        .addField("AFK Timeout", message.guild.afkTimeout / 60 + ' minutes', true)
        .addField("Emojis", `${emojis}/100`, true)
        .addField("Creation Date", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
        .setThumbnail(message.guild.iconURL());
      message.channel.send(messageEmbed);
    }
  }