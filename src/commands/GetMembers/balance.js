const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "balance",
      desc: "Shows (Your/Someone) Balance",
      usage: "[p]balance <user>",
      category: "GetMembers",
      aliases: ["bal"],
      examples: ["{user}"]
    });
  }
  async run(client, message, args) {
    let user = message.mentions.users.first() || message.author;
    //
    let data = (await client.db.get(`coins_${user.id}`)) || 0;
    let database = await client.db.get(`DONE_${user.id}`);
    let array = [];
    if (database && database.length) {
      database.forEach(m => {
        array.push(`${m.Data}`);
      });
    }
    //
    let embed = new MessageEmbed()
      .setColor("GREEN")
      .setTitle(`${user.username}'s Balance:`)
      .setDescription(
        `${user} you currently have  **__${data}__** coins.\n\nIf you want to earn some coins to buy members then do \`${client.settings.prefix}find\`\n\n you can buy members For your server By :\`${client.settings.prefix}buy [Coins] [Message]\``
      )
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addField(
        `**__Transactions__**`,
        array.length == 0 ? "No transacations Found" : array.join("\n")
      );
    message.channel.send(embed);
  }
};
