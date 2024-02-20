const { Events, Collection } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction){
		// If it is not a chat interaction
		if(!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);
		if(!command) { console.error(`No command matching ${interaction.commandName} was found.`); return;}
		
		// Set the cooldown
		const { cooldowns } = interaction.client;
		if(!cooldowns.has(command.data.name)) {
			cooldowns.set(command.data.name, new Collection())
		}
		// Get the timestamp
		const now = Date.now();
		const timestamps = cooldowns.get(command.data.name);
		const defaultCooldownDuration = 3;
		const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1_000;

		if(timestamps.has(interaction.user.id)){
			const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

			if (now < expirationTime) {
				const expiredTimestamp = Math.round(expirationTime / 1_000);
				return interaction.reply({ content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`, ephemeral: true });
			}
		}
		// Set timestamp and delete after the cooldown
		timestamps.set(interaction.user.id, now);
		setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

		try {
			// Execute command
			await command.execute(interaction);
		} catch (error) {
			// Show error on console
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
			} else {
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
	}
};