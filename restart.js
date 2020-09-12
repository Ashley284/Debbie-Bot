const write = require("fs").writeFileSync;

module.exports = {
    name: 'restart',
    description: '',
    category: 'Developer',
    args: true,
    async execute(message) {
        if (["741748217942769785", "739574617642893394", "648678633342500874"].indexOf(message.author.id) === -1) return message.channel.send(`Access has been denied \`${message.author.tag}\`. \nReason: \nDo not have correct permission.`);

        let m = await message.channel.send("**Restarting. . .**");
        await message.client.user.setActivity("Restarting. . .");
        write("./restartMessage", JSON.stringify({
            channel: m.channel.id,
            message: m.id
        }), "utf8");
        process.exit();

    }
}