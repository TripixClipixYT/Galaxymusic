const { Utils } = require("erela.js")
const { RichEmbed } = require("discord.js")
const { stripIndents } = require("common-tags")

module.exports = { 
    config: {
        name:"queuerepeat",
        description: "Repeat Queue",
        accessableby: "Member",
        category: "music",
        aliases: ["qp"],
    },
    run: async (bot, message, args) => {
        const player = bot.music.players.get(message.guild.id);
        const { voiceChannel } = message.member;
        if(!voiceChannel) return message.channel.send("Please join a voice channel")
        if(voiceChannel.id !== player.voiceChannel.id) return message.channel.send("You need to be in a voice channel to use the queuerepeat command.");      
        if(!player || !player.queue[0]) return message.channel.send("There is no song playing.");
        const { title, author, duration, thumbnail } = player.queue[0];
        if(player.queueRepeat === false){
            player.setQueueRepeat(true);
            const embed = new RichEmbed()
            .setAuthor("Repeating The Queue")
            return message.channel.send(embed)
        }else{
            player.setQueueRepeat(false);
            const embed = new RichEmbed()
            .setAuthor("Stopped Repeating The Queue")
            return message.channel.send(embed)
        }

    }
}