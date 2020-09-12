module.exports = {
    name: 'help',
    category: 'Info',
    description: '',

    execute(message, _args, client, botCommands, Discord, config) {
        function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " day" : " days") + " ago";
        };
        var commands = botCommands.array();
        var categories = new Map([


            ['Developer', {
                items: []
            }],
            ['Info', {
                items: []
            }],
              ['Moderation', {
                items: []
            }],
            ['Fun', {
                items: []
            }],
            ['Misc', {
                items: []
            }],
        ]);

        //Collect commands into categories

        commands.forEach(command => {
            if (categories.has(command.category)) {
                categories.get(command.category).items.push(command);
            }
        });

        //Construst embed
        const embedHelp = new Discord.MessageEmbed()

            .setColor('RANDOM')
            .setTitle('❯   Prefix: `' + config.prefix + '` - Help')
            .setDescription(`${client.commands.size} Available commands, by category:`)
            .setFooter(`${client.user.username} was created on ${message.channel.client.user.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.client.user.createdAt)})`)
            .setTimestamp()


        //Collect commands from categories
        var categoriesKeys = Array.from(categories.keys());

        categoriesKeys.forEach(categoryKey => {
            var category = categories.get(categoryKey);
            var commandsString = "";
            var commandsKeys = category.items;

            commandsKeys.forEach(function (command, index) {
                var commandsText = command.name;
                commandsString += '`' + commandsText + '`';

                if (commandsKeys.length - 1 > index) {
                    commandsString += ", ";
                }
            });

            embedHelp.addField(categoryKey, commandsString);
        });

        //Send message
        message.channel.send("", {
            embed: embedHelp
        });
    }
}