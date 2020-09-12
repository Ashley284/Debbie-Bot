let Discord = require("discord.js")
const { MessageEmbed } = require('discord.js');
let fs = require("fs")
const fetch = require('node-fetch');
module.exports = {
    name: 'grab',
    category: 'Developer',
    async execute(message, args, client) {
        if (["741748217942769785", "739574617642893394", "648678633342500874"].indexOf(message.author.id) === -1) return message.channel.send(`Access has been denied \`${message.author.tag}\`. \nReason: \nDo not have correct permission.`);
  const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName)
            || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) {
            return message.reply("That is not a valid command");
        }
        try {
            fs.readFile(`commands/${commandName}.js`, 'utf8', async function read(err, data) {
                if (err) message.channel.send(err)

                const nodefetch = require('node-fetch')
                nodefetch(`https://voidbin.cc/api/new`, {
                    method: 'POST',
                    body: JSON.stringify({
                        title: commandName,
                        content: data,
                        code_language: "js",
                        paste_expiration: '1y',
                        view_destroy: false
                    }),
                    headers: { 'Content-Type': 'application/json' }
                }).then(c =>
                    c.json()
                ).then(c => {

                    let embed = new Discord.MessageEmbed()
                        .setColor('RANDOM')
                        .setDescription(`Command code pasted in https://voidbin.cc/paste/${c.pasteID}`)
                    message.channel.send(embed)
                })
            })
        } catch (err) {
            message.channel.send(err.message)
        }
    }
}