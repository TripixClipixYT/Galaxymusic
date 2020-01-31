const { Utils } = require("erela.js")
const { RichEmbed } = require("discord.js")
const { stripIndents } = require("common-tags")

module.exports = {
    config: {
        name: "seek",
        aliases: [],
        description: "Seeks the current position of the song.",
        accessableby: "Member",
        category: "music",
    },
    run: async (bot, message, args) => {
        const player = bot.music.players.get(message.guild.id);
        if (!player || !player.queue[0]) return message.channel.send("No song/s currently playing within this guild.");
        const { title, author, duration, thumbnail } = player.queue[0];
        const embed = new RichEmbed()
            .setAuthor("Current Song Position.", message.author.displayAvatarURL)
            .setThumbnail(thumbnail)
            .setDescription(stripIndents`
          ${player.seek} / \`${Utils.formatTime(duration, true)}\` **${title}** by ${author}`);

        return message.channel.send(embed);
    }
}