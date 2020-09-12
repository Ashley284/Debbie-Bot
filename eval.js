module.exports = {
    name: 'eval',
    category: 'Developer',
    aliases:['e'],
    async execute(message, args) {
        console.log(`${message.author.tag} tried to use the eval command in ${message.guild.name} id: ${message.guild.id}`)
        if (["741748217942769785", "739574617642893394", "648678633342500874"].indexOf(message.author.id) === -1) return message.channel.send(`Access has been denied \`${message.author.tag}\`. \nReason: \nDo not have correct permission.`);
        if (args.length < 1) return message.channel.send("`Not enough parameters`");

        const client = message.client,
            options = {
                split: {
                    char: "\n",
                    prepend: "`" + "``js\n",
                    append: "`" + "``"
                }
            };

        const match = args[0].match(/--(depth)=(\d+)/);
        const depth = match && match[1] === "depth" ? parseInt(match[2]) : 0;

        const content = message.content.split(" ").slice(match ? 2 : 1).join(" ");
        const result = new Promise((resolve) => resolve(eval(content)));

        return result.then(output => {
            if (typeof output !== "string") output = require("util").inspect(output, { depth });
            if (output.includes(message.client.token)) output = output.replace(message.client.token, "TOKEN");
            message.channel.send("`" + "``js\n" + output + "`" + "``", options);
        }).catch(err => {
            if (err.stack.includes(message.client.token)) err.stack = err.stack.replace(message.client.token, "TOKEN");
            message.channel.send("`" + "``js\n" + err.stack + "`" + "``", options);
        });
    },
};