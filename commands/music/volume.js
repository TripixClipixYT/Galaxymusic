const { Utils } = require("erela.js")
const { RichEmbed } = require("discord.js")
const { stripIndents } = require("common-tags")

module.exports = {
    config: {
        name: "volume",
        aliases: ["v", "vlum"],
        description: "Sets the bot player volume.",
        accessableby: "Member",
        usage: "<1-100>",
        category: "music",
    },
    run: async (bot, message, args) => {
        const player = bot.music.players.get(message.guild.id)
        const { voiceChannel } = message.member;
        if (!voiceChannel) return message.channel.send("Please join a voice channel")
        if (voiceChannel.id !== player.voiceChannel.id) return message.channel.send("You need to be in a voice channel to use the repeat command.");
        if (!player) return message.channel.send(new RichEmbed()
            .setColor("RED")
            .setDescription(`No song\s are currently playing...`))
        if (!args[0]) return message.channel.send(new RichEmbed()
            .setColor("BLUE")
            .setDescription(`Current player volume: **${player.volume}**`))
        // let newVolume = args[0];
        if (Number(args[0]) <= 0 || Number(args[0]) > 100) return message.channel.send("You may set the volume only from 1 to 100!")
        let oldvol = player.volume;
        player.setVolume(Number(args[0]));
        return message.channel.send(new RichEmbed()
            .setColor("GREEN")
            .setDescription(`Successfully set the volume to **${Number(args[0])}** `))
    }
}