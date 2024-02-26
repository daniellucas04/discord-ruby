const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('osi-model')
        .setDescription('Learn about OSI Model'),
    async execute(interaction) {
        const osiImage = 'https://1.bp.blogspot.com/-7Gjs30JGt1w/Tk6zQzBnpII/AAAAAAAAAAY/W6VtClPxm_g/s640/377.png';
        let modelEmbed = new EmbedBuilder()
            .setColor(0x0000)
            .setTitle('OSI Model')
            .setDescription('The most used model in networking')
            .setImage(osiImage);
        interaction.reply({ embeds: [modelEmbed] });
    }
};