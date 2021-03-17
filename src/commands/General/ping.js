const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "ping",
      desc: "Gets a bot's latency.",
      usage: "[p]ping",
      category: "General",
      aliases: [],
      examples: []
    });
  }
  async run(client, message, args) {
  message.channel.send(`Pinging...`)
    .then(messageTime => {
      messageTime.edit(`Pong! ${messageTime.createdTimestamp - message.createdTimestamp}ms`) 
    }) 
  }
};
