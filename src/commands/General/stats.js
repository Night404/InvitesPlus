const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const ms = require('parse-ms')
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "stats",
      desc: "Gets a bot's stats",
      usage: "[p]stats",
      category: "General",
      aliases: [],
      examples: []
    });
  }
  async run(client, message, args) {
  let uptime = [] 
    
    Object.entries(ms(client.uptime)).map((x, y) => {
      if (x[1] > 0 && y < 4) uptime.push(`**${x[1]} ${x[0]}**`) 
    })
    
    let embed = new MessageEmbed()
    .setColor("GREEN")
    .setTitle(`${client.user.username} Info/Stats`)
    .setThumbnail(client.user.displayAvatarURL())
    .addField(`Node.js`, `${process.version}`, false)
    .addField(`Library `, `Discord.js - v${Discord.version}`, false)
    .addField(`Servers Count `, client.guilds.cache.size.toLocaleString(), false)
    .addField(`Users Count `, client.guilds.cache
            .reduce((a, b) => a + b.memberCount, 0)
            .toLocaleString("en"), false) 
    .addField(`Uptime `, uptime.join(", "), false) 
    message.channel.send(embed) 
  }
};
