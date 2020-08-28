const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');
//const { exception } = require('console');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
client.on('message', message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/); 
    const commandName = args.shift().toLowerCase();
    
    if (!client.commands.has(commandName)) return;

    try{
        client.commands.get(commandName).execute(message, args);
    } catch (error) {
        console.log(error);
        message.reply(error);
    }
})

client.login(config.token);
