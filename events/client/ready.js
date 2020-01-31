const { ErelaClient, Utils } = require("erela.js");
const { nodes, prefix } = require("../../botconfig.json")
const { RichEmbed } = require("discord.js")

module.exports = bot => {
    console.log(`${bot.user.username} is online`);
  //  const { title, author, duration, thumbnail } = player.queue[0];
    bot.music = new ErelaClient(bot, nodes)
        .on("nodeError", console.log)
        .on("nodeConnect", () => console.log("Successfully created a new Node."))
        .on("queueEnd", player => {
            player.textChannel.send("Queue has ended.") // Now playing: **${title}** \`${Utils.formatTime(duration, true)}\`
            return bot.music.players.destroy(player.guild.id)
        })
        .on("trackStart", ({ textChannel }, { title, duration, thumbnail }) => textChannel.send(new RichEmbed().setColor("GREEN").setDescription(`Now Playing: **${title}**\nDuration: \`${Utils.formatTime(duration, true)}\``).setFooter(`${bot.user.username}`).setTimestamp().setThumbnail(thumbnail)));

    bot.levels = new Map()
        .set("none", 0.0)
        .set("low", 0.10)
        .set("medium", 0.15)
        .set("high", 0.25);

    let activities = [`${bot.guilds.size} servers!`, `${bot.channels.size} channels!`, `${bot.users.size} users!`], i = 0;
    setInterval(() => bot.user.setActivity(`${prefix}help | ${activities[i++ % activities.length]}`, { type: "WATCHING" }), 15000)

};