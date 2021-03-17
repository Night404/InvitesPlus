const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "invite",
      desc: "Gets a invite URL",
      usage: "[p]invite",
      category: "General",
      aliases: [],
      examples: []
    });
  }
  async run(client, message, args) {
  return message.channel.send(new MessageEmbed().setColor("GREEN")
  .setDescription("[Invite me to your server](https://discord.com/api/oauth2/authorize?client_id="+client.user.id+"&permissions=8&scope=bot)"))
  }
};
