const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "daily",
      desc: "Get a daily gift of Balance",
      usage: "[p]daily",
      category: "GetMembers",
      aliases: ["claim"],
      examples: []
    });
  }
  async run(client, message, args) {
   const prettyMilliseconds = require("pretty-ms");

    let time = Date.now();
    let DAILY = await client.db.get(`DAILY_${message.author.id}`);
    if (DAILY > time) {
      message.channel
        .send(`You're already got daily gift you can come back after ( \`${prettyMilliseconds(
        DAILY - Date.now(),
        { verbose: false }
      )}\` )
              `);
      return;
    }

    await client.db.add(`coins_${message.author.id}`, 1);
    await client.db
      .set(`DAILY_${message.author.id}`, time + 86400000)
 let Ad = {
      Data: `[+1] - Got Daily Bonus !`
    } 
 
    await client.db.push(`DONE_${message.author.id}`, Ad)

    message.channel.send(
      `The **${message.author.tag}** Has 1 coins as Daily Coins`
    ); 
  }
};
