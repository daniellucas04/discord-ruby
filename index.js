// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config()

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.cooldowns = new Collection();
client.commands = new Collection();

/**
  * Commands handler
  */
const foldersPath = path.join(__dirname, 'commands');
const commandsFolder = fs.readdirSync(foldersPath);
 
for(const folder of commandsFolder) {
    // Commands path
    const commandsPath = path.join(foldersPath, folder);
    // Commands files
    const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('js'));
    for(const file of commandsFiles) {
        // File Path
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`⚠ The command at ${filePath} is missing a required "data" or "execute" property.`);
        }

    }
}

 /**
  * Events handler
  */
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Use token to login
client.login(process.env.DISCORD_TOKEN);