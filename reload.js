module.exports = {
    name: 'reload',
    description: 'Reloads a command',
    category: 'Developer',
    execute(message, args) {
        if (["741748217942769785", "739574617642893394", "648678633342500874"].indexOf(message.author.id) === -1) return message.channel.send(`Access has been denied \`${message.author.tag}\`. \nReason: you are not my developer.`);
            const commandName = args[0];
            const command = message.client.commands.get(commandName)
                || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

            if (!command) {
                return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
            }

            delete require.cache[require.resolve(`./${command.name}.js`)];
        
            try {
                const newCommand = require(`./${command.name}.js`);
                message.client.commands.set(newCommand.name, newCommand);
                message.channel.send(`Command \`${command.name}\` was reloaded!`);
            } catch (error) {
                console.log(error);
                message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
            }
        }
    }