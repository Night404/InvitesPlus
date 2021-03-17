const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "blacklist",
      desc: "Give a user blacklist from bot",
      usage: "[p]blacklist <user>",
      category: "Owners",
      aliases: [],
      examples: ["{user}"]
    });
  }
  async run(client, message, args) {
    if (!client.settings.owner.includes(message.author.id))
      return message.channel.send("You can't use this command");
    let user;
    if (!args[0]) 
     return message.channel.send(
        new MessageEmbed()
          .setColor("#cf1919")
          .setDescription(`I'm can't find him /;`)
      );
    if (!user)
      user =
        message.mentions.users.first() ||
        message.client.users.cache.get(args[0]);
    if (!user && /^\d{17,19}$/.test(args[0]))
      user = await message.client.users.fetch(args[0]).catch(() => null);
    if (!user)
      return message.channel.send(
        new MessageEmbed()
          .setColor("#cf1919")
          .setDescription(`I'm can't find him /;`)
      );
    let member = user;
    const members =
      message.mentions.members.get(user.id) ||
      (await message.guild.members.fetch(user.id).catch(() => null));
    //
    let black = await client.db.get(`blacklist_${user.id}`);
    //
    await client.db.set(`blacklist_${user.id}`, black ? false : true);
    return message.channel.send(
      `\`${user.tag}\` - has been ${black ? "Unblacklisted" : "Blacklisted"}`
    );
  }
};
