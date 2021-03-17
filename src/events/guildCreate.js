const BaseEvent = require("../utils/structures/BaseEvent");
const { MessageEmbed } = require("discord.js");

module.exports = class GuildAdd extends BaseEvent {

  constructor() {

    super("guildCreate");

  }
  async run(client, guild) {
    let embed = new MessageEmbed()
    .setColor("GREEN").setAuthor(guild.name, guild.iconURL())
    .setDescription(`Joined __\`${guild.name}\`__ with __\`${guild.memberCount}\`__ member, i'm in ${client.guilds.cache.size} server.`)
 client.channels.cache.get(client.settings.GuildLogs).send(embed);
    }  }