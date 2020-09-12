const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json")
const msFix = require("ms")
const fs = require("fs")
client.commands = new Discord.Collection();
var botCommands = require('./commands');
Object.keys(botCommands).forEach(key => {
    client.commands.set(botCommands[key].name, botCommands[key]);
});


client.on('messageUpdate', (oldMessage, newMessage) => {
    if (oldMessage == newMessage || oldMessage.content == newMessage.content) return;
    client.emit('message', newMessage);
})

client.on("ready", () => {
    //space bot list
    const snekfetch = require('snekfetch');
    snekfetch.post(`https://space-bot-list.xyz/api/bots/746228910743879782`)
        .set('Authorization', "TOKEN")
        .send({ guilds: client.guilds.cache.size, users: client.users.cache.size })
        .then(req => req.body);

    console.log(`${client.user.tag} has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
    client.user.setStatus(`online`);
    client.user.setActivity(`${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds`)

});


client.on("guildCreate", guild => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members !`);
    client.user.setActivity(`${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds`)

});

client.on("guildDelete", guild => {
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id}) This guild had ${guild.memberCount} members!`);
    client.user.setActivity(`${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds`)

});

client.on("message", async message => {
    await processMessage(message);
    if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) return message.channel.send('my current prefix is: `' + config.prefix + '`')

})

async function processMessage(message) {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
    var args = message.content.slice(config.prefix.length).split(' ');
    var command = args.shift().toLowerCase();
    if (client.commands.has(command) == false) {
        return;
    }

    try {
        switch (command) {
            case "help":
                await client.commands.get(command).execute(message, args, client, client.commands, Discord, config);
                break;

            default:
                await client.commands.get(command).execute(message, args, client);
                break;
        }
    } catch (error) {
        console.error(TypeError);
        message.reply(`There was an error trying to execute that command because of ${error}`);
        (e => console.error(e.stack))
    }
}

client.on("ready", async () => {
    if (fs.existsSync("./restartMessage")) {
        let restartMessage = JSON.parse(fs.readFileSync("./restartMessage", "utf8"));
        const rm = require("fs").unlinkSync;
        let m = await client.channels.cache.get(restartMessage.channel)?.messages.fetch(restartMessage.message);
        if (m) m.edit(`Restarted in \`${msFix(Date.now() - m.createdTimestamp)}\``);
        rm("./restartMessage");
        console.log(restartMessage.message)
        console.log(restartMessage.channel)
    };
});
client.login(config.token);