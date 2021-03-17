const BaseEvent = require("../utils/structures/BaseEvent");

const Discord = require("discord.js");

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super("guildMemberAdd");
  }

  async run(client, member) {
    let data = await client.db.get(`code_${member.guild.id}`);
    let orders = await client.db.get(`orders_${member.guild.id}`);
    let uses = await client.db.get(`uses_${member.guild.id}`);

    if (data == 0) return;

    let link = await client.fetchInvite(`https://discord.gg/${data}`);
    let Ad = { Data: `[+ 1] - Joined to a server` };

    await client.db.add(`coins_${member.user.id}`, 1);
    await client.db.push(`DONE_${member.user.id}`, Ad);

    if (uses + 1 >= orders) {
      await client.db.set(`orders_${member.guild.id}`, 0);

      await client.db.set(`code_${member.guild.id}`, 0);

      await client.db.set(`uses_${member.guild.id}`, 0);
    } else {
      await client.db.add(`uses_${member.guild.id}`, 1);
    }
  }
};
