const { RichEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");
const db = require("quick.db");

module.exports = {
    config: {
        name: "serverinfo",
        description: "Pulls the serverinfo of the guild!",
        usage: "",
        category: "miscellaneous",
        accessableby: "Members",
        aliases: ["si", "serverdesc"]
    },
    run: async (bot, message, args) => {
        function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
    };
let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
        let region = {
            "brazil": ":flag_br: Brazil",
            "eu-central": ":flag_eu: Central Europe",
            "singapore": ":flag_sg: Singapore",
            "us-central": ":flag_us: U.S. Central",
            "sydney": ":flag_au: Sydney",
            "us-east": ":flag_us: U.S. East",
            "us-south": ":flag_us: U.S. South",
            "us-west": ":flag_us: U.S. West",
            "eu-west": ":flag_eu: Western Europe",
          "europe": ":flag_eu: Europe",
            "vip-us-east": ":flag_us: VIP U.S. East",
            "london": ":flag_gb: London",
            "amsterdam": ":flag_nl: Amsterdam",
            "hongkong": ":flag_hk: Hong Kong",
            "russia": ":flag_ru: Russia",
             "bulgaria": ":flag_bg: Bulgaria",
            "southafrica": ":flag_za:  South Africa"
        };
      let onlinemoji = bot.emojis.get("643433161799237652")
      let idleemoji = bot.emojis.get("643433161778528296")
      let dndemoji = bot.emojis.get("643433161631596548")
      let offemoji = bot.emojis.get("657393919864209409")
      let idleusers =  message.guild.members.filter(m => m.presence.status === 'idle').size
       let onlineusers =  message.guild.members.filter(m => m.presence.status === 'online').size
       let dndusers = message.guild.members.filter(m => m.presence.status === 'dnd').size
        let offline =  message.guild.members.filter(m => m.presence.status === 'offline').size
        let live =  message.guild.members.filter(m => m.presence.status === 'live').size
        let roles = message.guild.roles.map(x => x).join(" ")
      //         let roles = new RichEmbed()
      // .setDescription(`**Roles:(${message.guild.roles.filter(f => f.name !== "@everyone").size})**`, message.guild.roles.filter(f => f.name !== "@everyone").map(x => x).join(", "))
      let sEmbed = new RichEmbed()
        .setColor('RANDOM')
        .setTitle("Server Info")
        .setThumbnail(message.guild.iconURL)
        .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
        .addField("**Guild Name:**", `${message.guild.name}`, true)
        .addField("**Guild Owner:**", `${message.guild.owner}`, true)
     //   .addField("**Member Count:**", `${message.guild.memberCount.toLocaleString()}`, true)
       .addField("**Region**", region[message.guild.region], true)
        .addField("**Total | Humans | Bots:**", `${message.guild.members.size.toLocaleString()} | ${message.guild.members.filter(member => !member.user.bot).size.toLocaleString()} | ${message.guild.members.filter(member => member.user.bot).size.toLocaleString()}`, true)
        .addField("**Verification Level:**", verifLevels[message.guild.verificationLevel], true)
        .addField("**Channels:**", `${message.guild.channels.filter(channel => channel.type === 'voice').size} Voice Channels / ${message.guild.channels.filter(channel => channel.type === 'text').size} Text Channels`, true)
  /*            .addField("**Emojis:**", `${message.guild.emojis.size}`, true)
              .addField("**AFK Timeout:**", `${message.guild.afkTimeout.toString()}`, true)
      .addField(":id: **Server ID:**", `${message.guild.id}`, true)
      .addField("**Embedded Messages:**", `${message.guild.embedEnabled ? "True" : "False"}`, true)
      .addField("**Verified:**", `${message.guild.verified ? "Yes" : "No"}`, true)
      .addField("**AFK Channel:**", `${message.guild.afkChannel ? message.guild.afkChannel : "Not set"}`, true)
  */    .addField("**Creation Date:**", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
        // .addField("**Online Users**", `<a:plexiOnline:478870259944783873> Online Users: **${onlineusers}**, <a:plexiAway:478870515730087939> Idle Users: **${idleusers}**, <a:plexiDnd:478869699455746049> DND Users: **${dndusers}**, <a:plexiOffline:478870457848823818> Offline Users: **${offline}**`)
    //   .addField("**Features:**", `\`\`\`${message.guild.features[0] ? message.guild.features.join(" | ") : "No Features Achieved!"}\`\`\``)
            .addField(`🔐 Roles [${message.guild.roles.size}]`, `${roles}`)
        .setFooter(bot.user.username, bot.user.displayAvatarURL)
//    sEmbed.fields[16].value = message.guild.roles.filter(f => f.name !== "@everyone").sort((a, b) => b.position - a.position).map(r => r).join(" | ");
    message.channel.send(sEmbed)
    }
}