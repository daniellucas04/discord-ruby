const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),
	async execute(interaction) {
		const userAvatarURL = `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.jpeg`;
		let avatarEmbed = new EmbedBuilder()
			.setColor(0x0000)
			.setTitle('Avatar')
			.setDescription(`Open on [browser](${userAvatarURL})`)
			.setImage(userAvatarURL);
		await interaction.reply({ content: `This command was run by ${interaction.user.globalName}`, embeds: [avatarEmbed] });
	},
};