const { Events } = require('discord.js');

// When the bot is ready, execute
module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Ready🔥! Logged in as ${client.user.tag}`);
    },
};