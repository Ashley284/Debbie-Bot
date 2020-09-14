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

client.statusHook = new Discord.WebhookClient("755126404974248018", "9IHMeBYfmEoM9_6xWS6fGAJKpcs358LhAAqQTVufAnV-LHsPYzMambINpOH6bHc7_bpl")

//Shard ready
client.on("shardReady", async shard => {
  client.statusHook.send(`Shard **#${shard}** ready on **${client.guilds.cache.size}** servers and **${client.users.cache.size}** users.`)
})

//Shard disconnect
client.on("shardDisconnect", async shard => {
  client.statusHook.send(`Shard **#${shard}** disconnected from its servers and users temporarily...`)
})

//Shard reconnecting
client.on("shardReconnecting", async shard => {
  client.statusHook.send(`Shard **#${shard}** reconnection in progress on the servers containing this shard...`)
})

//Shard resume
client.on("shardResume", async shard => {
  client.statusHook.send(`Shard **#${shard}** successfully reconnected to **${client.guilds.cache.size}** servers and **${client.users.cache.size}** users.`)
})

client.on('messageUpdate', (oldMessage, newMessage) => {
    if (oldMessage == newMessage || oldMessage.content == newMessage.content) return;
    client.emit('message', newMessage);
})

client.on("ready", () => {
    //space bot list
    const snekfetch = require('snekfetch');
    snekfetch.post(`https://space-bot-list.xyz/api/bots/746228910743879782`)
        .set('Authorization', "NVKqdz4KPPjILzz9jipNVJMyrDZ-IydlRN0hGw2Gpizm4Lx4dk")
        .send({ guilds: client.guilds.cache.size, users: client.users.cache.size })
        .then(req => req.body);

    console.log(`${client.user.tag} has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
    client.user.setStatus(`online`);
    client.user.setActivity(`${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds`)
    console.log(client.guilds.cache.map(c => c.name+"| "+ c.id+"| "+ c.owner.user.tag+"| "+ c.ownerID))
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