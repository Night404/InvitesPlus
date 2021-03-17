const { MessageEmbed } = require("discord.js");
const BaseEvent = require("../utils/structures/BaseEvent");
module.exports = class Event extends BaseEvent {
  constructor() {
    super("ready");
  }
  async run(bot) {
    console.log(`Connected To Discord API`)
    bot.user.setActivity(`!help | J4J`, { type: "LISTENING" });
  }
};