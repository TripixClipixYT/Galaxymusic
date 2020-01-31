const { RichEmbed } = require("discord.js")
module.exports = {
    config: {
        name: "pause",
        aliases: ["lev", "stop"],
        description: "Makes the bot leave the voice channel.",
        accessableby: "Member",
        category: "music",
    },
    run: async (bot, message, args) => {
        const { voiceChannel } = message.member;
        const player = bot.music.players.get(message.guild.id);

        if (!player) return message.channel.send("No song/s currently playing in this guild.");
        if (!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return message.channel.send("You need to be in a voice channel to use the leave command.");
        player.pause(true)
        if (args[0] == 'resume') {
            player.pause(false);
            return message.channel.send(new RichEmbed()
                .setColor("GREEN")
                .setDescription("▶️ Successfully resumed the song.")
                .setFooter(bot.user.tag, bot.user.displayAvatarURL))
        } else {
            message.channel.send(new RichEmbed()
                .setColor("GREEN")
                .setDescription("⏸️ Successfully paused the song.")
                .setFooter(bot.user.tag, bot.user.displayAvatarURL))
        }
    }
}
