const { Utils } = require("erela.js")
const { RichEmbed } = require("discord.js")
const { stripIndents } = require("common-tags")

module.exports = {
    config: {
        name: "repeat",
        description: "Repeat song",
        accessableby: "Member",
        category: "music",
    },
    run: async (bot, message, args) => {
        const player = bot.music.players.get(message.guild.id);
        const { voiceChannel } = message.member;
        if (!voiceChannel) return message.channel.send("Please join a voice channel")
        if (voiceChannel.id !== player.voiceChannel.id) return message.channel.send("You need to be in a voice channel to use the repeat command.");
        if (!player) return message.channel.send("There is no song playing.");
        const { title, author, duration, thumbnail, uri } = player.queue[0];
        if (player.queueRepeat === false) {
            player.setTrackRepeat(true);
            const embed = new RichEmbed()
                .setAuthor("Repeating:")
                .setThumbnail(thumbnail)
                .setDescription(stripIndents`
            ${player.playing ? "▶️" : "⏸️"} **[${title}](${uri})** \`${Utils.formatTime(duration, true)}\` by ${author}
            `)
            return message.channel.send(embed)
        } else {
            player.setTrackRepeat(false);
            const embed = new RichEmbed()
                .setAuthor("Stopped Repeating:")
                .setThumbnail(thumbnail)
                .setDescription(stripIndents`
            ${player.playing ? "▶️" : "⏸️"} **[${title}](${uri})** \`${Utils.formatTime(duration, true)}\` by ${author}
            `)
            return message.channel.send(embed)
        }

    }
}