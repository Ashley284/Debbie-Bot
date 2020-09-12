const version = require('../package.json');
module.exports = {
    name: 'info',
    category: 'Info',
    description: '',
    async execute(message, args, client) {
        function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " day" : " days") + " ago";
        };

        var embedInfo = {
            color: 'RANDOM',
            author: {
                name: `${client.user.username} - Info`
            },
            fields: [{
                name: 'Library:',
                value: `Discord.JS`,
                inline: true
            },
            {
                name: 'Discord.JS version:',
                value: `12.2.0`,
                inline: true
            },
            {
                name: 'Bot Version:',
                value: version["version"],
                inline: true
            },
             {
                name: 'Command Count:',
                value: `${client.commands.size} commands in total.`,
                inline: true
            },
            {
                name: 'info:',
                value: `in ${client.guilds.cache.size} guilds, with ${client.users.cache.size} members`,
                inline: true
            },
            {
                name: 'Memory allocated',
                value: (process.memoryUsage().rss / 1024 / 1024 / 1024).toFixed(2) + "GB",
                inline: true
            },
            {
                name: 'Memory in use:',
                value: (process.memoryUsage().heapUsed / 1024 / 1024 / 1024).toFixed(2) + "GB",
                inline: true
            },
            {
                name: `${client.user.username} was created on`,
                value: `${message.channel.client.user.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.client.user.createdAt)})`,
                inline: true
            },
            ]
        }

        //Send message
        message.channel.send("", {
            embed: embedInfo
        });
    }
}